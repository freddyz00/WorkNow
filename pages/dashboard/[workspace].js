import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useLayoutEffect } from "react";

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
import {
  addItem,
  addList,
  deleteItem,
  initializeLists,
  updateItem,
  updateListItemsOrder,
  updateListsOrder,
  updateListTitle,
} from "../../features/lists/listsSlice";
import { initializeWorkspaces } from "../../features/workspaces/workspacesSlice";
import { initializeMessages } from "../../features/messages/messagesSlice";
import { addMessage } from "../../features/messages/messagesSlice";

import Pusher from "pusher-js";

export default function Workspace({
  _session,
  listsProps,
  messagesProps,
  membersProps,
  workspaces,
}) {
  const { user } = _session;
  const listsStore = useSelector((state) => state.lists);
  const messagesStore = useSelector((state) => state.messages);
  const selectedTab = useSelector((state) => state.selectedTab);
  const dispatch = useDispatch();
  const router = useRouter();

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

  useEffect(() => {
    if (_session) {
      const pusher = new Pusher(process.env.NEXT_PUBLIC_CHANNELS_KEY, {
        authEndpoint: `${process.env.NEXT_PUBLIC_BASE_URL}/api/pusher/auth`,
        cluster: process.env.NEXT_PUBLIC_CHANNELS_CLUSTER,
      });

      const workspacesChannel = pusher.subscribe("private-workspaces");

      workspacesChannel.bind("new-message", (data) => {
        if (data.sender.email !== user.email) {
          dispatch(addMessage(data));
        }
      });

      workspacesChannel.bind("new-list", (data) => {
        if (data.updatedBy.email !== user.email) {
          dispatch(addList(data.list));
        }
      });

      workspacesChannel.bind("update-list-title", (data) => {
        if (data.updatedBy.email !== user.email) {
          dispatch(updateListTitle(data.list));
        }
      });

      workspacesChannel.bind("new-item", (data) => {
        if (data.updatedBy.email !== user.email) {
          dispatch(addItem(data.item));
        }
      });

      workspacesChannel.bind("update-item", (data) => {
        if (data.updatedBy.email !== user.email) {
          dispatch(updateItem(data.item));
        }
      });

      workspacesChannel.bind("delete-item", (data) => {
        if (data.updatedBy.email !== user.email) {
          dispatch(deleteItem(data.item));
        }
      });

      workspacesChannel.bind("update-list-items-order", (data) => {
        if (data.updatedBy.email !== user.email) {
          dispatch(updateListItemsOrder(data.order));
        }
      });

      workspacesChannel.bind("update-lists-order", (data) => {
        if (data.updatedBy.email !== user.email) {
          dispatch(updateListsOrder(data.order));
        }
      });

      return () => {
        workspacesChannel.unbind_all();
        workspacesChannel.unsubscribe();
        pusher.disconnect();
      };
    }
  }, []);

  if (!_session) return <Loading />;

  return (
    <div className="flex">
      <Head>
        <title>WorkNow</title>
      </Head>

      <div className="w-20 md:w-1/6">
        <SideMenu />
      </div>

      <div className="flex flex-col flex-1 h-screen max-h-screen overflow-hidden relative">
        <WorkspaceHeader user={user} />
        {selectedTab === "Board" && <Board />}
        {selectedTab === "Team" && <Team members={membersProps} />}
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
    const { lists, messages, members } = await db
      .collection("workspaces")
      .findOne({ _id: ObjectId(workspaceId) });
    return {
      props: {
        _session: session,
        listsProps: lists || [],
        messagesProps: messages || [],
        membersProps: members || [],
        workspaces: user.workspaces,
      },
    };
  }
  return { props: { _session: session, listsProps: [], messagesProps: [] } };
}
