export function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
  return formattedDate;
}