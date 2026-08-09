import { ImageResponse } from "next/og";

export const alt = "KindSign — free community donation yard sign template";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Share preview: a finished Hope Green yard sign as the product hero.
 * Twitter/X + Open Graph both pick this up via file convention.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #E8F3EA 0%, #F7FBF7 45%, #FFF1E6 100%)",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Soft atmosphere dots */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(47,107,79,0.12) 0%, transparent 40%), radial-gradient(circle at 85% 75%, rgba(224,138,79,0.14) 0%, transparent 35%)",
            display: "flex",
          }}
        />

        {/* Brand chip */}
        <div
          style={{
            position: "absolute",
            top: 36,
            left: 48,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 999,
              background: "#2F6B4F",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            K
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              color: "#1C3228",
            }}
          >
            <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.5 }}>KindSign</div>
            <div style={{ fontSize: 16, color: "#4A6354" }}>Free community yard signs</div>
          </div>
        </div>

        {/* Finished yard sign board */}
        <div
          style={{
            width: 420,
            height: 520,
            background: "#E8F3EA",
            borderRadius: 18,
            boxShadow: "0 28px 60px rgba(28,50,40,0.22)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 36,
            border: "1px solid #B7D0BD",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 10,
              border: "1px dashed #B7D0BD",
              borderRadius: 12,
              opacity: 0.55,
              display: "flex",
            }}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 999,
                background: "#F7FBF7",
                border: "1px solid #B7D0BD",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#2F6B4F",
                fontSize: 26,
              }}
            >
              ♥
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: "#4A6354",
                fontFamily: "Helvetica, Arial, sans-serif",
              }}
            >
              HELP A NEIGHBOR
            </div>
            <div
              style={{
                fontSize: 64,
                fontWeight: 700,
                lineHeight: 0.95,
                letterSpacing: -2,
                color: "#2F6B4F",
              }}
            >
              FOOD
            </div>
            <div
              style={{
                fontSize: 22,
                color: "#1C3228",
                fontFamily: "Helvetica, Arial, sans-serif",
              }}
            >
              Support Families Nearby
            </div>
          </div>

          <div
            style={{
              background: "#F7FBF7",
              borderRadius: 14,
              border: "1px solid #B7D0BD",
              padding: 16,
              display: "flex",
              flexDirection: "column",
              gap: 6,
              fontFamily: "Helvetica, Arial, sans-serif",
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: "#4A6354",
              }}
            >
              Drop-off location
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#1C3228" }}>
              Neighborhood Pantry
            </div>
            <div style={{ fontSize: 14, color: "#4A6354" }}>
              42 Hope Street, Your City, CA 90210
            </div>
          </div>

          <div
            style={{
              textAlign: "center",
              fontSize: 18,
              fontStyle: "italic",
              color: "#2F6B4F",
              display: "flex",
              justifyContent: "center",
            }}
          >
            Neighbors Helping Neighbors.
          </div>
        </div>

        {/* Right copy */}
        <div
          style={{
            marginLeft: 48,
            width: 420,
            display: "flex",
            flexDirection: "column",
            gap: 18,
            color: "#1C3228",
          }}
        >
          <div
            style={{
              fontSize: 48,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -1.5,
            }}
          >
            Design a yard sign in under 5 minutes.
          </div>
          <div
            style={{
              fontSize: 24,
              color: "#4A6354",
              lineHeight: 1.35,
              fontFamily: "Helvetica, Arial, sans-serif",
            }}
          >
            Free templates for food drives, schools, churches, and neighbors who want to help.
          </div>
          <div
            style={{
              marginTop: 8,
              fontSize: 20,
              fontWeight: 700,
              color: "#2F6B4F",
              fontFamily: "Helvetica, Arial, sans-serif",
            }}
          >
            kindsign.vercel.app
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
