import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState, useLayoutEffect } from "react";

import { getSession } from "next-auth/react";

import Loading from "../../components/Loading";
import WorkspaceHeader from "../../components/WorkspaceHeader";
import SideMenu from "../../components/SideMenu";
import Board from "../../components/Board";
import Team from "../../components/Team";
import Chat from "../../components/Chat";

import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

import { useSelector, useDispatch } from "react-redux";
import { initializeLists } from "../../features/lists/listsSlice";
import { initializeWorkspaces } from "../../features/workspaces/workspacesSlice";
import { initializeMessages } from "../../features/messages/messagesSlice";

export default function Workspace({
  _session,
  listsProps,
  messagesProps,
  workspaces,
}) {
  const { user } = _session;
  const [showSideMenu, setShowSideMenu] = useState(false);
  const listsStore = useSelector((state) => state.lists);
  const messagesStore = useSelector((state) => state.messages);
  const selectedTab = useSelector((state) => state.selectedTab);
  const dispatch = useDispatch();
  const router = useRouter();

  const closeSideMenu = () => setShowSideMenu(false);

  useLayoutEffect(() => {
    dispatch(initializeLists(listsProps));
    dispatch(initializeMessages(messagesProps));
    dispatch(initializeWorkspaces(workspaces));
  }, [listsProps, workspaces, messagesProps]);

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
        {selectedTab === "Board" && <Board data={listsStore} />}
        {selectedTab === "Team" && <Team />}
        {selectedTab === "Chat" && (
          <Chat
            data={messagesStore.length > 0 ? messagesStore : messagesProps}
          />
        )}
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
    const { lists, messages } = await db
      .collection("workspaces")
      .findOne({ _id: ObjectId(workspaceId) });
    return {
      props: {
        _session: session,
        listsProps: lists || [],
        messagesProps: messages || [],
        workspaces: user.workspaces,
      },
    };
  }
  return { props: { _session: session, listsProps: [], messagesProps: [] } };
}
