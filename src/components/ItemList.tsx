import React from "react";

interface ItemListProps {
  gapSize: number;
}

// TODO: ItemList works as intended, but now it needs to render the proper info depending if it is on top of the chart or below, so that it renders the time (either day or hour), the date, the img (depending on the weather), the temperature, and the precipitation chance.
// For that it should take the forecastData as props just like the chart does and then MAYBE combine both the chart and the ItemList to pass them both that info.

const ItemList: React.FC<ItemListProps> = ({ gapSize }) => {
  const items = [
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 7",
  ];

  return (
    <div
      className="flex justify-between px-6"
      style={{ width: `${(items.length - 1) * gapSize + 100}px` }} // Adjust the width dynamically
    >
      {items.map((item, index) => (
        <div
          key={index}
          className="w-12 rounded bg-gray-200 p-3 text-center text-xs"
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default ItemList;
