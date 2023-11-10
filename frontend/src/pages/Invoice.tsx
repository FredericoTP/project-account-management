import React, { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import useInput from '../hook/useInput';
import useInputNumber from '../hook/useInputNumber';
import useSelect from '../hook/useSelect';
import api from '../utils/apíInstance';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getToken } from '../utils/auth/authentication';

type ExpenseItem = {
  id: number;
  expense: string;
};

function Invoice() {
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [expense, setExpense] = useState([]);
  const descriptionInput = useInput('');
  const valueInput = useInputNumber(0);
  const dateInput = useInput('');
  const selectInput = useSelect('1');

  function resetForm() {
    descriptionInput.setValue('');
    valueInput.setValue(0);
    dateInput.setValue('');
  }

  function verifyInvoice() {
    if (valueInput.value <= 0) {
      setAlertMessage('Valor deve ser maior que zero');
      return false;
    }

    if (dateInput.value === '') {
      setAlertMessage('Coloque uma data');
      return false;
    }

    return true;
  }

  async function getExpenses() {
    try {
      setIsLoading(true);
      const token = getToken();

      const response = await api.get('/expense', { headers: { Authorization: token } });

      setExpense(response.data);
      setIsLoading(false);
    } catch (err) {
      if (err instanceof AxiosError) {
        setAlertMessage(err.response?.data.message);
      }
      setIsLoading(false);
    }
  }

  function newInvoiceObject() {
    if (descriptionInput.value) {
      const newInvoice = {
        expenseId: +selectInput.value,
        value: valueInput.value,
        description: descriptionInput.value,
        date: dateInput.value,
      };
      return newInvoice;
    }

    const newInvoice = {
      expenseId: +selectInput.value,
      value: valueInput.value,
      date: dateInput.value,
    };

    return newInvoice;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();

      if (!verifyInvoice()) return;

      setIsLoading(true);
      const token = getToken();

      const newInvoice = newInvoiceObject();

      const response = await api.post('/invoice', newInvoice, { headers: { Authorization: token } });

      if (response.status === 201) {
        setIsLoading(false);
        resetForm();
        alert('Despesa criada com sucesso!');
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        setAlertMessage(err.response?.data.message);
      }
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getExpenses();
  }, []);

  return (
    <>
      <Header />
      <main>
        <h1>Nova despesa:</h1>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div>
            <p>Tipo de despesa: </p>
            <select
              value={selectInput.value}
              onChange={selectInput.handleChange}
            >
              {
                expense.map((item: ExpenseItem) => (
                  <option
                    key={item.id}
                    value={item.id}
                  >
                    {item.expense}

                  </option>
                ))
              }
            </select>
          </div>
          <div>
            <p>Valor: </p>
            <input
              type="number"
              value={valueInput.value}
              onChange={valueInput.handleChange}
            />
          </div>
          <div>
            <p>Descrição: </p>
            <input
              type="text"
              value={descriptionInput.value}
              onChange={descriptionInput.handleChange}
            />
          </div>
          <div>
            <p>Data: </p>
            <input
              type="date"
              value={dateInput.value}
              onChange={dateInput.handleChange}
            />
          </div>
          {
            isLoading ? (
              <p>Carregando...</p>
            ) : (
              <button
                type="submit"
              >
                Criar
              </button>
            )
          }
          <small>{alertMessage}</small>
        </form>
      </main>
      <Footer />
    </>
  );
}

export default Invoice;
