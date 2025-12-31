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
  const diffHours = Math.floor(
    (now.getTime() - posted.getTime()) / (1000 * 60 * 60)
  );

  if (diffHours < 24) {
    const label = diffHours === 1 ? "hour" : "hours";
    return `${diffHours} ${label} ago`;
  }

  const diffDays = Math.floor(diffHours / 24);
  const label = diffDays === 1 ? "day" : "days";
  return `${diffDays} ${label} ago`;
};
