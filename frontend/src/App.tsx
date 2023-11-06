import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import LoginProvider from './context/LoginProvider';

function App() {
  return (
    <LoginProvider>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </LoginProvider>
  );
}

export default App;
