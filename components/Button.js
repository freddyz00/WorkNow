import cn from "classnames";
import Image from "next/image";

export default function Button({ title, large, type, icon, onPress }) {
  return (
    <button
      onClick={onPress}
      className={cn(
        "font-medium",
        "rounded-full",
        "font-semibold",
        "px-5",
        "py-2",
        {
          "text-xl px-8 py-3": large,
        },
        {
          "bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white border border-indigo-600 border-solid":
            type === "primary",
        },
        {
          "bg-white hover:bg-slate-100 active:bg-slate-200 border border-slate-200 border-solid":
            type === "secondary",
        }
      )}
    >
      <div className="flex justify-center items-center">
        {icon && (
          <div className="flex justify-center items-center mr-1.5">
            <Image src={icon} width="20" height="20" />
          </div>
        )}
        {title}
      </div>
    </button>
  );
}
