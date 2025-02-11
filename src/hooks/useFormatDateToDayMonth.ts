import { useSettings } from "../context/SettingsContext";

const useFormatDateToDayMonth = (dateString: string): string => {
  const { currentSettings } = useSettings();
  const [datePart] = dateString.split(" "); // Extract the date part (YYYY-MM-DD)
  const [, month, day] = datePart.split("-"); // Split into year, month, and day
  if (currentSettings.dateFormat === "DD/MM") {
    return `${day}/${month}`; // Format as "DD/MM"
  } else {
    return `${month}/${day}`; // Format as "MM/DD"
  }
};

export default useFormatDateToDayMonth;
