"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent, type InputHTMLAttributes } from "react";
import { signIn, signInWithProvider, signUp, type AuthProvider, type AuthResult } from "@/lib/auth";

const PROVIDERS: { id: AuthProvider; label: string; icon: string }[] = [
  { id: "apple", label: "Apple", icon: "/icons/auth-apple.svg" },
  { id: "google", label: "Google", icon: "/icons/auth-google.svg" },
  { id: "facebook", label: "Facebook", icon: "/icons/auth-facebook.svg" },
];

function Field({ id, label, ...input }: { id: string; label: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-mono text-11 text-ink">
        {label}
      </label>
      <input
        id={id}
        className="h-7.75 w-full rounded-full border border-line px-3 font-mono text-13 text-ink outline-none placeholder:text-ink/50 focus:border-brand"
        {...input}
      />
    </div>
  );
}

export type AuthFormProps = {
  mode: "signup" | "login";
  title: string;
  subtitle: string;
  /** Where to go after a successful sign-in */
  afterAuth?: string;
  /** The "login" / "sign-up" link at the bottom */
  switchHref: string;
};

export default function AuthForm({
  mode,
  title,
  subtitle,
  afterAuth = "/account",
  switchHref,
}: AuthFormProps) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const isSignup = mode === "signup";

  function finish(result: AuthResult) {
    setPending(false);
    if (result.ok) router.push(afterAuth);
    else setMessage(result.error);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");

    if (password.length < 8) {
      setMessage("Your password needs at least 8 characters.");
      return;
    }

    setPending(true);
    setMessage("");
    finish(
      isSignup
        ? await signUp({
            firstName: String(data.get("firstName") ?? "").trim(),
            lastName: String(data.get("lastName") ?? "").trim(),
            email,
            password,
          })
        : await signIn({ email, password }),
    );
  }

  async function handleProvider(provider: AuthProvider) {
    setPending(true);
    setMessage("");
    finish(await signInWithProvider(provider));
  }

  return (
    <div className="flex flex-col gap-5.5 rounded-2xl border border-line bg-white p-7 shadow-auth">
      <div className="flex flex-col gap-5">
        <h1 className="font-serif text-44 text-ink">{title}</h1>
        <p className="font-mono text-xs text-muted">{subtitle}</p>
      </div>

      <div className="flex flex-col">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {isSignup && (
            <>
              <Field id="first-name" name="firstName" label="first name" placeholder="first" autoComplete="given-name" required />
              <Field id="last-name" name="lastName" label="last name" placeholder="last name" autoComplete="family-name" required />
            </>
          )}
          <Field
            id="email"
            name="email"
            type="email"
            label="Email address"
            placeholder="someone@example.com"
            autoComplete="email"
            required
          />
          <Field
            id="password"
            name="password"
            type="password"
            label="Password"
            placeholder="password"
            autoComplete={isSignup ? "new-password" : "current-password"}
            minLength={8}
            required
          />
          <button
            type="submit"
            disabled={pending}
            className="flex h-8 w-full items-center justify-center rounded-full border border-brand bg-brand px-4 text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            <span className="trim block font-serif text-sm">
              {pending ? "One moment…" : isSignup ? "Sign up & continue" : "Sign in & continue"}
            </span>
          </button>
          {message && (
            <p aria-live="polite" className="font-mono text-11 text-promo">
              {message}
            </p>
          )}
        </form>

        <div className="mt-11.25 flex flex-col gap-4">
          <p className="text-center font-serif text-sm text-black">
            {isSignup ? "or sign-up via" : "or login via"}
          </p>
          <div className="flex items-center justify-center gap-3">
            {PROVIDERS.map((provider) => (
              <button
                key={provider.id}
                type="button"
                aria-label={`Continue with ${provider.label}`}
                disabled={pending}
                onClick={() => handleProvider(provider.id)}
                className="relative size-8 transition-transform hover:scale-105 disabled:opacity-60"
              >
                <Image src={provider.icon} alt="" fill unoptimized />
              </button>
            ))}
          </div>
        </div>

        <p className="mt-11.25 text-center font-serif text-sm text-black">
          {isSignup ? "already have an account? " : "don’t have an account yet? "}
          <Link href={switchHref} className="font-bold underline transition-colors hover:text-brand">
            {isSignup ? "login" : "sign-up"}
          </Link>
        </p>
      </div>
    </div>
  );
}