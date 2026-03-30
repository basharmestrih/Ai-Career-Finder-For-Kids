const Chip = ({ label, selected, onClick }) => (
  <button
    onClick={onClick}
    type="button"
    className={`max-w-full rounded-full border px-4 py-2 text-left text-[0.8rem] font-semibold leading-5 transition sm:px-5 sm:text-[0.85rem] ${
      selected
        ? "border-indigo-600 bg-indigo-600 text-white shadow-lg"
        : "border-slate-200 bg-white text-slate-600 hover:border-indigo-300"
    }`}
  >
    {label}
    {selected && <span className="ml-2 text-xs leading-none">✓</span>}
  </button>
);

export default Chip;
