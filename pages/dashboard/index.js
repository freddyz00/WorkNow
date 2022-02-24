import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { getSession } from "next-auth/react";

import randomColorGenerator from "../../lib/utils";

import Loading from "../../components/Loading";
import DashboardHeader from "../../components/DashboardHeader";
import WorkspaceCard from "../../components/WorkspaceCard";

export default function Workspace({ _session }) {
  const { user } = _session;
  const [workspaces, setWorkspaces] = useState([
    {
      id: "jksoqueitjklJWijf",
      title: "My Workspace 1",
      theme: randomColorGenerator.generate(),
    },
    {
      id: "rwerdsafdeqr",
      title: "My Workspace 2",
      theme: randomColorGenerator.generate(),
    },
    {
      id: "sfdsafewrwer",
      title: "My Workspace 3",
      theme: randomColorGenerator.generate(),
    },
    {
      id: "sdfasfas",
      title: "My Workspace 4",
      theme: randomColorGenerator.generate(),
    },
    {
      id: "qwerwqersfa",
      title: "My Workspace 5",
      theme: randomColorGenerator.generate(),
    },
    {
      id: "sdf",
      title: "My Workspace 6",
      theme: randomColorGenerator.generate(),
    },
    {
      id: "asdfadqe",
      title: "My Workspace 7",
      theme: randomColorGenerator.generate(),
    },
  ]);

  const router = useRouter();

  useEffect(() => {
    if (!_session) {
      router.push("/login");
    }
  }, []);

  if (!_session) return <Loading />;

  return (
    <div className="flex flex-col h-screen">
      <Head>
        <title>WorkNow</title>
      </Head>

      <DashboardHeader user={user} />
      <div className="grid grid-cols-4">
        {workspaces.map(({ id, title, theme }) => (
          <WorkspaceCard id={id} key={id} title={title} theme={theme} />
        ))}
        <WorkspaceCard
          title="Create a new workspace"
          theme="rgb(225 225 225)"
          newWorkspace
        />
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
