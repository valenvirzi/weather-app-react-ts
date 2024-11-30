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
    "Item 8",
    "Item 9",
    "Item 10",
    "Item 11",
    "Item 12",
    "Item 13",
    "Item 14",
    "Item 15",
    "Item 16",
    "Item 17",
    "Item 18",
    "Item 19",
    "Item 20",
    "Item 21",
    "Item 22",
    "Item 23",
    "Item 24",
    "Item 25",
    "Item 26",
    "Item 27",
    "Item 28",
    "Item 29",
    "Item 30",
    "Item 31",
    "Item 32",
    "Item 33",
    "Item 34",
    "Item 35",
    "Item 36",
    "Item 37",
    "Item 38",
    "Item 39",
    "Item 40",
  ];

  return (
    <ul
      className="flex justify-between px-6"
      style={{ width: `${(items.length - 1) * gapSize + 100}px` }} // Adjust the width dynamically
    >
      {items.map((item) => (
        <li key={item} className="flex flex-col items-center gap-1">
          <span>Lunes</span>
          <span className="text-xs">25/11</span>
          <img className="w-6" src="./img/rain.svg" alt="rain" />
          <span>3°</span>
        </li>
      ))}
    </ul>
  );
};

export default ItemList;
