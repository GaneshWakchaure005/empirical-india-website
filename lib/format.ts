/**
 * Formatting utilities for dates, event ranges, and article reading times.
 */

export function formatDate(dateInput?: string | Date): string {
  if (!dateInput) return "";
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function formatDateTime(dateInput?: string | Date): string {
  if (!dateInput) return "";
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export function formatDateRange(
  startDateInput?: string | Date,
  endDateInput?: string | Date
): string {
  if (!startDateInput) return "";
  const start = new Date(startDateInput);
  if (isNaN(start.getTime())) return "";

  const startFormatted = formatDate(start);
  if (!endDateInput) return startFormatted;

  const end = new Date(endDateInput);
  if (isNaN(end.getTime())) return startFormatted;

  // If in the same month and year
  if (
    start.getFullYear() === end.getFullYear() &&
    start.getMonth() === end.getMonth()
  ) {
    const month = new Intl.DateTimeFormat("en-IN", { month: "short" }).format(start);
    return `${month} ${start.getDate()} – ${end.getDate()}, ${start.getFullYear()}`;
  }

  return `${startFormatted} – ${formatDate(end)}`;
}

export function estimateReadingTime(content?: string): string {
  if (!content) return "1 min read";
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}
