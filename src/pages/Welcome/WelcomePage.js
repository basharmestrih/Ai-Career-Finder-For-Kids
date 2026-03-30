const WelcomePage = ({ onStart }) => (
  <div
    className="relative min-h-screen w-full bg-cover bg-center text-white"
    style={{ backgroundImage: "url('/back1.jpg')" }}
  >
    <div className="absolute inset-0 bg-black/75 sm:bg-black/60" />
    <div className="absolute inset-0 backdrop-blur-[0.5px]" />

    <header className="relative z-10 flex items-center justify-between px-6 py-4">
  

    </header>

    <main className="relative z-10 flex min-h-[calc(100vh-64px)] flex-col items-center justify-center px-3 py-5 sm:px-6 sm:py-8">
      <div className="flex min-h-[72vh] w-full max-w-4xl flex-col rounded-[24px] border border-white/20 bg-white/5 px-5 py-7 shadow-2xl shadow-black/50 backdrop-blur-md sm:min-h-0 sm:rounded-[32px] sm:p-8 lg:p-10">
        <div className="flex min-h-full flex-col">
          <div className="space-y-3 sm:space-y-6">
            <p className="mt-4 md:mt-0 mb-10 md:mt-0 text-3xl uppercase font-semibold tracking-[0.24em] text-indigo-200 sm:text-xl sm:tracking-[0.3em]">Career Finder</p>
            <h1 className="max-w-2xl pt-2 text-3xl font-bold leading-[1.15] sm:text-4xl md:text-5xl">Shape your next career chapter with AI</h1>
          </div>

          <div className="mt-8 sm:mt-10">
            <p className="max-w-2xl text-base leading-7 text-indigo-100/95 sm:text-lg">
            Unsure where to start? Let AI guide you to your next role, Turn your hobbies and skills into a meaningful career
            </p>
          </div>

          <div className="mt-5 sm:mt-6">
            <p className="md:mt-0 mt-4 max-w-xl text-sm leading-6 text-indigo-100/80 sm:text-base">
              Explore career ideas shaped around your strengths, interests, and learning path.
            </p>
          </div>

          <div className="mt-auto pt-8 sm:pt-10">
            <button
              onClick={onStart}
              className="md:mt-24 mt-16 w-full rounded-lg border border-white/50 bg-white/10 px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white/15 sm:w-auto sm:px-7 sm:tracking-[0.3em]"
            >
              Find your career
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
);

export default WelcomePage;
