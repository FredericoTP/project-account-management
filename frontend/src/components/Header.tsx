import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  function logOut() {
    localStorage.removeItem('token');
    navigate('/', { replace: true });
    navigate(0);
  }

  return (
    <header>
      <div>
        <Link to="/">Início</Link>
        <Link to="/">Perfil</Link>
      </div>
      <div>
        <button
          type="button"
          onClick={logOut}
        >
          Sair
        </button>
      </div>
    </header>
  );
}

export default Header;
