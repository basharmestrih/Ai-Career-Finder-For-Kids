import React from "react";

const cardThemes = [
  {
    border: "border-slate-500",
    badge: "bg-amber-50 text-amber-700",
    index: "bg-gray-200 text-black",
     button: "bg-gray-200 hover:bg-gray-600 text-black",
  },
  {
    border: "border-fuchsia-300",
    badge: "bg-fuchsia-50 text-fuchsia-700",
    index: "bg-gray-200 text-black",
    button: "bg-gray-200 hover:bg-gray-600 text-black",
  },
  {
    border: "border-sky-300",
    badge: "bg-sky-50 text-sky-700",
   index: "bg-gray-200 text-black",
   button: "bg-gray-200 hover:bg-gray-600 text-black",
  },
  {
    border: "border-emerald-300",
    badge: "bg-emerald-50 text-emerald-700",
   index: "bg-gray-200 text-black",
    button: "bg-gray-200 hover:bg-gray-600 text-black",
  },
];

const ResultsCard = ({ career, index }) => {
  const theme = cardThemes[index % cardThemes.length];

  return (
    <article
      className={`group overflow-hidden rounded-[24px] border-2 ${theme.border} bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-200/80 sm:rounded-[28px] sm:p-6`}
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-slate-400">
            Career Match {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-3 text-xl font-bold leading-tight text-slate-900 sm:text-2xl">{career.career}</h3>
        </div>
      </div>

      <div className="space-y-5">
        <section className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Why It Fits You</p>
          <p className="mt-2 text-sm leading-6 text-slate-700">{career.whyItFits}</p>
        </section>

        <div className="border-t-2 border-slate-200" />

        <section>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Roadmap</p>
          <ul className="mt-3 space-y-2">
            {(career.roadmap || []).map((step, stepIndex) => (
              <li key={`${career.career}-roadmap-${stepIndex}`} className="flex items-start gap-3 text-sm text-slate-700">
                <span
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${theme.index}`}
                >
                  {stepIndex + 1}
                </span>
                <span className="leading-6">{step}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="border-t-2 border-slate-200" />

        <section>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">YouTube Courses</p>
          <div className="mt-3 space-y-3">
            {(career.youtubeCourses  || []).map((course, courseIndex) => (
              <div
                key={`${career.career}-course-${courseIndex}`}
                className="flex flex-col items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <p className="min-w-0 flex-1 text-sm font-medium leading-6 text-slate-700">{course.name}</p>

              </div>
            ))}
          </div>
        </section>

        <div className="border-t-2 border-slate-200" />

        <section className="border rounded-lg border-slate-200 bg-transparent p-4 mb-0">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Advice</p>
          <p className="mt-2 text-sm leading-6 text-slate-700">{career.advice}</p>
        </section>
      </div>
    </article>
  );
};

export default ResultsCard;
