"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface AvatarProps {
  src?: string | null;
  alt: string;
  size?: number;
  className?: string;
  fallbackText: string;
  showBorder?: boolean;
}

export default function Avatar({
  src,
  alt,
  size = 128,
  className = "",
  fallbackText,
  showBorder = false,
}: AvatarProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(!!src);

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  // Reset error state when src changes
  useEffect(() => {
    if (src) {
      setImageError(false);
      setImageLoading(true);
    } else {
      setImageLoading(false);
    }
  }, [src]);

  const baseClasses = `relative overflow-hidden bg-gray-200 flex items-center justify-center ${className}`;
  const borderClasses = showBorder ? "ring-2 ring-white shadow-lg" : "";
  const combinedClasses = `${baseClasses} ${borderClasses}`.trim();

  const containerStyle = {
    width: size,
    height: size,
  };

  const textSize =
    size >= 128
      ? "text-4xl"
      : size >= 64
      ? "text-2xl"
      : size >= 32
      ? "text-lg"
      : "text-sm";

  if (!src || imageError) {
    return (
      <div
        className={`${combinedClasses} bg-gradient-to-br from-blue-500 to-purple-600`}
        style={containerStyle}
      >
        <span className={`${textSize} font-bold text-white`}>
          {fallbackText.charAt(0).toUpperCase()}
        </span>
      </div>
    );
  }

  return (
    <div className={combinedClasses} style={containerStyle}>
      {imageLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div
            className="border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
            style={{
              width: Math.max(16, size / 8),
              height: Math.max(16, size / 8),
            }}
          ></div>
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          imageLoading ? "opacity-0" : "opacity-100"
        }`}
        onError={handleImageError}
        onLoad={handleImageLoad}
        unoptimized={process.env.NODE_ENV === "development"}
        priority={false}
      />
    </div>
  );
}

// Utility function to generate avatar URL from name
export function getAvatarUrl(name: string, size: number = 128): string {
  const initial = name.charAt(0).toUpperCase();
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name
  )}&size=${size}&background=random&color=ffffff&format=png`;
}

// Hook for avatar with fallback
export function useAvatarWithFallback(src?: string | null, name?: string) {
  const [finalSrc, setFinalSrc] = useState<string | null>(src || null);

  useEffect(() => {
    if (src) {
      setFinalSrc(src);
    } else if (name) {
      setFinalSrc(getAvatarUrl(name));
    } else {
      setFinalSrc(null);
    }
  }, [src, name]);

  return finalSrc;
}
