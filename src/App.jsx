import { useState } from 'react'
import Timer from 'C:/Users/pavel.kuplensky/js/my-react-timer-app/src/Timer.js'
import 'C:/Users/pavel.kuplensky/js/my-react-timer-app/src/App.css'


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Timer />
    </>
  );
}

export default App;
