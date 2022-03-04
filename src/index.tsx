import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import { HelmetProvider } from 'react-helmet-async';
import { RecoilRoot } from 'recoil';


const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);


// --------------------------
// [ Main Learn ]
// --------------------------
// 1. styled-components
//    - <ThemeProvider>
//    - <GlobalStyle> (createGlobalStyle``)

// 2. react-router-dom
//    <BrowserRouter> / <HashRouter>
//    <Routes(Switch)>
//    <Route>
//    <Link>
//    - useParams()
//    - useLocation()
//    - useHistory()
//    - useRouteMatch()

// 3. react-query
//    - <QueryClientProvider> (new QueryClient())
//    - <ReactQueryDevtools>
//    - useQuery()

// 4. recoil(atom, selector)
//    - useRecoilValue()
//    - useSetRecoilState()

// --------------------------
// [ Sub Learn ]
// --------------------------
// 1. react-helmet or react-helmet-async
//    - <HelmetProvider>
//    - <Helmet>

// 2. react-apexcharts
//    - <ReactApexCharts>

