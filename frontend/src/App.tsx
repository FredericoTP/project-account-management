import { Routes, Route } from 'react-router-dom';
import LoginProvider from './context/LoginProvider';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <LoginProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Register />} />
      </Routes>
    </LoginProvider>
  );
}

export default App;
