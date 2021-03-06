import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getSession } from "next-auth/react";
import { initializeWorkspaces } from "../../features/workspaces/workspacesSlice";

import { darkColorGenerator } from "../../lib/utils";

import Button from "../../components/Button";
import Loading from "../../components/Loading";
import DashboardHeader from "../../components/DashboardHeader";
import WorkspaceCard from "../../components/WorkspaceCard";

import { IoMdClose } from "react-icons/io";
import ReactModal from "react-modal";

import axios from "axios";
import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default function Dashboard({ _session, workspaces }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workspaceInput, setWorkspaceInput] = useState("New Workspace");
  const [workspaceColor, setWorkSpaceColor] = useState(
    darkColorGenerator.generate()
  );
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setWorkspaceInput("New Workspace");
    setWorkSpaceColor(darkColorGenerator.generate());
  };

  const createNewWorkspace = async (e) => {
    e.preventDefault();
    if (workspaceInput) {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/workspace`,
        {
          user: _session.user,
          title: workspaceInput,
          theme: workspaceColor,
        }
      );
      handleCloseModal();

      setLoading(true);
      router.push(`/dashboard/${res.data.id}`);
    }
  };

  useEffect(() => {
    if (!_session) {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    dispatch(initializeWorkspaces(workspaces));
  }, [workspaces]);

  if (!_session) return <Loading />;

  return (
    <div className="flex flex-col h-screen bg-neutral-100">
      <Head>
        <title>WorkNow</title>
      </Head>

      {loading && <Loading />}

      <DashboardHeader user={_session.user} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {workspaces.map(({ id, title, theme }) => (
          <WorkspaceCard
            id={id}
            key={id}
            title={title}
            theme={theme}
            setLoading={setLoading}
          />
        ))}
        <WorkspaceCard
          title="Create a workspace"
          theme="rgb(225 225 225)"
          newWorkspace
          showModal={() => setIsModalOpen(true)}
        />
      </div>

      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        shouldCloseOnOverlayClick={true}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            borderRadius: "10px",
            top: "10%",
            left: "30%",
            right: "30%",
            bottom: "10%",
          },
        }}
      >
        <div className="flex h-full justify-between flex-col p-3">
          {/* header */}
          <div className="flex justify-between items-center">
            <p className="text-3xl font-semibold">Create New Workspace</p>
            <div
              onClick={handleCloseModal}
              className="p-1 hover:bg-slate-200 cursor-pointer rounded-md"
            >
              <IoMdClose className="text-2xl" />
            </div>
          </div>

          {/* workspace image */}
          <div className="workspace-color flex justify-center items-center self-center w-28 h-28 rounded-xl">
            {workspaceInput && (
              <p className="text-5xl text-white font-bold">
                {workspaceInput[0].toUpperCase()}
              </p>
            )}
          </div>

          {/* form input */}
          <form className="flex flex-col" onSubmit={createNewWorkspace}>
            <label htmlFor="workspaceInput">Workspace Name</label>
            <input
              id="workspaceInput"
              type="text"
              autoFocus
              autoComplete="off"
              value={workspaceInput}
              onChange={(e) => setWorkspaceInput(e.target.value)}
              className="py-2 px-3 mt-2 rounded-md border-solid border-2 border-slate-300"
            />
          </form>

          {/* footer */}
          <div className="flex justify-end">
            <Button
              title="Create Workspace"
              type="primary"
              onPress={createNewWorkspace}
            />
          </div>
          <style jsx>{`
            .workspace-color {
              background-color: ${workspaceColor};
            }
          `}</style>
        </div>
      </ReactModal>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  try {
    const client = await clientPromise;
    const db = await client.db();

    let user = await db
      .collection("users")
      .findOne({ email: session.user.email });

    if (!user.workspaces) {
      await db.collection("users").updateOne(
        { email: user.email },
        {
          $push: {
            workspaces: {
              title: "Demo Workspace",
              theme: "rgb(232, 121, 249)",
              id: "6239d591bc2980c4c67e54e5",
            },
          },
        }
      );

      await db.collection("workspaces").updateOne(
        {
          _id: ObjectId("6239d591bc2980c4c67e54e5"),
        },
        {
          $push: {
            members: { name: user.name, email: user.email, image: user.image },
          },
        }
      );

      user = await db
        .collection("users")
        .findOne({ email: session.user.email });
    }

    const workspaces = user.workspaces || [];

    return {
      props: {
        _session: session,
        workspaces,
      },
    };
  } catch (error) {
    console.log(error);
    return { props: { _session: session } };
  }
}
