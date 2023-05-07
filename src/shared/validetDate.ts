export function isValidDate(date: any): boolean {
  return (date instanceof Date) && (!isNaN(date.getTime())) && (date.getTime() > new Date('1800-01-01').getTime());
};

export function dateIsValid(dateStr: string): boolean {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (dateStr.match(regex) === null) {
    return false;
  }

  const date = new Date(dateStr);
  const timestamp = date.getTime();
  if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) {
    return false;
  }

  return date.toISOString().startsWith(dateStr);
}