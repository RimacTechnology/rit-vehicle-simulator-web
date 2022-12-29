import ReactDOM from 'react-dom/client';
import './assets/scss/index.scss'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from './common/context/AuthProvider';
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import './common/i18n/i18n';
import { Account, Dashboard, History, Login, Register } from './pages';
import { DashboardLayout, HomeLayout } from './common/components';

const client = new ApolloClient({
  uri: "https://api.spacex.land/graphql/",
  cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ApolloProvider client={client}>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="" element={<Dashboard />} />
            <Route path="/dashboard/history" element={<History />} />
            <Route path="/dashboard/account" element={<Account />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </ApolloProvider>
);

