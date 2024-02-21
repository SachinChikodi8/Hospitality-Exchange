import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Home from './pages/Home';
import Loading from './components/Loading';
import Notification from './components/Notification';
import Room from './components/rooms/Room';
import Customer from './pages/dashboard/Customers/Customer';
import PaymentForm from './components/rooms/PaymentForm';

const App = () => {
  return (
    <>
      <Loading />
      <Notification />
      <BrowserRouter>
        <Routes>
          <Route path="dashboard/*" element={<Dashboard />} />
          <Route path="/payment" component={<PaymentForm/>} />
          <Route path="*" element={<Home />} />
          <Route path="customer" element={<Customer />} />
        </Routes>
      </BrowserRouter>
      <Room />
    </>
  );
};

export default App;
