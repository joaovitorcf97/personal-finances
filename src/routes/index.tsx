import { Route, Routes } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Auth } from '../pages/Auth';
import { Home } from '../pages/Home';
import { EditTransaction } from '../pages/Transaction/edit';
import { NewTransaction } from '../pages/Transaction/new';
import { Transactions } from '../pages/Transaction/transactions';

export const MainRoutes = () => {
  return (
    <Routes>
      <Route path="signin" element={<Auth type="signin" />} />
      <Route path="signup" element={<Auth type="signup" />} />

      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/transacoes">
          <Route index element={<Transactions />} />
          <Route path="nova" element={<NewTransaction />} />
          <Route path=":id/editar" element={<EditTransaction />} />
        </Route>
      </Route>
    </Routes>
  );
};
