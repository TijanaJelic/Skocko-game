import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StartGame from './components/StartGame/StartGame';
import Game from './components/Game/Game';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartGame />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
