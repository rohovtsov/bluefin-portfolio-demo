import { BrowserRouter, Route, Routes } from 'react-router';
import Layout from '@/modules/layout/layout.component.tsx';
import HomePage from '@/modules/pages/home/page.tsx';
import AccountPage from '@/modules/pages/account/page.tsx';
import NotFoundPage from '@/modules/pages/not-found/page.tsx';

function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="account/:address" element={<AccountPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </BrowserRouter>;
}

export default App
