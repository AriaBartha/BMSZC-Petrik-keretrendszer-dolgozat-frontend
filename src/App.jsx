import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import './App.css';
import KeyboardCard from './components/KeyboardCard';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {
  const backend_url = "http://localhost:8000/api/keyboard";
  const [keyboards, setKeyboards] = useState([]);

  useEffect(() => {
      readKeyboards();
  }, []);

  const readKeyboards = async () => {
    const response = await fetch(backend_url);
    const data = await response.json();
    setKeyboards(data);
  }

  return ( <main className='container'>
      <div className='row row-cols-lg-2 row-cols-1'>
        {keyboards.map(keyboard => <KeyboardCard keyboard={keyboard} key={keyboard.id}/>)}
      </div> 
    </main> );
}

export default App
