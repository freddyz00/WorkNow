import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { getSession } from "next-auth/react";

import Loading from "../../components/Loading";
import WorkspaceHeader from "../../components/WorkspaceHeader";
import Board from "../../components/Board";
import SideMenu from "../../components/SideMenu";

import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

import axios from "axios";

let count = 4;

export default function Workspace({ _session, lists }) {
  const { user } = _session;
  const [dummyData, setDummyData] = useState(lists);
  console.log(dummyData)
  const [showSideMenu, setShowSideMenu] = useState(false);
  const router = useRouter();
  const { workspace: workspaceId } = router.query;

  const addItem = async (title, value) => {
    if (value) {
      const listToUpdate = dummyData.filter((list) => list.title === title)[0];
      const otherlists = dummyData.filter((list) => list.title !== title);
      setDummyData(
        [
          ...otherlists,
          { ...listToUpdate, items: [...listToUpdate.items, value] },
        ].sort((list1, list2) => list1.id > list2.id)
      );

      // const res = await axios.post(
      //   `${process.env.NEXT_PUBLIC_BASE_URL}/api/newitem`,
      //   { item: value, workspaceId, title }
      // );
    }
  };

  const addNewList = async ({ title, theme }) => {
    setDummyData([...dummyData, { id: 4, title, theme, items: [] }]);

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/newlist`,
      {
        id: 4,
        workspaceId,
        title,
        theme,
      }
    );
    count++;
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
    if (!_session) {
      router.push("/login");
    }
  }, []);

  if (!_session) return <Loading />;

  return (
    <div className="flex">
      <Head>
        <title>WorkNow</title>
      </Head>

      {showSideMenu && (
        <div>
          <SideMenu />
        </div>
      )}

      <div className="flex flex-col flex-1 h-screen overflow-hidden">
        <WorkspaceHeader
          user={user}
          toggleSideMenu={() => setShowSideMenu(!showSideMenu)}
        />
        <Board
          dummyData={dummyData}
          addItem={addItem}
          updateListTitle={updateListTitle}
          addNewList={addNewList}
        />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const client = await clientPromise;
  const db = await client.db();
  const workspaceId = context.query.workspace;
  const user = await db
    .collection("users")
    .findOne({ email: session.user.email });

  if (
    user.workspaces.filter((workspace) => workspace.id === workspaceId).length >
    0
  ) {
    const { lists } = await db
      .collection("workspaces")
      .findOne({ _id: ObjectId(workspaceId) });
    return {
      props: { _session: session, lists },
    };
  }
  return { props: { _session: session, lists: [] } };
}
