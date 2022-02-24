import List from "./List";
import NewList from "./NewList";
import Button from "../components/Button";
import { signOut } from "next-auth/react";

export default function Board({
  dummyData,
  addItem,
  updateListTitle,
  addNewList,
}) {
  return (
    <div className="flex flex-1 overflow-x-scroll px-5">
      {dummyData.map(({ id, title, theme, items }) => (
        <List
          id={id}
          key={id}
          title={title}
          listItems={items}
          theme={theme}
          addItem={addItem}
          updateListTitle={updateListTitle}
        />
      ))}
      <NewList addNewList={addNewList} />
      <Button
        title="Sign Out"
        onPress={() => signOut({ callbackUrl: "/dashboard" })}
      />
    </div>
  );
}
