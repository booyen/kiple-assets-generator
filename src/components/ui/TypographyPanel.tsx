'use client';

import { useCustomizationStore, fontFamilyMap } from '@/store/useCustomizationStore';
import { Select } from './Select';
import { Slider } from './Slider';
import { FontFamily } from '@/types';

const fontOptions = [
  { value: 'inter', label: 'Inter' },
  { value: 'roboto', label: 'Roboto' },
  { value: 'poppins', label: 'Poppins' },
  { value: 'montserrat', label: 'Montserrat' },
  { value: 'opensans', label: 'Open Sans' },
  { value: 'lato', label: 'Lato' },
  { value: 'nunito', label: 'Nunito' },
];

const weightOptions = [
  { value: '300', label: 'Light (300)' },
  { value: '400', label: 'Regular (400)' },
  { value: '500', label: 'Medium (500)' },
  { value: '600', label: 'Semi Bold (600)' },
  { value: '700', label: 'Bold (700)' },
  { value: '800', label: 'Extra Bold (800)' },
];

export function TypographyPanel() {
  const {
    typography,
    setTypographyFontFamily,
    setTypographyScale,
    setTypographyWeight,
    setTypographyLineHeight,
    setTypographyLetterSpacing,
  } = useCustomizationStore();

  return (
    <div className="space-y-5">
      {/* Font Family */}
      <Select
        label="Font Family"
        value={typography.fontFamily}
        onChange={(v) => setTypographyFontFamily(v as FontFamily)}
        options={fontOptions}
      />

      {/* Font Preview */}
      <div
        className="p-3 bg-slate-50 rounded-lg border border-slate-200"
        style={{ fontFamily: fontFamilyMap[typography.fontFamily] }}
      >
        <p className="text-xs text-slate-500 mb-1">Preview</p>
        <p style={{ fontSize: typography.scale.h2, fontWeight: typography.weights.heading }}>
          Heading Text
        </p>
        <p style={{ fontSize: typography.scale.body, fontWeight: typography.weights.body }}>
          Body text sample
        </p>
      </div>

      {/* Type Scale */}
      <div className="space-y-3">
        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Type Scale (px)
        </h4>
        <Slider
          label="H1 (Large Heading)"
          value={typography.scale.h1}
          onChange={(v) => setTypographyScale('h1', v)}
          min={24}
          max={48}
          unit="px"
        />
        <Slider
          label="H2 (Section Heading)"
          value={typography.scale.h2}
          onChange={(v) => setTypographyScale('h2', v)}
          min={18}
          max={36}
          unit="px"
        />
        <Slider
          label="H3 (Subsection)"
          value={typography.scale.h3}
          onChange={(v) => setTypographyScale('h3', v)}
          min={14}
          max={28}
          unit="px"
        />
        <Slider
          label="Body"
          value={typography.scale.body}
          onChange={(v) => setTypographyScale('body', v)}
          min={12}
          max={20}
          unit="px"
        />
        <Slider
          label="Small"
          value={typography.scale.small}
          onChange={(v) => setTypographyScale('small', v)}
          min={10}
          max={16}
          unit="px"
        />
        <Slider
          label="Caption"
          value={typography.scale.caption}
          onChange={(v) => setTypographyScale('caption', v)}
          min={8}
          max={14}
          unit="px"
        />
      </div>

      {/* Font Weights */}
      <div className="space-y-3">
        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Font Weights
        </h4>
        <Select
          label="Headings"
          value={String(typography.weights.heading)}
          onChange={(v) => setTypographyWeight('heading', Number(v))}
          options={weightOptions}
        />
        <Select
          label="Subheadings"
          value={String(typography.weights.subheading)}
          onChange={(v) => setTypographyWeight('subheading', Number(v))}
          options={weightOptions}
        />
        <Select
          label="Body Text"
          value={String(typography.weights.body)}
          onChange={(v) => setTypographyWeight('body', Number(v))}
          options={weightOptions}
        />
      </div>

      {/* Line Height & Letter Spacing */}
      <div className="space-y-3">
        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Spacing
        </h4>
        <Slider
          label="Line Height"
          value={typography.lineHeight}
          onChange={setTypographyLineHeight}
          min={1}
          max={2}
          step={0.1}
        />
        <Slider
          label="Letter Spacing"
          value={typography.letterSpacing}
          onChange={setTypographyLetterSpacing}
          min={-0.05}
          max={0.1}
          step={0.01}
          unit="em"
        />
      </div>
    </div>
  );
}
