"use client";

/** Split so the full address is not sitting as plain text in the HTML. */
const LOCAL = "doerksenj24";
const DOMAIN = "gmail.com";

export function ContactLink({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        window.location.href = `mailto:${LOCAL}@${DOMAIN}`;
      }}
    >
      Contact
    </button>
  );
}
