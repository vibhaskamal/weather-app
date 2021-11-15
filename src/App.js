import React, { useState } from 'react';
import './App.css';

function App() {
  let [userInput, setUserInput] = useState('');

  function handleInputChange(e) {
    setUserInput(e.target.value);
  }

  function handleSubmit() {
    console.log('userInput: ', userInput);
  }

  function handleClear() {
    setUserInput('');
  }


  return (
    <div className="App">
      Enter name of city:<br />
      <input type="text" value={userInput} onChange={handleInputChange} />
      <br />
      <button onClick={handleSubmit}>
        Submit
      </button>
      <button onClick={handleClear}>
        Clear
      </button>
    </div>
  );
}

export default App;
