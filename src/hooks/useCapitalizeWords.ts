const useCapitalizeWords = (str: string): string => {
  return str
    .split(" ") // Split string by spaces
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter
    .join(" "); // Join the words back together
};
export default useCapitalizeWords;
