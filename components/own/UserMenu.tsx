"use client";

import { useSession, signOut } from "next-auth/react";
import { SignOut, User } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function UserMenu() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = () => {
    // Clear guest flag too
    localStorage.removeItem("guest");
    if (session) {
      signOut({ callbackUrl: "/login" });
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="flex items-center gap-2">
      {session?.user ? (
        // Authenticated user
        <div className="flex items-center gap-2.5">
          {session.user.image ? (
            <img
              src={session.user.image}
              alt={session.user.name || "User"}
              className="w-7 h-7 rounded-full border border-border/50 object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
              <User weight="bold" className="w-3.5 h-3.5 text-primary" />
            </div>
          )}
          <span className="text-xs font-medium text-muted-foreground hidden sm:block max-w-[100px] truncate">
            {session.user.name || session.user.email}
          </span>
        </div>
      ) : (
        // Guest user
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center">
            <User weight="bold" className="w-3.5 h-3.5 text-muted-foreground" />
          </div>
          <span className="text-xs font-medium text-muted-foreground hidden sm:block">
            Guest
          </span>
        </div>
      )}

      <Button
        variant="ghost"
        size="sm"
        onClick={handleSignOut}
        className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
        title="Sign out"
      >
        <SignOut weight="bold" className="w-4 h-4" />
      </Button>
    </div>
  );
}
