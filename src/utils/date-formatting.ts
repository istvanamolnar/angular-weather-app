export function isToday(date: string): boolean {
  const today = new Date();
  const givenDate = new Date(formatDateString(date));
  return givenDate.getDate() === today.getDate()
    && givenDate.getMonth() === today.getMonth()
    && givenDate.getFullYear() === today.getFullYear();
}

export function formatDateString(date: string): string {
  return date.split('.').reverse().join('-');
}