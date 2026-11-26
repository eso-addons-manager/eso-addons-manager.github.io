// Shared formatting helpers for release data.

export function formatFileSize(bytes: number): string {
  if (bytes <= 0) return '—';
  const units = ['B', 'KB', 'MB', 'GB'];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / Math.pow(1024, i);
  const formatted = i === 0 ? value.toFixed(0) : value.toFixed(1);
  return `${formatted} ${units[i]}`;
}

export function formatDate(isoDate: string): string {
  try {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return isoDate;
  }
}
