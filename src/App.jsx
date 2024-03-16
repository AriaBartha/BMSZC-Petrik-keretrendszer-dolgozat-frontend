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
  const [updateId, setUpdateId] = useState(0);
  const [updateKeyboardData, setUpdateKeyboardData] = useState(null);

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
      setUpdateId(id);
  }

  const readOneKeyboard = async () => {
    const response = await fetch(`${backend_url}/${updateId}`, {
      headers: {
        Accept: "application/json"
      }
    });
    const data = await response.json();
    if (response.ok){
      setUpdateKeyboardData(data);
    }else{
      setUpdateKeyboardData(null);
      alert(data.message);
    }
  }

  const updateKeyboard = async (keyboard) => {
    const response = await fetch(`${backend_url}/${updateId}`, {
      method: "PATCH",
      body: JSON.stringify(keyboard),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    if (response.ok){
      readKeyboards();
      setUpdateId(0);
      return true;
    }else{
      alert(data.message);
      return false;
    }
  }

  useEffect(() => {
      if (updateId == 0){
        setUpdateKeyboardData(null);
      }
      else {
        readOneKeyboard();
      }
  }, [updateId]);

  return ( <main className='container'>
      <section>
          {
          updateKeyboardData == null ?
          <>
          <h2>Add new keyboard</h2>
          <KeyboardForm onSubmit={createKeyboard}/>
          </>
          :
          <>
            <h2>Update the data of {updateKeyboardData.name}</h2>
            <KeyboardForm onSubmit={updateKeyboard} buttonText={"Update"} keyboard={updateKeyboardData}/>
          </>
          }
          
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
