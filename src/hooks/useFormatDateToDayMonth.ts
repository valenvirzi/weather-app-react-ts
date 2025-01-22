const useFormatDateToDayMonth = (dateString: string): string => {
  const [datePart] = dateString.split(" "); // Extract the date part (YYYY-MM-DD)
  const [, month, day] = datePart.split("-"); // Split into year, month, and day
  return `${day}/${month}`; // Format as "DD/MM"
};

export default useFormatDateToDayMonth;
