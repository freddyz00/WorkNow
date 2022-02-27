import cn from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedTab } from "../features/selectedTab/selectedTabSlice";

import { BsKanban, BsFillChatLeftDotsFill } from "react-icons/bs";
import { useRouter } from "next/router";

const SideMenuItem = ({ title, selected, icon }) => {
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => dispatch(setSelectedTab(title))}
      className={cn(
        "flex items-center ml-3 mb-3 py-3 pl-5 rounded-l-full cursor-pointer",
        {
          "bg-white": selected,
          "hover:bg-slate-200": !selected,
        }
      )}
    >
      {icon}
      <p className="text-lg ml-3">{title}</p>
    </div>
  );
};

export default function SideMenu() {
  const selectedTab = useSelector((state) => state.selectedTab);
  const workspaces = useSelector((state) => state.workspaces);
  const router = useRouter();
  const { workspace: workspaceId } = router.query;

  const handleChange = (e) => {
    router.push(`/dashboard/${e.target.value}`);
  };

  return (
    <div className="h-screen bg-slate-50">
      <select
        onChange={handleChange}
        className="text-2xl font-semibold mx-3 mt-5 p-2 mb-3 cursor-pointer bg-slate-50 hover:bg-slate-200"
      >
        {workspaces.map((workspace) => (
          <option value={workspace.id} selected={workspace.id === workspaceId}>
            {workspace.title}
          </option>
        ))}
      </select>

      <SideMenuItem
        title="Board"
        selected={selectedTab === "Board"}
        icon={<BsKanban className="text-xl" />}
      />
      <SideMenuItem
        title="Chat"
        selected={selectedTab === "Chat"}
        icon={<BsFillChatLeftDotsFill className="text-xl" />}
      />
    </div>
  );
}
