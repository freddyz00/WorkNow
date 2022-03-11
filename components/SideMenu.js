import cn from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedTab } from "../features/selectedTab/selectedTabSlice";

import { BsKanban, BsFillChatLeftDotsFill } from "react-icons/bs";
import { RiTeamFill } from "react-icons/ri";
import { useRouter } from "next/router";
import Select from "react-select";

const SideMenuItem = ({ title, selected, icon }) => {
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => dispatch(setSelectedTab(title))}
      className={cn(
        "flex items-center mx-3 mb-1.5 p-2 px-3 rounded-lg cursor-pointer transition",
        {
          "bg-rose-400": selected,
          "hover:bg-slate-200": !selected,
        }
      )}
    >
      {icon}
      <p
        className={cn("ml-3 transition", {
          "text-gray-500": !selected,
          "text-white": selected,
        })}
      >
        {title}
      </p>
    </div>
  );
};

export default function SideMenu() {
  const selectedTab = useSelector((state) => state.selectedTab);
  const workspaces = useSelector((state) => state.workspaces);
  const router = useRouter();
  const { workspace: workspaceId } = router.query;

  const handleChange = (e) => {
    router.push(`/dashboard/${e.value}`);
  };

  const selectOptions = workspaces.map((workspace) => ({
    value: workspace.id,
    label: workspace.title,
  }));

  return (
    <div className="flex flex-col h-screen border-solid border-[#EEEEEE] border-r-2">
      <p className="font-righteous text-2xl mt-3 self-center">
        <span className="text-yellow-500">Work</span>
        <span className="text-pink-500">Now</span>
      </p>
      <Select
        options={selectOptions}
        onChange={handleChange}
        className="m-3 font-medium"
        value={
          selectOptions.filter((option) => option.value === workspaceId)[0]
        }
      />
      {/* 
      <select
        onChange={handleChange}
        className="text-lg font-medium mx-3 my-3 p-2  rounded-md cursor-pointer bg-slate-100 hover:bg-slate-200"
      >
        {workspaces.map((workspace) => (
          <option value={workspace.id} selected={workspace.id === workspaceId}>
            {workspace.title}
          </option>
        ))}
      </select> */}

      <SideMenuItem
        title="Board"
        selected={selectedTab === "Board"}
        icon={
          <BsKanban
            className={cn({
              "text-gray-500": selectedTab !== "Board",
              "text-white": selectedTab === "Board",
            })}
          />
        }
      />
      <SideMenuItem
        title="Team"
        selected={selectedTab === "Team"}
        icon={
          <RiTeamFill
            className={cn({
              "text-gray-500": selectedTab !== "Team",
              "text-white": selectedTab === "Team",
            })}
          />
        }
      />
      <SideMenuItem
        title="Chat"
        selected={selectedTab === "Chat"}
        icon={
          <BsFillChatLeftDotsFill
            className={cn({
              "text-gray-500": selectedTab !== "Chat",
              "text-white": selectedTab === "Chat",
            })}
          />
        }
      />
    </div>
  );
}
