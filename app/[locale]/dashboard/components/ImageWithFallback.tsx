"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";
import { User } from "lucide-react";

interface ImageWithFallbackProps extends Omit<ImageProps, "src"> {
  src?: string;
  fallbackSrc?: string;
  fallbackIcon?: React.ElementType;
}

export default function ImageWithFallback({
  src,
  fallbackSrc = "/images/placeholder.png", // specific default or generic one
  fallbackIcon: FallbackIcon = User,
  alt,
  className,
  ...props
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  if (error || !src) {
    if (fallbackSrc && !error) {
       // Only try fallback src if we haven't errored on it yet? 
       // Actually simpler: if src fails, show icon or fallback image.
       // Let's just default to a nice icon container if image fails or missing.
    }
    
    return (
      <div className={`flex items-center justify-center bg-secondary text-muted-foreground ${className}`}>
        <FallbackIcon className="w-1/2 h-1/2" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setError(true)}
      className={className}
      {...props as any}
    />
  );
}
