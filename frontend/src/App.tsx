import { Routes, Route } from 'react-router-dom';
import LoginProvider from './context/LoginProvider';
import MainProvider from './context/MainProvider';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <LoginProvider>
      <MainProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/home" />
        </Routes>
      </MainProvider>
    </LoginProvider>
  );
}

export default App;
