"use client";

import Image from "next/image";
import { useState } from "react";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number;
  fallbackText?: string;
  className?: string;
  showBorder?: boolean;
}

export default function Avatar({
  src,
  alt = "Avatar",
  size = 40,
  fallbackText = "U",
  className = "",
  showBorder = false,
}: AvatarProps) {
  const [imageError, setImageError] = useState(false);

  // Generate initials from fallbackText
  const getInitials = (text: string): string => {
    if (!text) return "U";
    return text
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const initials = getInitials(fallbackText || alt);

  // Create border class if showBorder is true
  const borderClass = showBorder ? "ring-4 ring-white shadow-lg" : "";

  // If no src or image failed to load, show initials
  if (!src || imageError) {
    return (
      <div
        className={`flex items-center justify-center bg-blue-500 text-white font-medium rounded-full ${borderClass} ${className}`}
        style={{ width: size, height: size, fontSize: size * 0.4 }}
      >
        {initials}
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-full ${borderClass} ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className="object-cover"
        onError={() => setImageError(true)}
        unoptimized // Allow external images
      />
    </div>
  );
}
