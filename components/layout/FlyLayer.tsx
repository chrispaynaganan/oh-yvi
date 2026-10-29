"use client";

import { useEffect } from "react";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { finishFlight, useFlights, type Flight } from "@/lib/bag";

/* ---------- Feel settings ---------- */
const DURATION = 0.95; // seconds
const END_SIZE = 22; // px, size when it drops into the bag icon
const ARC_HEIGHT = 180; // px above the higher of the two points
const MAX_LIFT_OFFSET = 36; // px the shadow drops away at the highest point

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeInOut = (u: number) => (u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2);

/** Where the card is at time t (0 → 1) */
function pose(f: Flight, t: number) {
  // Height above the page: rises first (the "lift"), peaks, returns to 0 on landing
  const lift = Math.sin(Math.PI * Math.min(1, t * 1.15));
  // Progress along the arc; the first 10% is the lift in place
  const u = easeInOut(clamp01((t - 0.1) / 0.9));
  const cx = f.from.x + (f.to.x - f.from.x) * 0.25;
  const cy = Math.min(f.from.y, f.to.y) - ARC_HEIGHT;
  const x = (1 - u) ** 2 * f.from.x + 2 * (1 - u) * u * cx + u * u * f.to.x;
  const y = (1 - u) ** 2 * f.from.y + 2 * (1 - u) * u * cy + u * u * f.to.y;
  const shrink = 1 - u ** 1.6 * (1 - END_SIZE / f.from.size);
  return {
    x,
    y,
    lift,
    scale: shrink * (1 + 0.12 * lift),
    rotate: -10 * Math.sin(Math.PI * u) + 4 * lift,
  };
}

function FlyingCard({ flight }: { flight: Flight }) {
  const t = useMotionValue(0);
  const half = flight.from.size / 2;

  useEffect(() => {
    const controls = animate(t, 1, {
      duration: DURATION,
      ease: "linear",
      onComplete: () => finishFlight(flight.id),
    });
    return () => controls.stop();
  }, [t, flight.id]);

  const x = useTransform(t, (v) => pose(flight, v).x - half);
  const y = useTransform(t, (v) => pose(flight, v).y - half);
  const scale = useTransform(t, (v) => pose(flight, v).scale);
  const rotate = useTransform(t, (v) => pose(flight, v).rotate);
  const opacity = useTransform(t, (v) => 1 - clamp01((v - 0.94) / 0.06));

  // The shadow drops further away, softer and fainter, the higher the card is
  const shadowX = useTransform(t, (v) => {
    const p = pose(flight, v);
    return p.x - half + p.lift * MAX_LIFT_OFFSET * 0.45;
  });
  const shadowY = useTransform(t, (v) => {
    const p = pose(flight, v);
    return p.y - half + p.lift * MAX_LIFT_OFFSET;
  });
  const shadowScale = useTransform(t, (v) => {
    const p = pose(flight, v);
    return p.scale * (1 - 0.08 * p.lift);
  });
  const shadowOpacity = useTransform(t, (v) => {
    const p = pose(flight, v);
    return (0.32 - 0.18 * p.lift) * (1 - clamp01((v - 0.9) / 0.1));
  });
  const shadowBlur = useTransform(t, (v) => `blur(${4 + 22 * pose(flight, v).lift}px)`);

  const box = { width: flight.from.size, height: flight.from.size };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 rounded-lg bg-black"
        style={{ ...box, x: shadowX, y: shadowY, scale: shadowScale, rotate, opacity: shadowOpacity, filter: shadowBlur }}
      />
      <motion.div
        className="fixed top-0 left-0 rounded-lg bg-white p-1.5"
        style={{ ...box, x, y, scale, rotate, opacity }}
      >
        {/* Plain img: the src is the already-loaded, already-optimized photo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={flight.src} alt="" className="size-full rounded-md object-cover" />
      </motion.div>
    </>
  );
}

export default function FlyLayer() {
  const flights = useFlights();
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-60">
      {flights.map((flight) => (
        <FlyingCard key={flight.id} flight={flight} />
      ))}
    </div>
  );
}