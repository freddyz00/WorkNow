export default function Card({ item }) {
  return (
    <div className="bg-white mb-3 p-2 w-full rounded-md cursor-pointer hover:bg-slate-200 transition ease-out duration-300">
      {item}
    </div>
  );
}
