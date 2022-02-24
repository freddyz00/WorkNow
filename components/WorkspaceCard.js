import { useRouter } from "next/router";

export default function WorkspaceCard({ id, title, theme, newWorkspace }) {
  const router = useRouter();

  const handlePress = () => {
    if (!newWorkspace) {
      router.push(`/dashboard/${id}`);
    } else {
      // create workspace
    }
  };
  return (
    <div
      onClick={handlePress}
      className={
        "card flex shrink-0 justify-center items-center h-40 m-5 rounded-lg shadow-md cursor-pointer"
      }
    >
      <p className="text-2xl font-semibold">{title}</p>

      <style jsx>{`
        .card {
          background-color: ${theme};
        }
      `}</style>
    </div>
  );
}
