export default function Button({ title, large }) {
  return (
    <button
      className={`bg-indigo-600 text-white font-medium rounded-full hover:bg-indigo-700 ${
        large ? "text-xl px-8 py-3" : "px-5 py-1.5"
      }`}
    >
      {title}
    </button>
  );
}
