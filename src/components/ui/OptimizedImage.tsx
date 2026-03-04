import React from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({ 
  src, 
  alt, 
  className = "", 
  loading = "lazy",
  decoding = "async"
}) => {
  // Remove file extension to create versions
  const basePath = src.replace(/\.[^/.]+$/, '');
  
  return (
    <picture>
      <source srcSet={`${basePath}.avif`} type="image/avif" />
      <source srcSet={`${basePath}.webp`} type="image/webp" />
      <img 
        src={src} 
        alt={alt} 
        className={className}
        loading={loading}
        decoding={decoding}
      />
    </picture>
  );
};