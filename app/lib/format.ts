/**
 * Formats a file size in bytes to a human-readable string (KB, MB, GB)
 * @param bytes - The size in bytes
 * @returns A formatted string with the appropriate unit (B, KB, MB, GB, TB)
 */
export function formatSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  if (bytes < 0) return 'Invalid size';

  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  
  // Ensure we don't exceed the available units
  const unitIndex = Math.min(i, units.length - 1);
  
  // Convert to the appropriate unit and round to 2 decimal places
  const size = bytes / Math.pow(1024, unitIndex);
  
  // Format with 2 decimal places for larger units but remove trailing zeros
  return `${size.toFixed(unitIndex === 0 ? 0 : 2).replace(/\.0+$/, '').replace(/(\.\d+)0$/, '$1')} ${units[unitIndex]}`;
}