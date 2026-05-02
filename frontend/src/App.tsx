import { Route, Routes } from 'react-router-dom';
import MainLayout from './Layouts/MainLayouts';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import ProtectedRoute from './components/ProtectedRouter/ProtectedRouter';
import AddEstablishmentPage from './pages/AddPlace/AddEstablishmentPage';
import EstablishmentsPage from './pages/EstablishmentsPage/EstablishmentsPage';
import EstablishmentPage from './pages/EsteblishmentPage/EsteblishmentPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<EstablishmentsPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<RegisterPage />} />
        <Route path="establishments/:id" element={<EstablishmentPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="place/add" element={<AddEstablishmentPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
