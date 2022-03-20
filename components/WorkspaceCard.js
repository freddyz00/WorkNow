import cn from "classnames";
import { useRouter } from "next/router";

export default function WorkspaceCard({
  id,
  title,
  theme,
  newWorkspace,
  showModal,
}) {
  const router = useRouter();

  const hoverColor = `${theme.slice(0, -1)}, 0.1)`;

  const handlePress = () => {
    if (!newWorkspace) {
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
          "bg-gray-200": newWorkspace,
          "bg-white": !newWorkspace,
        }
      )}
    >
      <p
        className={cn("text-2xl font-medium p-5", {
          "border-l-4 border-solid line": !newWorkspace,
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
    // <div
    //   onClick={handlePress}
    //   className={
    //     "card flex shrink-0 justify-center items-center h-40 m-5 rounded-lg shadow-md cursor-pointer"
    //   }
    // >
    //   <p
    //     className={cn("text-2xl font-semibold text-center px-5", {
    //       "text-white": !newWorkspace,
    //     })}
    //   >
    //     {title}
    //   </p>

    //   <style jsx>{`
    //     .card {
    //       background-color: ${theme};
    //     }
    //   `}</style>
    // </div>
  );
}
