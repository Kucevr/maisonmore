/**
 * Image optimization utilities for responsive images
 */

export interface ImageSrcSet {
  srcSet: string;
  sizes: string;
}

/**
 * Generate srcset for responsive images
 * @param basePath - Base path without extension (e.g., '/assets/hero/main')
 * @param format - Image format (e.g., 'jpg', 'png', 'webp')
 * @returns Object with srcSet and sizes attributes
 */
export const generateSrcSet = (basePath: string, format: string = 'jpg'): ImageSrcSet => {
  const sizes = {
    mobile: 640,
    tablet: 1024,
    desktop: 1920,
    full: 2560,
  };

  const srcSet = `
    ${basePath}-${sizes.mobile}.${format} ${sizes.mobile}w,
    ${basePath}-${sizes.tablet}.${format} ${sizes.tablet}w,
    ${basePath}-${sizes.desktop}.${format} ${sizes.desktop}w,
    ${basePath}-${sizes.full}.${format} ${sizes.full}w
  `.trim();

  const sizesAttr = '(max-width: 640px) 100vw, (max-width: 1024px) 90vw, (max-width: 1920px) 80vw, 1920px';

  return { srcSet, sizes: sizesAttr };
};

/**
 * Get optimized image URL (for single images)
 */
export const getOptimizedImageUrl = (path: string): string => {
  // For now, return original path. In production, this could integrate with image optimization service
  return path;
};

/**
 * Preload critical images
 */
export const preloadImage = (src: string): void => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  document.head.appendChild(link);
};

/**
 * Create picture element with WebP fallback
 */
export const generatePictureHTML = (
  basePath: string,
  alt: string,
  className?: string
): string => {
  return `
    <picture>
      <source srcset="${basePath}.webp" type="image/webp">
      <img src="${basePath}.jpg" alt="${alt}" class="${className || ''}" loading="lazy" decoding="async">
    </picture>
  `;
};
