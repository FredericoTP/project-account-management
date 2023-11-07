function Register() {
  return (
    <main>
      <h1>Criar nova conta</h1>
      <form>
        <div>
          <p>Nome: </p>
          <input
            type="text"
            placeholder="Nome"
          />
        </div>
        <div>
          <p>Email: </p>
          <input
            type="email"
            placeholder="Email"
          />
        </div>
        <div>
          <p>Senha: </p>
          <input
            type="password"
            placeholder="Password"
          />
        </div>
        <div>
          <p>Confirme a senha: </p>
          <input
            type="password"
            placeholder="Password"
          />
        </div>
        <button type="submit">
          Cadastrar
        </button>
      </form>
    </main>
  );
}

export default Register;
