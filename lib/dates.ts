const longDate = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "Asia/Manila",
});

/** "July 13, 2026" in Philippine time */
export function formatLongDate(iso: string | Date) {
  return longDate.format(typeof iso === "string" ? new Date(iso) : iso);
}

const time = new Intl.DateTimeFormat("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
  timeZone: "Asia/Manila",
});

/** "09:45 AM" in Philippine time */
export function formatTime(iso: string | Date) {
  return time.format(typeof iso === "string" ? new Date(iso) : iso);
}