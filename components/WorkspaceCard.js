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
      className={
        "card flex shrink-0 justify-center items-center h-40 m-5 rounded-lg shadow-md cursor-pointer"
      }
    >
      <p
        className={cn("text-2xl font-semibold text-center px-5", {
          "text-white": !newWorkspace,
        })}
      >
        {title}
      </p>

      <style jsx>{`
        .card {
          background-color: ${theme};
        }
      `}</style>
    </div>
  );
}
