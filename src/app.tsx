import { BrowserRouter, Route, Routes } from 'react-router';
import Layout from '@/modules/layout/layout.component.tsx';
import HomePage from '@/modules/pages/home/page.tsx';
import AccountPage from '@/modules/pages/account/page.tsx';
import NotFoundPage from '@/modules/pages/not-found/page.tsx';
import { createConfig, http, WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { mainnet } from 'viem/chains';
import { toast, ToastContainer } from 'react-toastify';

function toastError(error: Error) {
  toast.clearWaitingQueue();
  toast(error.message, {
    hideProgressBar: true,
    closeButton: false,
    type: 'error',
    autoClose: 2000,
  });
  return false;
}

const appQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: toastError,
    },
    mutations: {
      throwOnError: toastError,
    },
  },
});

const appWagmiConfig = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
});

function App() {
  return <WagmiProvider config={appWagmiConfig}>
    <QueryClientProvider client={appQueryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="account/:address" element={<AccountPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
        <ToastContainer limit={1} position="bottom-right" />
      </BrowserRouter>
    </QueryClientProvider>
  </WagmiProvider>;
}

export default App
