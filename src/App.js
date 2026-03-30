import { useState } from 'react';
import WelcomePage from './pages/Welcome/WelcomePage';
import HomePage from './pages/Home/HomePage';

function App() {
  const [page, setPage] = useState('welcome');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased">


      <main className="mt-0">
        {page === 'welcome' ? (
          <WelcomePage onStart={() => setPage('home')} />
        ) : (
          <HomePage onBackHome={() => setPage('welcome')} />
        )}
      </main>
    </div>
  );
}

export default App;
