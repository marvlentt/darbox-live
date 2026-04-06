import React from 'react';

export default function DarBoxLogo({ variant = "light", size = "md", className = "" }) {
  // We increased the icon height (h-10, h-14) and font sizes to make it bigger and bolder
  // We also increased the gap so it breathes better
  const sizes = {
    sm: { icon: "h-8", font: "text-lg", gap: "gap-1" },
    md: { icon: "h-12 md:h-14", font: "text-3xl md:text-4xl", gap: "gap-1.5" }, // Tighter gap for the Navbar
    lg: { icon: "h-20 md:h-24", font: "text-5xl md:text-6xl", gap: "gap-2" },   // Tighter gap for the Hero/Newsletter
  };

  const { icon: iconClass, font: fontClass, gap: gapClass } = sizes[size];

  // Text Colors
  const darColor = variant === "dark" ? "#FFFFFF" : "#0D1117";
  const boxColor = variant === "dark" ? "#22A663" : "#1A7A4A";

  // Magic trick: If it's dark mode, we use CSS to turn your dark green PNG into pure white!
  // This saves you from needing a second image file.
  const imageFilter = variant === "dark" ? "brightness(0) invert(1)" : "none";

  return (
    <div className={`flex items-end select-none ${gapClass} ${className}`}>
      {/* 1. The Custom Image Icon */}
      <img
        // ... le reste du code reste exactement pareil
        src="/assets/Darbox_Logo.png"
        alt="DarBox Icon"
        className={`${iconClass} w-auto object-contain flex-shrink-0`}
        style={{ filter: imageFilter }}
      />

      {/* 2. The Crisp HTML Wordmark */}
      <span
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 800,
          letterSpacing: "-0.01em", // Less "meshed" than before
          lineHeight: 1,
        }}
        className={fontClass}
      >
        <span style={{ color: darColor }}>Dar</span>
        <span style={{ color: boxColor }}>Box</span>
      </span>
    </div>
  );
}