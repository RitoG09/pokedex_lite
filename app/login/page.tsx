"use client";

import { signIn, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { GithubLogo, GoogleLogo, UserCircle } from "@phosphor-icons/react";

export default function LoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  // If already authenticated, redirect to home
  useEffect(() => {
    const isGuest = localStorage.getItem("guest") === "true";
    if (session || isGuest) {
      router.replace("/");
    }
  }, [session, router]);

  if (status === "loading") return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-[0.03]"
          style={{
            background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full opacity-[0.03]"
          style={{
            background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative w-full max-w-sm space-y-8">
        {/* Logo & Title */}
        <div className="flex flex-col items-center gap-4">
          <img
            src="/pokedex.png"
            alt="Pokédex logo"
            className="w-16 h-16 object-contain"
          />
          <div className="text-center">
            <h1 className="text-2xl font-black tracking-tight">
              Pokédex
              <span className="text-primary">.</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Sign in to start your adventure
            </p>
          </div>
        </div>

        {/* Auth buttons */}
        <div className="space-y-3">
          <Button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            variant="outline"
            className="w-full h-11 gap-3 text-sm font-medium transition-all hover:shadow-md hover:border-primary/30 cursor-pointer"
          >
            <GoogleLogo weight="bold" className="w-5 h-5" />
            Continue with Google
          </Button>

          <Button
            onClick={() => signIn("github", { callbackUrl: "/" })}
            variant="outline"
            className="w-full h-11 gap-3 text-sm font-medium transition-all hover:shadow-md hover:border-primary/30 cursor-pointer"
          >
            <GithubLogo weight="bold" className="w-5 h-5" />
            Continue with GitHub
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-3 py-1">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground/60 uppercase tracking-wider font-medium">
              or
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Guest mode */}
          <Button
            variant="ghost"
            className="w-full h-11 gap-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-all cursor-pointer"
            onClick={() => {
              localStorage.setItem("guest", "true");
              router.push("/");
            }}
          >
            <UserCircle weight="bold" className="w-5 h-5" />
            Continue as Guest
          </Button>
        </div>

        {/* Footer note */}
        <p className="text-center text-[11px] text-muted-foreground/50 leading-relaxed">
          Auth is for demo purposes only.
          <br />
          Guest mode gives full access with no sign-in required.
        </p>
      </div>
    </div>
  );
}
