export function isToday(date: Date): boolean {
  const today = new Date();
  return date.getDate() === today.getDate()
    && date.getMonth() === today.getMonth()
    && date.getFullYear() === today.getFullYear();
}

export function formatDateString(date: Date): string {
  return date.toISOString().split('T')[0];
}