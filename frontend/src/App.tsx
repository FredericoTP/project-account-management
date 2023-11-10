import { Routes, Route } from 'react-router-dom';
import LoginProvider from './context/LoginProvider';
import MainProvider from './context/MainProvider';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Invoice from './pages/Invoice';

function App() {
  return (
    <LoginProvider>
      <MainProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/invoice" element={<Invoice />} />
        </Routes>
      </MainProvider>
    </LoginProvider>
  );
}

export default App;
