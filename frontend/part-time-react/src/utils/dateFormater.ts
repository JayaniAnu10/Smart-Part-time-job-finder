export const dateFormater = (start: string | null, end: string | null) => {
  // Handle null or undefined inputs
  if (!start || !end) {
    return "Date not available";
  }

  const startDate = new Date(start);
  const endDate = new Date(end);

  // Check if dates are valid
  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    return "Invalid date";
  }

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
