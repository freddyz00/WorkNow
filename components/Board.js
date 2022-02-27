import List from "./List";
import NewList from "./NewList";
import Button from "../components/Button";
import { signOut } from "next-auth/react";

export default function Board({ data, updateListTitle }) {
  return (
    <div className="flex flex-1 max-h-full overflow-x-scroll px-5">
      {data.map(({ id, title, theme, items }) => (
        <List
          id={id}
          key={id}
          title={title}
          listItems={items}
          theme={theme}
          updateListTitle={updateListTitle}
        />
      ))}
      <NewList />
      <Button
        title="Sign Out"
        onPress={() => signOut({ callbackUrl: "/dashboard" })}
      />
    </div>
  );
}
