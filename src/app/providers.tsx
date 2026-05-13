"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { SessionProvider } from "next-auth/react";

const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <GoogleOAuthProvider clientId={clientId}>{children}</GoogleOAuthProvider>
    </SessionProvider>
  );
}
