import type { MapStyle } from "@/lib/types";

export function MapSilhouette({
  style,
  color,
}: {
  style: MapStyle;
  color: string;
}) {
  if (style === "none") return null;

  if (style === "city") {
    return (
      <svg viewBox="0 0 200 80" className="h-full w-full" aria-hidden>
        <path
          fill={color}
          opacity="0.18"
          d="M0 70h12V40h10v30h8V28h14v42h10V20h8v10h8V20h8v50h12V34h16v36h10V24l12-8 12 8v46h14V48h10v22h16v8H0z"
        />
      </svg>
    );
  }

  if (style === "skyline") {
    return (
      <svg viewBox="0 0 200 80" className="h-full w-full" aria-hidden>
        <path
          fill={color}
          opacity="0.2"
          d="M0 78V48l18-10 10 6v34h14V30l16-14 10 8 8-4v58h18V38h12v40h10V22l20-12 14 10v58h16V44h12v34h12v8H0z"
        />
      </svg>
    );
  }

  if (style === "state") {
    return (
      <svg viewBox="0 0 120 80" className="h-full w-full" aria-hidden>
        <path
          fill={color}
          opacity="0.16"
          d="M20 18h70l10 12v30l-18 12H28L14 54V30z"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 120 80" className="h-full w-full" aria-hidden>
      <path
        fill={color}
        opacity="0.16"
        d="M18 28c8-14 30-18 46-12 12 4 24 4 32 14 4 6 6 16-2 24-10 10-28 14-46 10-16-4-30-8-34-20-2-6 0-12 4-16z"
      />
    </svg>
  );
}
