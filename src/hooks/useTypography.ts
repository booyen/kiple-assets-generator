'use client';

import { useMemo } from 'react';
import { useCustomizationStore, fontFamilyMap } from '@/store/useCustomizationStore';
import { CSSProperties } from 'react';

export interface TypographyStyles {
  fontFamily: string;
  h1: CSSProperties;
  h2: CSSProperties;
  h3: CSSProperties;
  body: CSSProperties;
  small: CSSProperties;
  caption: CSSProperties;
  button: CSSProperties;
}

export function useTypography(): TypographyStyles {
  const { typography } = useCustomizationStore();

  return useMemo(() => {
    const fontFamily = fontFamilyMap[typography.fontFamily];
    const baseLineHeight = typography.lineHeight;
    const letterSpacing = `${typography.letterSpacing}em`;

    return {
      fontFamily,
      h1: {
        fontFamily,
        fontSize: `${typography.scale.h1}px`,
        fontWeight: typography.weights.heading,
        lineHeight: baseLineHeight,
        letterSpacing,
      },
      h2: {
        fontFamily,
        fontSize: `${typography.scale.h2}px`,
        fontWeight: typography.weights.heading,
        lineHeight: baseLineHeight,
        letterSpacing,
      },
      h3: {
        fontFamily,
        fontSize: `${typography.scale.h3}px`,
        fontWeight: typography.weights.subheading,
        lineHeight: baseLineHeight,
        letterSpacing,
      },
      body: {
        fontFamily,
        fontSize: `${typography.scale.body}px`,
        fontWeight: typography.weights.body,
        lineHeight: baseLineHeight,
        letterSpacing,
      },
      small: {
        fontFamily,
        fontSize: `${typography.scale.small}px`,
        fontWeight: typography.weights.body,
        lineHeight: baseLineHeight,
        letterSpacing,
      },
      caption: {
        fontFamily,
        fontSize: `${typography.scale.caption}px`,
        fontWeight: typography.weights.caption,
        lineHeight: baseLineHeight,
        letterSpacing,
      },
      button: {
        fontFamily,
        fontSize: `${typography.scale.body}px`,
        fontWeight: typography.weights.subheading,
        lineHeight: 1,
        letterSpacing,
      },
    };
  }, [typography]);
}
