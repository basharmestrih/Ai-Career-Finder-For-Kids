const WelcomePage = ({ onStart }) => (
  <div
    className="relative min-h-screen w-full bg-cover bg-center text-white"
    style={{ backgroundImage: "url('/back1.jpg')" }}
  >
    <div className="absolute inset-0 bg-black/75 sm:bg-black/60" />
    <div className="absolute inset-0 backdrop-blur-[0.5px]" />

    <main className="relative z-10 flex min-h-screen items-center justify-center px-4 py-8 sm:px-6">
      <div className="w-full max-w-3xl rounded-2xl border border-white/20 bg-white/5 p-6 shadow-2xl backdrop-blur-md sm:rounded-3xl sm:p-10">
        
        <div className="flex flex-col gap-6 sm:gap-8">
          
          {/* Header */}
          <div className="space-y-3">
            <p className="text-sm uppercase font-semibold tracking-[0.3em] text-indigo-200 sm:text-base">
              Career Finder
            </p>

            <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              Shape your next career chapter with AI
            </h1>
          </div>

          {/* Description */}
          <p className="text-base leading-7 text-indigo-100/95 sm:text-lg">
            Unsure where to start? Let AI guide you to your next role, Turn your hobbies and skills into a meaningful career
          </p>

          <p className="text-sm leading-6 text-indigo-100/80 sm:text-base">
            Explore career ideas shaped around your strengths, interests, and learning path.
          </p>

          <div className="pt-4 flex sm:justify-center">
            <button
              onClick={onStart}
              className="w-full sm:w-[320px] md:w-[380px] rounded-lg border border-white/50 bg-white/10 px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white/15"
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