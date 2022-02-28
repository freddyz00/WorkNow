import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { getSession } from "next-auth/react";

import Loading from "../../components/Loading";
import WorkspaceHeader from "../../components/WorkspaceHeader";
import SideMenu from "../../components/SideMenu";
import Board from "../../components/Board";
import Chat from "../../components/Chat";

import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

import { useSelector, useDispatch } from "react-redux";
import { initializeLists } from "../../features/lists/listsSlice";
import { initializeWorkspaces } from "../../features/workspaces/workspacesSlice";

let count = 4;

export default function Workspace({ _session, lists, workspaces }) {
  const { user } = _session;
  const [showSideMenu, setShowSideMenu] = useState(false);
  const data = useSelector((state) => state.lists);
  const selectedTab = useSelector((state) => state.selectedTab);
  const workspacesFromStore = useSelector((state) => state.workspaces);
  const dispatch = useDispatch();
  const router = useRouter();

  const closeSideMenu = () => setShowSideMenu(false);

  useEffect(() => {
    dispatch(initializeLists(lists));
    dispatch(initializeWorkspaces(workspaces));
  }, [lists, workspaces]);

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
          <SideMenu closeSideMenu={closeSideMenu} />
        </div>
      )}

      <div className="flex flex-col flex-1 h-screen max-h-screen overflow-hidden relative">
        <WorkspaceHeader
          user={user}
          toggleSideMenu={() => setShowSideMenu(!showSideMenu)}
        />
        {selectedTab === "Board" && (
          <Board data={data.length > 0 ? data : lists} />
        )}
        {selectedTab === "Chat" && <Chat />}
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
      props: { _session: session, lists, workspaces: user.workspaces },
    };
  }
  return { props: { _session: session, lists: [] } };
}
