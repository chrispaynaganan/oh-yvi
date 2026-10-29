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