import ReactDOM from 'react-dom/client';
import App from './pages/app/app.component';
import './assets/scss/index.scss'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from './common/context/AuthProvider';
import Login from './pages/login/login.component';
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

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
          <Route path="/*" element={<App />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Login />} />
            <Route path="dashboard" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </ApolloProvider>
);

