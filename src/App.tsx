import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';

export const App: FC = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route path=":status" element={<Layout />} />
    </Route>

    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);
