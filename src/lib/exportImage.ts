import { toPng, toJpeg } from 'html-to-image';
import { saveAs } from 'file-saver';

export interface ExportOptions {
  format?: 'png' | 'jpeg';
  quality?: number;
  scale?: number;
  filename?: string;
}

const defaultOptions: ExportOptions = {
  format: 'png',
  quality: 0.9,
  scale: 2, // 2x for 2K quality
};

export async function exportElement(
  element: HTMLElement,
  options: ExportOptions = {}
): Promise<Blob> {
  const { format, quality, scale } = { ...defaultOptions, ...options };

  const exportOptions = {
    quality: format === 'jpeg' ? quality : undefined,
    pixelRatio: scale,
    cacheBust: true,
    style: {
      transform: 'scale(1)',
      transformOrigin: 'top left',
    },
  };

  let dataUrl: string;

  if (format === 'png') {
    dataUrl = await toPng(element, exportOptions);
  } else {
    dataUrl = await toJpeg(element, exportOptions);
  }

  // Convert data URL to Blob
  const response = await fetch(dataUrl);
  const blob = await response.blob();

  return blob;
}

export async function downloadElement(
  element: HTMLElement,
  options: ExportOptions = {}
): Promise<void> {
  const { format, filename } = { ...defaultOptions, ...options };

  const blob = await exportElement(element, options);
  const extension = format === 'png' ? 'png' : 'jpg';
  const finalFilename = filename || `screen-${Date.now()}.${extension}`;

  saveAs(blob, finalFilename);
}

export function generateFilename(screenId: string, format: 'png' | 'jpeg'): string {
  const extension = format === 'png' ? 'png' : 'jpg';
  const timestamp = new Date().toISOString().split('T')[0];
  return `${screenId}-${timestamp}.${extension}`;
}
