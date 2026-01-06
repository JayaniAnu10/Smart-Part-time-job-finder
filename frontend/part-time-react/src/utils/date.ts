export const getDaysLeft = (deadline?: string) => {
  if (!deadline) return "0 days left";

  const now = new Date();
  const end = new Date(deadline);
  const diffTime = end.getTime() - now.getTime();
  if (diffTime <= 0) return "Closed";

  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(
    (diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );

  // Less than 1 day  show only hours
  if (diffDays === 0) {
    const label = diffHours === 1 ? "hour" : "hours";
    return `${diffHours} ${label} left`;
  }

  const dayLabel = diffDays === 1 ? "day" : "days";
  const hourLabel = diffHours === 1 ? "hour" : "hours";

  return `${diffDays} ${dayLabel} ${diffHours} ${hourLabel} left`;
};

export const getTimeAgo = (postedDate?: string) => {
  if (!postedDate) return "";

  const now = new Date();
  const posted = new Date(postedDate);

  // Check if date is valid
  if (isNaN(posted.getTime())) return "";

  const diffTime = now.getTime() - posted.getTime();

  // If posted in the future, return empty or "Just posted"
  if (diffTime <= 0) return "Just posted";

  // Calculate different time units
  const diffMinutes = Math.floor(diffTime / (1000 * 60));
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  // Less than 1 minute
  if (diffMinutes < 1) return "Just now";

  // Less than 1 hour, show minutes
  if (diffMinutes < 60) {
    const label = diffMinutes === 1 ? "minute" : "minutes";
    return `${diffMinutes} ${label} ago`;
  }

  // Less than 24 hours, show hours
  if (diffHours < 24) {
    const label = diffHours === 1 ? "hour" : "hours";
    return `${diffHours} ${label} ago`;
  }

  // Less than 30 days, show days
  if (diffDays < 30) {
    const label = diffDays === 1 ? "day" : "days";
    return `${diffDays} ${label} ago`;
  }

  // Less than 365 days, show months
  if (diffDays < 365) {
    const diffMonths = Math.floor(diffDays / 30);
    const label = diffMonths === 1 ? "month" : "months";
    return `${diffMonths} ${label} ago`;
  }

  // Show years
  const diffYears = Math.floor(diffDays / 365);
  const label = diffYears === 1 ? "year" : "years";
  return `${diffYears} ${label} ago`;
};
