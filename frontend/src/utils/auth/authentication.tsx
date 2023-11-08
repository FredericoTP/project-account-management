import * as jose from 'jose';

function getToken() {
  return localStorage.getItem('token');
}

function decodeToken() {
  const token = getToken();

  if (token) {
    const decodedToken = jose.decodeJwt(token);
    console.log(decodedToken);

    return decodedToken;
  }

  return '';
}

function hasSession() {
  const token = localStorage.getItem('token');
  return token !== null;
}

function protectedRoute() {
  if (!hasSession()) {
    alert('Você precisa estar logado para acessar esta página!');
  }
}

export {
  getToken, decodeToken, hasSession, protectedRoute,
};
