"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type AnimationPlaybackControls,
  type MotionValue,
} from "motion/react";
import { menuGroups } from "@/data/navigation";

/* ---------- Genie settings (tweak these to adjust the feel) ---------- */
const PANEL_W = 321; // panel width in Figma
const PANEL_H = 517; // panel height in Figma
const SLICES = 40; // more slices = smoother curve
const OPEN_DURATION = 0.6; // seconds
const CLOSE_DURATION = 0.45;
const ORIGIN_X = 38.5; // ✕ / ☰ icon center, px from the panel's left edge
const NECK = 25 / PANEL_W; // funnel width at the icon (icon width ÷ panel width)

const SLICE_H = PANEL_H / SLICES;
const clamp = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (u: number) => u * u * (3 - 2 * u);

/** Where a strip sits and how wide it is at a given moment (0 = closed, 1 = open). */
function genie(progress: number, stripCenter: number) {
  // Phase 1: content slides out of the icon
  const slide = 1 - smooth(clamp(progress / 0.7));
  const currentY = stripCenter - slide * PANEL_H;
  // Phase 2: the funnel relaxes into a rectangle
  const relax = smooth(clamp((progress - 0.35) / 0.65));
  // Funnel: narrow near the icon, full width further away
  const funnel = NECK + (1 - NECK) * smooth(clamp(currentY / (PANEL_H * 0.85)));
  return { y: -slide * PANEL_H, scaleX: funnel + (1 - funnel) * relax };
}

/* ---------- Panel visuals (shared by the real menu and the animated strips) ---------- */
type PanelProps = {
  onClose?: () => void;
  onNavigate?: () => void;
  inert?: boolean;
};

function Panel({ onClose, onNavigate, inert }: PanelProps) {
  return (
    <div
      inert={inert}
      className="relative flex w-80.25 flex-col items-start gap-1.75 rounded-2xl bg-white px-3.5 pt-16.5 pb-8"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close menu"
        className="absolute top-7.5 left-7.5 size-4.25"
      >
        <Image src="/icons/close.svg" alt="" fill unoptimized />
      </button>

      {menuGroups.map((group, gi) => (
        <Fragment key={gi}>
          {gi > 0 && (
            <div className="relative h-0 w-full" aria-hidden>
              <div className="absolute inset-x-0 -top-px h-px bg-line" />
            </div>
          )}
          {group.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={onNavigate}
              className="w-full px-4 py-3 font-serif text-xl text-black transition-colors hover:text-brand"
            >
              <span className="trim block">{link.label}</span>
            </Link>
          ))}
        </Fragment>
      ))}
    </div>
  );
}

/* ---------- One horizontal strip of the genie animation ---------- */
function Strip({
  index,
  progress,
  children,
}: {
  index: number;
  progress: MotionValue<number>;
  children: React.ReactNode;
}) {
  const top = index * SLICE_H;
  const center = top + SLICE_H / 2;
  const y = useTransform(progress, (p) => genie(p, center).y);
  const scaleX = useTransform(progress, (p) => genie(p, center).scaleX);

  return (
    <motion.div
      className="absolute inset-x-0 overflow-hidden"
      style={{ top, height: SLICE_H + 1, y, scaleX, originX: ORIGIN_X / PANEL_W }}
    >
      <div style={{ transform: `translateY(${-top}px)` }}>{children}</div>
    </motion.div>
  );
}

function GenieStrips({ progress }: { progress: MotionValue<number> }) {
  const copy = <Panel inert />;
  return (
    <div aria-hidden className="relative overflow-hidden" style={{ width: PANEL_W, height: PANEL_H }}>
      {Array.from({ length: SLICES }, (_, i) => (
        <Strip key={i} index={i} progress={progress}>
          {copy}
        </Strip>
      ))}
    </div>
  );
}

/* ---------- Menu button + panel ---------- */
type Phase = "closed" | "opening" | "open" | "closing";

export default function MenuButton() {
  const [phase, setPhase] = useState<Phase>("closed");
  const progress = useMotionValue(0);
  const controls = useRef<AnimationPlaybackControls | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const isVisible = phase !== "closed";
  const isOpening = phase === "opening" || phase === "open";

  const openMenu = useCallback(() => {
    controls.current?.stop();
    setPhase("opening");
    controls.current = animate(progress, 1, {
      duration: reduceMotion ? 0 : OPEN_DURATION,
      ease: "linear",
      onComplete: () => setPhase("open"),
    });
  }, [progress, reduceMotion]);

  const closeMenu = useCallback(
    (returnFocus: boolean) => {
      controls.current?.stop();
      setPhase("closing");
      controls.current = animate(progress, 0, {
        duration: reduceMotion ? 0 : CLOSE_DURATION,
        ease: "linear",
        onComplete: () => {
          setPhase("closed");
          if (returnFocus) buttonRef.current?.focus();
        },
      });
    },
    [progress, reduceMotion],
  );

  // Move keyboard focus into the menu once it's fully open
  useEffect(() => {
    if (phase === "open") panelRef.current?.querySelector<HTMLElement>("a")?.focus();
  }, [phase]);

  // Close on Escape or on a click outside
  useEffect(() => {
    if (!isVisible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu(true);
    };
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) closeMenu(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [isVisible, closeMenu]);

  return (
    <div ref={rootRef} className="relative justify-self-start">
      <button
        ref={buttonRef}
        type="button"
        aria-label="Open menu"
        aria-expanded={isOpening}
        aria-controls="site-menu"
        onClick={() => (isOpening ? closeMenu(true) : openMenu())}
        className="relative block size-6.25"
      >
        <span className="absolute inset-[29.17%_16.67%]">
          <span className="absolute inset-[-8%_-5%]">
            <Image src="/icons/menu.svg" alt="" fill unoptimized />
          </span>
        </span>
      </button>

      {isVisible && (
        <div id="site-menu" className="absolute -top-6.5 -left-6.5 z-50 drop-shadow-menu">
          {phase === "open" ? (
            <div ref={panelRef}>
              <Panel onClose={() => closeMenu(true)} onNavigate={() => closeMenu(false)} />
            </div>
          ) : (
            <GenieStrips progress={progress} />
          )}
        </div>
      )}
    </div>
  );
}