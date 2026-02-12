'use client';

import { useCallback, useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface FileUploadProps {
  label: string;
  value: string | null;
  onChange: (dataUrl: string | null) => void;
  accept?: string;
  hint?: string;
}

export function FileUpload({
  label,
  value,
  onChange,
  accept = '.svg,.png,image/svg+xml,image/png',
  hint,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Parse accept prop to get valid MIME types
  const getValidTypes = useCallback(() => {
    const types: string[] = [];
    if (accept.includes('svg')) types.push('image/svg+xml');
    if (accept.includes('png')) types.push('image/png');
    if (accept.includes('jpeg') || accept.includes('jpg')) types.push('image/jpeg');
    if (accept.includes('webp')) types.push('image/webp');
    if (accept.includes('gif')) types.push('image/gif');
    // If no specific types found, allow common image types
    if (types.length === 0) {
      return ['image/svg+xml', 'image/png', 'image/jpeg', 'image/webp'];
    }
    return types;
  }, [accept]);

  const handleFile = useCallback((file: File) => {
    setError(null);

    const validTypes = getValidTypes();
    if (!validTypes.includes(file.type)) {
      const typeNames = validTypes.map(t => t.split('/')[1].toUpperCase()).join(', ');
      setError(`Please upload ${typeNames} files only`);
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onChange(result);
    };
    reader.onerror = () => {
      setError('Failed to read file');
    };
    reader.readAsDataURL(file);
  }, [onChange, getValidTypes]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  }, [handleFile]);

  const handleRemove = useCallback(() => {
    onChange(null);
    setError(null);
  }, [onChange]);

  // Generate hint text based on accept types
  const getHintText = () => {
    if (hint) return hint;
    const validTypes = getValidTypes();
    const typeNames = validTypes.map(t => t.split('/')[1].toUpperCase()).join('/');
    return `Drop ${typeNames} or click to upload`;
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>

      {value ? (
        <div className="relative group">
          <div className="w-full h-24 bg-slate-100 rounded-lg flex items-center justify-center border-2 border-slate-200 overflow-hidden">
            <img
              src={value}
              alt="Uploaded image"
              className="max-w-full max-h-full object-contain p-2"
            />
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-600"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <label
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`
            w-full h-28 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all p-6 gap-2
            ${isDragging
              ? 'border-blue-500 bg-blue-50'
              : 'border-slate-300 hover:border-slate-400 hover:bg-slate-50'
            }
          `}
        >
          <input
            type="file"
            accept={accept}
            onChange={handleInputChange}
            className="sr-only"
          />
          <Upload size={24} className="text-slate-400" />
          <span className="text-slate-500 text-center w-full block" style={{ fontSize: '12px' }}>
            {getHintText()}
          </span>
        </label>
      )}

      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <span>!</span> {error}
        </p>
      )}
    </div>
  );
}
