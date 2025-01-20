export function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
  return formattedDate;
}

export function formatTransactionId(id: string) {
  const ID_LENGTH = 8;
  return `#${id.slice(0, ID_LENGTH)}`;
}