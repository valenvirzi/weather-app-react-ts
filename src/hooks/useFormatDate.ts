const useFormatDate = (dt: number): string => {
  const date = new Date(dt * 1000); // Multiply by 1000 to convert seconds to milliseconds
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
