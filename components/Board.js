import List from "./List";
import NewList from "./NewList";
import Button from "./Button";

export default function Board({
  dummyData,
  addItem,
  updateListTitle,
  addNewList,
}) {
  return (
    <div className="flex flex-1 overflow-x-scroll">
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
      {/* <Button title="Logout" type="primary" onPress={() => signOut()} /> */}
    </div>
  );
}
