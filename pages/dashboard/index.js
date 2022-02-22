import List from "../../components/List";
import { useState } from "react";
import NewList from "../../components/NewList";

import randomColorGenerator from "../../utils";

let count = 4;

export default function Dashboard() {
  const [dummyData, setDummyData] = useState([
    {
      id: 1,
      title: "To-Do",
      theme: "rgb(147 197 253)",
      items: ["build something", "do something"],
    },
    { id: 2, title: "Doing", theme: "rgb(249 168 212)", items: [] },
    { id: 3, title: "Done", theme: "rgb(134 239 172)", items: [] },
  ]);

  const addItem = (title, value) => {
    if (value) {
      const listToUpdate = dummyData.filter((list) => list.title === title)[0];
      const otherlists = dummyData.filter((list) => list.title !== title);
      setDummyData(
        [
          ...otherlists,
          { ...listToUpdate, items: [...listToUpdate.items, value] },
        ].sort((list1, list2) => list1.id > list2.id)
      );
    }
  };

  const addNewList = ({ title, theme }) => {
    setDummyData([
      ...dummyData,
      { id: count++, title, theme: randomColorGenerator.generate(), items: [] },
    ]);
  };

  return (
    <div className="h-screen overflow-x-scroll">
      <div className="inline-flex">
        {dummyData.map(({ title, theme, items }, index) => (
          <List
            key={index}
            title={title}
            listItems={items}
            theme={theme}
            addItem={addItem}
          />
        ))}
        <NewList addNewList={addNewList} />
      </div>
    </div>
  );
}
