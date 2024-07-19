import './App.css';
import { Outlet } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <main>
        <Toaster />
          <Outlet />
      </main>
    </>
  );
}

export default App;
