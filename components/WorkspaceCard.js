import cn from "classnames";
import { useRouter } from "next/router";

export default function WorkspaceCard({
  id,
  title,
  theme,
  newWorkspace,
  showModal,
  setLoading,
}) {
  const router = useRouter();

  const hoverColor = `${theme.slice(0, -1)}, 0.2)`;

  const handlePress = () => {
    if (!newWorkspace) {
      setLoading(true);
      router.push(`/dashboard/${id}`);
    } else {
      // show modal to create new workspace
      showModal();
    }
  };
  return (
    <div
      onClick={handlePress}
      className={cn(
        "card flex shrink-0 justify-center items-center h-40 m-5 px-5 rounded-lg shadow-md cursor-pointer",
        {
          "bg-slate-50 hover:bg-slate-200": newWorkspace,
          "bg-white": !newWorkspace,
        }
      )}
    >
      <p
        className={cn("text-2xl font-medium p-5", {
          "border-l-4 border-solid line": !newWorkspace,
          "text-gray-500": newWorkspace,
        })}
      >
        {title}
      </p>

      <style jsx>{`
        .line {
          border-color: ${theme};
        }

        .card:hover {
          background-color: ${hoverColor};
        }
      `}</style>
    </div>
  );
}
