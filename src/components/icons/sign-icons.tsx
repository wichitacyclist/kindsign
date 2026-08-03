import type { IconId } from "@/lib/types";
import { cn } from "@/lib/utils";

interface IconProps {
  id: IconId;
  className?: string;
  color?: string;
}

function Svg({
  children,
  className,
  color,
}: {
  children: React.ReactNode;
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={cn("shrink-0", className)}
      stroke={color ?? "currentColor"}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {children}
    </svg>
  );
}

export function SignIcon({ id, className, color }: IconProps) {
  if (id === "none") return null;

  const props = { className, color };

  switch (id) {
    case "handshake":
      return (
        <Svg {...props}>
          <path d="M10 30c6-8 14-8 22 0" />
          <path d="M32 30c6-8 14-8 22 0" />
          <path d="M18 34c4 6 10 8 14 8s10-2 14-8" />
          <path d="M24 28l4 4 4-3 4 3 4-4" />
        </Svg>
      );
    case "heart":
      return (
        <Svg {...props}>
          <path d="M32 52s-18-11-18-24a10 10 0 0 1 18-6 10 10 0 0 1 18 6c0 13-18 24-18 24z" fill="currentColor" stroke="none" />
        </Svg>
      );
    case "home":
      return (
        <Svg {...props}>
          <path d="M10 30L32 12l22 18" />
          <path d="M16 28v22h32V28" />
          <path d="M26 50V34h12v16" />
        </Svg>
      );
    case "church":
      return (
        <Svg {...props}>
          <path d="M32 8v10" />
          <path d="M27 13h10" />
          <path d="M20 24h24v28H20z" />
          <path d="M14 52h36" />
          <path d="M32 24v12" />
          <path d="M26 30h12" />
          <path d="M28 52v-10h8v10" />
        </Svg>
      );
    case "school":
      return (
        <Svg {...props}>
          <path d="M8 28l24-12 24 12-24 12L8 28z" />
          <path d="M18 34v10c6 4 14 4 20 0V34" />
          <path d="M52 28v14" />
        </Svg>
      );
    case "food":
      return (
        <Svg {...props}>
          <path d="M18 12v20c0 6 4 10 10 10" />
          <path d="M18 12c0 8 4 10 4 16" />
          <path d="M26 12c0 8-4 10-4 16" />
          <path d="M40 12v40" />
          <path d="M40 12c8 0 10 8 10 16H40" />
        </Svg>
      );
    case "backpack":
      return (
        <Svg {...props}>
          <rect x="16" y="20" width="32" height="34" rx="8" />
          <path d="M24 20v-4a8 8 0 0 1 16 0v4" />
          <path d="M16 34h32" />
          <path d="M28 40h8" />
        </Svg>
      );
    case "baby":
      return (
        <Svg {...props}>
          <circle cx="32" cy="22" r="10" />
          <path d="M18 52c2-12 10-16 14-16s12 4 14 16" />
          <path d="M24 22h.01M40 22h.01" />
          <path d="M28 28c2 2 6 2 8 0" />
        </Svg>
      );
    case "pet":
      return (
        <Svg {...props}>
          <circle cx="20" cy="22" r="5" fill="currentColor" stroke="none" />
          <circle cx="44" cy="22" r="5" fill="currentColor" stroke="none" />
          <circle cx="26" cy="12" r="4" fill="currentColor" stroke="none" />
          <circle cx="38" cy="12" r="4" fill="currentColor" stroke="none" />
          <path d="M22 40c0-8 4-12 10-12s10 4 10 12c0 6-4 10-10 10s-10-4-10-10z" fill="currentColor" stroke="none" />
        </Svg>
      );
    case "tree":
      return (
        <Svg {...props}>
          <path d="M32 54V34" />
          <path d="M32 34c-10 0-16 8-16 14h32c0-6-6-14-16-14z" />
          <path d="M32 26c-8 0-12 6-12 10h24c0-4-4-10-12-10z" />
          <path d="M32 12c-6 0-9 4-9 8h18c0-4-3-8-9-8z" />
        </Svg>
      );
    case "leaf":
      return (
        <Svg {...props}>
          <path d="M48 16c-18 2-30 16-30 30 14 0 28-12 30-30z" />
          <path d="M18 46c8-8 16-14 24-18" />
        </Svg>
      );
    case "family":
      return (
        <Svg {...props}>
          <circle cx="22" cy="18" r="6" />
          <circle cx="42" cy="18" r="6" />
          <circle cx="32" cy="28" r="5" />
          <path d="M10 52c2-10 8-14 12-14s8 2 10 8c2-6 6-8 10-8s10 4 12 14" />
        </Svg>
      );
    default:
      return null;
  }
}

export const ICON_OPTIONS: { id: IconId; label: string }[] = [
  { id: "none", label: "None" },
  { id: "handshake", label: "Handshake" },
  { id: "heart", label: "Heart" },
  { id: "home", label: "Home" },
  { id: "church", label: "Church" },
  { id: "school", label: "School" },
  { id: "food", label: "Food" },
  { id: "backpack", label: "Backpack" },
  { id: "baby", label: "Baby" },
  { id: "pet", label: "Pet" },
  { id: "tree", label: "Tree" },
  { id: "leaf", label: "Leaf" },
  { id: "family", label: "Family" },
];
