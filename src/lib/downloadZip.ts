import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { exportElement, ExportOptions, generateFilename } from './exportImage';

export interface BatchExportItem {
  screenId: string;
  element: HTMLElement;
}

export async function downloadAsZip(
  items: BatchExportItem[],
  options: ExportOptions = {},
  zipFilename: string = 'screens.zip'
): Promise<void> {
  const zip = new JSZip();
  const folder = zip.folder('screens');

  if (!folder) {
    throw new Error('Failed to create ZIP folder');
  }

  // Export all items and add to ZIP
  const promises = items.map(async (item) => {
    const blob = await exportElement(item.element, options);
    const filename = generateFilename(item.screenId, options.format || 'png');
    folder.file(filename, blob);
  });

  await Promise.all(promises);

  // Generate and download ZIP
  const zipBlob = await zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 },
  });

  saveAs(zipBlob, zipFilename);
}

export async function exportScreensSequentially(
  getElement: (screenId: string) => Promise<HTMLElement | null>,
  screenIds: string[],
  options: ExportOptions = {},
  onProgress?: (current: number, total: number) => void
): Promise<Blob[]> {
  const blobs: Blob[] = [];

  for (let i = 0; i < screenIds.length; i++) {
    const screenId = screenIds[i];
    const element = await getElement(screenId);

    if (element) {
      const blob = await exportElement(element, options);
      blobs.push(blob);
    }

    if (onProgress) {
      onProgress(i + 1, screenIds.length);
    }
  }

  return blobs;
}
