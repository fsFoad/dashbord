export function saveAs(blob: Blob, filename?: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename ?? 'download';
  a.click();
  URL.revokeObjectURL(url);
}
