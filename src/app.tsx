import { BrowserRouter, Route, Routes } from 'react-router';
import Layout from '@/modules/layout/layout.component.tsx';
import HomePage from '@/modules/pages/home/page.tsx';
import AccountPage from '@/modules/pages/account/page.tsx';
import NotFoundPage from '@/modules/pages/not-found/page.tsx';
import { WagmiProvider, http, createConfig } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { mainnet } from 'viem/chains';

const appQueryClient = new QueryClient();
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
      </BrowserRouter>
    </QueryClientProvider>
  </WagmiProvider>;
}

export default App
