import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import NewList from "../../components/NewList";
import List from "../../components/List";
import Button from "../../components/Button";

import { signOut, getSession } from "next-auth/react";

import randomColorGenerator from "../../utils";
import Loading from "../../components/Loading";

let count = 4;

export default function Dashboard({ _session }) {
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
  const router = useRouter();

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

  const updateListTitle = (id, title) => {
    const listToUpdate = dummyData.filter((list) => list.id === id)[0];
    const otherlists = dummyData.filter((list) => list.id !== id);
    setDummyData(
      [...otherlists, { ...listToUpdate, title: title }].sort(
        (list1, list2) => list1.id > list2.id
      )
    );
  };

  useEffect(() => {
    console.log(dummyData);
  }, [dummyData]);

  useEffect(() => {
    if (!_session) {
      router.push("/login");
    }
  }, []);

  if (!_session) return <Loading />;

  return (
    <div className="h-screen overflow-x-scroll">
      <Head>
        <title>WorkNow</title>
      </Head>
      <div className="inline-flex">
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
        <Button title="Logout" type="primary" onPress={() => signOut()} />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: { _session: session },
  };
}
