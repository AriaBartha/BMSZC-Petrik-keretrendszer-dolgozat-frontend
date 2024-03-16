import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import './App.css';
import KeyboardCard from './components/KeyboardCard';
import { useState } from 'react';
import { useEffect } from 'react';
import KeyboardForm from './components/KeyboardForm';

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

  const createKeyboard = async (keyboard) => {
    const response = await fetch(backend_url, {
      method: "POST",
      body: JSON.stringify(keyboard),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    });

    const data = await response.json();
    if (response.ok) {
      readKeyboards();
      return true;
    } else {
      alert(data.message);
      return false;
    }
  }

  const deleteKeyboard = async (id) => {
      const response = await fetch(`${backend_url}/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json"
        }
      });
      if (response.ok){
        readKeyboards();
      } else {
        const data = await response.json();
        alert(data.message);
      }
  }

  const loadUpdateForm = async (id) => {
      return id;
  }

  return ( <main className='container'>
      <section>
          <h2>Add new keyboard</h2>
          <KeyboardForm onSubmit={createKeyboard}/>
      </section>
      <section>
          <h2>List of keyboards</h2>
          <div className='row row-cols-lg-2 row-cols-1 gy-3'>
            {keyboards.map(keyboard => <KeyboardCard keyboard={keyboard} key={keyboard.id} updateClick={loadUpdateForm} deleteClick={deleteKeyboard}/>)}
          </div> 
      </section>
      
    </main> );
}

export default App
