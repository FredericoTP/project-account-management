/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import MainContext from '../context/MainContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

type InvoiceItem = {
  id: number;
  accountId: number;
  date: string;
  description: null | string;
  expense: {
    expense: string;
  };
  value: number;
};

function Home() {
  const {
    checkLogin, userInfo, isLoading, invoice, accountInvoices,
  } = useContext(MainContext);

  useEffect(() => {
    checkLogin();
    userInfo();
    accountInvoices();
  }, []);

  if (isLoading) {
    return (
      <>
        <Header />
        <p>Loading...</p>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <h1>Gastos totais</h1>
      {
        invoice.length === 0 ? (
          <p>Nenhum gasto encontrado</p>
        ) : (
          <ul>
            {invoice.map((item: InvoiceItem) => (
              <li key={item.id}>
                Valor:
                {' '}
                {item.value}
                {' '}
                Tipo:
                {' '}
                {item.expense.expense}
              </li>
            ))}
          </ul>
        )
      }
      <Footer />
    </>
  );
}

export default Home;
