import { Route, Routes } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Auth } from '../pages/Auth';

export const MainRoutes = () => {
  return (
    <Routes>
      <Route path="signin" element={<Auth type="signin" />} />
      <Route path="signup" element={<Auth type="signup" />} />

      <Route element={<Layout />}>
        <Route index element={<h1>Dashboard</h1>} />
      </Route>
    </Routes>
  );
};
