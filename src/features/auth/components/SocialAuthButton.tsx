"use client";

import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";

interface SocialAuthButtonProps {
  text?: string;
}

const GoogleIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

export function SocialAuthButton({
  text = "Sign up with Google",
}: SocialAuthButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleGoogleSuccess = async (credentialResponse: {
    credential?: string;
  }) => {
    if (!credentialResponse.credential) {
      toast.error("Google login failed. No credential received.");
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch("/api/social/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_token: credentialResponse.credential }),
      });

      const data = await response.json();

      if (data.success && data.token) {
        toast.success("Google login successful!");
        useAuthStore.getState().login(data.token, data.email);
        router.push("/dashboard");
      } else {
        toast.error(data.message || "Backend rejected token");
        console.error("Backend rejected token:", data);
      }
    } catch (error) {
      toast.error("Google login failed. Please try again.");
      console.error("Google login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    /**
     * Overlay pattern: the visible button is decorative (pointer-events: none).
     * The real GoogleLogin button sits transparently on top of it and handles
     * all click events. This avoids any querySelector / DOM manipulation.
     *
     * Note: useGoogleLogin (implicit flow) only returns access_token, not
     * id_token. GoogleLogin returns credential (id_token), which our backend
     * requires — so we keep this component and style around it instead.
     */
    <div
      className={`group relative h-[46px] w-full overflow-hidden rounded-[8px] ${isLoading ? "pointer-events-none cursor-not-allowed opacity-50" : "cursor-pointer"}`}
      role="button"
      aria-label="Sign in with Google"
    >
      {/* ── Decorative layer (visual only, not interactive) ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center gap-2 rounded-[8px] border border-[#2B2B2B80] bg-transparent transition-colors group-hover:bg-neutral-50 group-active:bg-neutral-100"
      >
        <GoogleIcon />
        <span className="font-geist text-[16px] leading-none font-normal tracking-[-0.01em] text-[#2D2D2D]">
          {isLoading ? "Connecting..." : text}
        </span>
      </div>

      {/* ── Real Google button (transparent, covers full area) ── */}
      <div className="absolute inset-0 z-20 overflow-hidden opacity-0">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => toast.error("Google Login Failed")}
          width={600}
          useOneTap={false}
        />
      </div>
    </div>
  );
}
