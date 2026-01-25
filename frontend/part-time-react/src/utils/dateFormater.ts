export const dateFormater = (start: string, end: string) => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const sameDay = startDate.toDateString() === endDate.toDateString();

  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  });

  const timeFormatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const startDatePart = dateFormatter.format(startDate);
  const startTimePart = timeFormatter.format(startDate);
  const endTimePart = timeFormatter.format(endDate);

  if (sameDay) {
    return `${startDatePart}, ${startTimePart} to ${endTimePart}`;
  }

  const endDatePart = dateFormatter.format(endDate);
  return `${startDatePart}, ${startTimePart} to ${endDatePart}, ${endTimePart}`;
};
