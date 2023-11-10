/* eslint-disable no-alert */
import React, { useState } from 'react';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import useInput from '../hook/useInput';
import api from '../utils/apíInstance';

function Register() {
  const nameInput = useInput('');
  const emailInput = useInput('');
  const firstPasswordInput = useInput('');
  const secondPasswordInput = useInput('');
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();

  function resetForm() {
    nameInput.setValue('');
    emailInput.setValue('');
    firstPasswordInput.setValue('');
    secondPasswordInput.setValue('');
  }

  function verifyAccount() {
    if (nameInput.value === '' || emailInput.value === '' || firstPasswordInput.value === '' || secondPasswordInput.value === '') {
      setAlertMessage('Preencha todos os campos');
      return false;
    }

    if (nameInput.value.length < 3) {
      setAlertMessage('Nome deve ter no mínimo 3 caracteres');
      return false;
    }

    if (firstPasswordInput.value.length < 8 || secondPasswordInput.value.length < 8) {
      setAlertMessage('Senha deve ter no mínimo 8 caracteres');
      return false;
    }

    if (firstPasswordInput.value !== secondPasswordInput.value) {
      setAlertMessage('As senhas devem ser iguais');
      return false;
    }

    setAlertMessage('');
    return true;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();

      if (!verifyAccount()) return;

      setIsLoading(true);

      const newAccount = {
        name: nameInput.value,
        email: emailInput.value,
        password: firstPasswordInput.value,
      };

      const response = await api.post('/account', newAccount);

      if (response.status === 201) {
        setIsLoading(false);
        resetForm();
        alert('Conta criada com sucesso!');
        navigate('/', { replace: true });
        return;
      }

      resetForm();
    } catch (err) {
      if (err instanceof AxiosError) {
        setAlertMessage(err.response?.data.message);
      }
      setIsLoading(false);
    }
  }

  return (
    <main>
      <h1>Criar nova conta</h1>
      <form onSubmit={(event) => handleSubmit(event)}>
        <div>
          <p>Nome: </p>
          <input
            type="text"
            placeholder="Nome"
            value={nameInput.value}
            onChange={nameInput.handleChange}
          />
        </div>
        <div>
          <p>Email: </p>
          <input
            type="email"
            placeholder="Email"
            value={emailInput.value}
            onChange={emailInput.handleChange}
          />
        </div>
        <div>
          <p>Senha: </p>
          <input
            type="password"
            placeholder="Password"
            value={firstPasswordInput.value}
            onChange={firstPasswordInput.handleChange}
          />
        </div>
        <div>
          <p>Confirme a senha: </p>
          <input
            type="password"
            placeholder="Password"
            value={secondPasswordInput.value}
            onChange={secondPasswordInput.handleChange}
          />
        </div>
        {
          isLoading ? (
            <p>Carregando...</p>
          ) : (
            <button type="submit">
              Cadastrar
            </button>
          )
        }
        <small>{alertMessage}</small>
      </form>
    </main>
  );
}

export default Register;
