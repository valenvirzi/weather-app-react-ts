const useFormatDate = (dt: number): string => {
  // Check if dt is in milliseconds or seconds
  const date = new Date(dt < 10000000000 ? dt * 1000 : dt);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default useFormatDate;
