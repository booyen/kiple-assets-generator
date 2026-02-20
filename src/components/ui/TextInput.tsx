'use client';

import { Input } from './input';
import { Textarea } from './textarea';
import { Label } from './label';

interface TextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
}

export function TextInput({
  label,
  value,
  onChange,
  placeholder,
  multiline = false,
  rows = 2
}: TextInputProps) {
  return (
    <div className="grid w-full gap-1.5">
      <Label>{label}</Label>
      {multiline ? (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className="resize-none"
        />
      ) : (
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}
