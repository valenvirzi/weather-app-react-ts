import useFormatDateToDayMonth from "../hooks/useFormatDateToDayMonth";

interface DayHourItemProps {
  dateText: string;
}

const DayHourItem: React.FC<DayHourItemProps> = ({ dateText }) => {
  const formattedDate = useFormatDateToDayMonth(dateText);

  return (
    <div className="flex max-w-8 flex-col items-center gap-1">
      <span className="text-xs">{formattedDate}</span>
      <span className="text-sm">{dateText.slice(11, 16)}</span>
    </div>
  );
};

export default DayHourItem;
