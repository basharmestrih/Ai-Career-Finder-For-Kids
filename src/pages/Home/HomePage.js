import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StepSkills from "../../components/StepSkills";
import StepTopics from "../../components/StepTopics";
import StepAchievement from "../../components/StepAchievement";
import StepEducation from "../../components/StepEducation";
import ResultsCard from "../../components/ResultsCard";
import { clearCareerResult, findCareer } from "../../store/careerSlice";

const steps = [
  { id: 1, title: "Skills", desc: "Core Competencies" },
  { id: 2, title: "Interests", desc: "Passion Lights" },
  { id: 3, title: "Wins", desc: "High-impact Stories" },
  { id: 4, title: "Education", desc: "Academic Focus" },
];

const sidebarItems = [
  { label: "Hybrid Career Playbook", href: "#hybrid-playbook", icon: <IconBook /> },
  { label: "Design Research Briefs", href: "#story-briefs", icon: <IconTrend /> },
  { label: "Customer Success Strategy", href: "#cs-strategy", icon: <IconPlus /> },
  { label: "Data Storytelling", href: "#data-story", icon: <IconBook /> },
  { label: "Inclusive AI Teams", href: "#inclusive-guide", icon: <IconTrend /> },
  { label: "Rapid Career Experiments", href: "#rapid-experiments", icon: <IconPlus /> },
  { label: "Portfolio Sprint 2026", href: "#portfolio-sprint", icon: <IconBook /> },
];

function IconPlus() {
  return (
    <svg className="h-5 w-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
    </svg>
  );
}

function IconBook() {
  return (
    <svg className="h-5 w-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
      />
    </svg>
  );
}

function IconTrend() {
  return (
    <svg className="h-5 w-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  );
}



const HomePage = ({ onBackHome }) => {
  const [activeStep, setActiveStep] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const { loading, error, careers, view } = useSelector((state) => state.career);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [view, activeStep]);

  const renderStepContent = () => {
    switch (activeStep) {
      case 1:
        return <StepSkills />;
      case 2:
        return <StepTopics />;
      case 3:
        return <StepAchievement />;
      case 4:
        return <StepEducation />;
      default:
        return null;
    }
  };

  const handlePrimaryAction = () => {
    if (activeStep < steps.length) {
      setActiveStep((previous) => previous + 1);
      return;
    }

    dispatch(findCareer());
  };

  const handleStartOver = () => {
    dispatch(clearCareerResult());
    setActiveStep(1);
    setIsSidebarOpen(false);
  };

  const showResults = view === "results" && careers.length > 0;

  return (
    <div className="relative flex min-h-screen w-full bg-[#f7f8fc] font-sans text-slate-900 lg:h-screen lg:overflow-hidden">
      <div
        className={`fixed inset-0 z-30 bg-slate-950/40 transition-opacity duration-300 lg:hidden ${
          isSidebarOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 max-w-[86vw] flex-col border-r border-slate-200 bg-white px-4 py-6 shadow-2xl transition-transform duration-300 lg:static lg:h-full lg:w-64 lg:max-w-none lg:translate-x-0 lg:px-4 lg:py-8 lg:shadow-none ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-10 flex flex-col items-start gap-1 px-2">
          <span className="text-xl font-bold tracking-tight">Career Finder</span>
          <p className="text-[11px] font-semibold text-slate-400">Discover your path</p>
        </div>

        <nav className="space-y-1 overflow-y-auto pr-2">
          {sidebarItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsSidebarOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-indigo-600"
            >
              {item.icon}
              <span className="truncate">{item.label}</span>
            </a>
          ))}
        </nav>

        <div className="mt-auto space-y-3 px-2 pt-6">
          {showResults ? (
            <button
              onClick={handleStartOver}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 text-xs font-bold uppercase tracking-widest text-slate-700 transition hover:bg-slate-100 active:scale-95"
            >
              Start Over
            </button>
          ) : null}

          <button
            onClick={() => onBackHome?.()}
            className="w-full rounded-xl bg-indigo-600 py-3 text-xs font-bold uppercase tracking-widest text-white shadow-md transition-all hover:shadow-lg active:scale-95"
          >
            Back Home
          </button>
        </div>
      </aside>

      {showResults ? (
        <div className="flex-1 overflow-y-auto">
          <div className="min-h-screen 
    bg-[radial-gradient(circle_at_top_left,_rgba(180,170,255,0.3),_transparent_30%),_radial-gradient(circle_at_top_right,_rgba(200,190,255,0.2),_transparent_25%),_linear-gradient(180deg,_#f7f5ff_0%,_#ffffff_100%)] 
    px-4 py-4 sm:px-6 sm:py-6 md:px-10 md:py-8">
            <div className="mx-auto max-w-7xl">
              <div className="mb-4 flex items-center justify-between lg:hidden">
                <button
                  type="button"
                  onClick={() => setIsSidebarOpen(true)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-indigo-300 hover:text-indigo-600"
                  aria-label="Open menu"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7h16M4 12h16M4 17h16" />
                  </svg>
                </button>
                <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">
                  Career Matches
                </span>
              </div>

              <div className="mb-6 flex flex-col gap-5 rounded-[24px] border border-white/70 bg-white/80 p-4 shadow-xl shadow-slate-200/50 backdrop-blur sm:mb-8 sm:rounded-[32px] sm:p-6 lg:p-8">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  <div className="max-w-2xl">
                    <p className="text-sm font-bold uppercase tracking-[0.28em] text-indigo-500 sm:text-base sm:tracking-[0.35em]">Career Matches</p>
                    <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                      Four paths that fit your personality
                    </h1>
                    <p className="mt-4 text-sm font-semibold leading-6 text-gray-500 sm:mt-6 sm:text-base sm:leading-7">
                      These recommendations are generated from your picks and bases on trusted references/articles.
                    </p>
                  </div>

                  <div className="w-full rounded-[20px] border border-slate-200 bg-slate-50 px-4 py-4 sm:mt-2 sm:px-5 lg:w-[400px]">
                    <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-slate-400">Quick Summary</p>
                    <div className="mt-3 space-y-2">
                      {careers.slice(0, 4).map((career, index) => (
                        <p key={`${career.career}-summary-${index}`} className="text-sm font-medium text-slate-700">
                          {index+1}- {career.career}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                {error ? <p className="text-sm font-medium text-rose-600">{error}</p> : null}
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                {careers.map((career, index) => (
                  <ResultsCard key={`${career.career}-${index}`} career={career} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <section className="hidden w-52 flex-col border-r border-slate-100 bg-slate-50/50 px-6 py-0 md:flex">
            <div className="relative flex h-full flex-col space-y-20">
              <div className="absolute bottom-0 left-[19px] top-0 w-[2px] bg-slate-200" />

              {steps.map((step) => (
                <div key={step.id} className="relative z-10 flex items-center gap-4">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${
                      activeStep >= step.id
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                        : "border border-slate-300 bg-white text-slate-400"
                    }`}
                  >
                    {step.id}
                  </div>

                  <div className="flex min-w-0 flex-col">
                    <span className={`text-md truncate font-semibold ${activeStep >= step.id ? "text-indigo-600" : "text-slate-500"}`}>
                      {step.title}
                    </span>
                    <span className="truncate text-[10px] tracking-tight text-slate-400">{step.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <main className="relative flex min-h-screen flex-1 flex-col bg-white lg:h-full">
            <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 px-4 py-4 sm:px-6 md:px-8 md:py-6 xl:px-12 xl:py-10">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsSidebarOpen(true)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:border-indigo-300 hover:text-indigo-600 lg:hidden"
                  aria-label="Open menu"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7h16M4 12h16M4 17h16" />
                  </svg>
                </button>
                <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-600 sm:text-xs sm:tracking-widest">
                  Step {activeStep} of 4
                </span>
              </div>

              <span className="text-sm font-semibold text-slate-500 sm:text-base">
                Step {activeStep} of 4 - {steps[activeStep - 1].title}
              </span>
            </header>

            <div className="flex-1 overflow-y-auto">
              <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 md:px-8 md:py-8 xl:px-12 xl:py-10">
                <div className="mb-6 flex gap-3 overflow-x-auto pb-2 md:hidden">
                  {steps.map((step) => (
                    <button
                      key={`mobile-step-${step.id}`}
                      type="button"
                      onClick={() => setActiveStep(step.id)}
                      className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition ${
                        activeStep === step.id
                          ? "border-indigo-600 bg-indigo-600 text-white"
                          : "border-slate-200 bg-white text-slate-500"
                      }`}
                    >
                      {step.id}. {step.title}
                    </button>
                  ))}
                </div>
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">{renderStepContent()}</div>
                {error ? <p className="mt-6 text-sm font-medium text-rose-600">{error}</p> : null}
              </div>
            </div>

            <footer className="border-t border-slate-100 px-4 py-4 sm:px-6 md:px-8 md:py-6 xl:px-12 xl:py-8">
              <div className="mx-auto flex max-w-3xl flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={() => setActiveStep((previous) => Math.max(previous - 1, 1))}
                  className={`w-full rounded-xl border border-slate-200 bg-white px-8 py-3 text-xs font-bold text-slate-500 transition-all hover:bg-slate-50 active:scale-95 sm:w-auto ${
                    activeStep === 1 ? "hidden sm:invisible" : "block"
                  }`}
                >
                  {"< Previous"}
                </button>

                <button
                  type="button"
                  onClick={handlePrimaryAction}
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-10 py-3.5 text-xs font-bold text-white shadow-lg shadow-indigo-100 transition-all hover:-translate-y-0.5 hover:bg-indigo-700 active:scale-95 disabled:cursor-not-allowed disabled:bg-indigo-400 disabled:hover:translate-y-0 sm:w-auto"
                >
                  {loading && (
                    <svg
                      className="h-4 w-4 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      ></path>
                    </svg>
                  )}

                  {loading
                    ? "Finding your career..."
                    : activeStep === steps.length
                    ? "Find My Career"
                    : "Next Step"}
                </button>
              </div>
            </footer>
          </main>
        </>
      )}
    </div>
  );
};

export default HomePage;
