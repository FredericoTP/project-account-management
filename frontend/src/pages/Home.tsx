import { useContext, useEffect } from 'react';
import MainContext from '../context/MainContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Home() {
  const {
    checkLogin, userInfo, user, isLoading, invoice, accountInvoices,
  } = useContext(MainContext);

  useEffect(() => {
    checkLogin();
    userInfo();
    accountInvoices();
  }, []);

  console.log(invoice);

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
      <p>Home</p>
      <Footer />
    </>
  );
}

export default Home;
