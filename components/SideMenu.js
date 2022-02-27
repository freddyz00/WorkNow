import cn from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedTab } from "../features/selectedTab/selectedTabSlice";

const SideMenuItem = ({ title, selected, onPress }) => {
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => dispatch(setSelectedTab(title))}
      className={cn("ml-3 mb-3 py-3 pl-3 rounded-l-xl cursor-pointer", {
        "bg-white": selected,
        "hover:bg-slate-200": !selected,
      })}
    >
      <p className="text-lg">{title}</p>
    </div>
  );
};

export default function SideMenu() {
  const selectedTab = useSelector((state) => state.selectedTab);
  return (
    <div className="h-screen bg-slate-100">
      <p className="text-xl font-semibold p-5">Workspace</p>

      <select className="text-xl mb-2 px-5 py-3 cursor-pointer mx-3">
        <option>My Workspace</option>
        <option>My Workspace2</option>
        <option>My Workspace3</option>
      </select>
      <SideMenuItem title="Board" selected={selectedTab === "Board"} />
      <SideMenuItem title="Chat" selected={selectedTab === "Chat"} />
    </div>
  );
}
