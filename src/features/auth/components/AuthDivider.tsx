import React from "react";

export function AuthDivider() {
  return (
    <div className="relative my-2 flex items-center justify-center">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-[#B5B1B1]" />
      </div>
      <div className="font-geist relative bg-white px-4 text-[12px] leading-[16px] font-medium tracking-[0.02em] text-[#2B2B2B]">
        Or
      </div>
    </div>
  );
}
