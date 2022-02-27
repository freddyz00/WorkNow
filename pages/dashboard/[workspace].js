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

import { useSelector, useDispatch } from "react-redux";
import { initializeLists } from "../../features/lists/listsSlice";

let count = 4;

export default function Workspace({ _session, lists }) {
  const { user } = _session;
  const [showSideMenu, setShowSideMenu] = useState(false);
  const data = useSelector((state) => state.lists);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(initializeLists(lists));
  }, []);

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

      <div className="flex flex-col flex-1 h-screen max-h-screen overflow-hidden">
        <WorkspaceHeader
          user={user}
          toggleSideMenu={() => setShowSideMenu(!showSideMenu)}
        />
        <Board data={data.length > 0 ? data : lists} />
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
