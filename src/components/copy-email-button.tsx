"use client";

import { useState } from "react";
import { buttonLinkClassName } from "@/components/button-link";

type CopyEmailButtonProps = {
  email: string;
};

export function CopyEmailButton({ email }: CopyEmailButtonProps) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleCopy}
        className={buttonLinkClassName("secondary", "w-full")}
      >
        {status === "copied" ? "Email address copied" : "Copy email address"}
      </button>
      <p aria-live="polite" className="mt-2 text-center text-xs leading-5 text-secondary">
        {status === "copied"
          ? "The email address is on your clipboard."
          : status === "failed"
            ? "Clipboard access was blocked. Select the address below to copy it manually."
            : "Or copy the address to use in your preferred email app."}
      </p>
      {status === "failed" ? (
        <p className="mt-2 select-all break-all rounded-lg border border-border bg-surface px-3 py-2 text-center text-sm text-primary">
          {email}
        </p>
      ) : null}
    </div>
  );
}
