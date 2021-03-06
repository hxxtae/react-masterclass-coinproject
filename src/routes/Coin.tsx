import { Link, Route, Switch, useLocation, useParams, useRouteMatch } from 'react-router-dom';
import Price from './Price';
import Chart from './Chart';
import styled from 'styled-components';
import { fetchCoinInfo, fetchCoinTicker } from '../api';
import { useQuery } from 'react-query';
import { Helmet } from 'react-helmet-async';

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  a {
    display: block;
    &:hover,
    &:active {
      opacity: 0.4;
    }
  }

`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.div`
  text-align: center;
  display: block;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
    
  a {
    display: block;
  }
`;

interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  contract: string;
  platform: string;
  parent: object;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    }
  }
}


function Coin() {
  const { coinId } = useParams<{ coinId: string }>(); // useParams()
  const { state } = useLocation<{ name: string }>(); // useLocation()
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");

  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(
    ['info', coinId], () => fetchCoinInfo(coinId)
  );
  
  const { isLoading: tickersLoading, data: tickersData } = useQuery<IPriceData>(
    ['tickers', coinId], () => fetchCoinTicker(coinId), {
      refetchInterval: 5000
    }
  );
  // [ ?????? ]
  // const { isLoading, data } = Object(); === const { isLoading: isLoading, data: data }
  // -> key??? isLoading?????? const isLoading = isLoading ??? / key??? data?????? const data = data ???
  // const { isLoading: a, data: b } = Object();
  // -> key??? isLoading?????? const a = isLoading ??? / key??? data?????? const b = data ???

  const loading = infoLoading || tickersLoading;
  // infoLoading??? true ?????? infoLoading, false ?????? tickersLoading
  // ??? ??????????????? ??? ?????? api??? ?????? ????????? ??? ?????? loading??? true ??????.

  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <Title>{state?.name ? state.name : loading ? "Loading..." : infoData?.name}</Title>
        <Link to={`${process.env.PUBLIC_URL}/`}>go back</Link>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>{infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>{tickersData?.quotes.USD.price.toFixed(3)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>
            
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`${process.env.PUBLIC_URL}/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`${process.env.PUBLIC_URL}/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>            
            
          <Switch>
            <Route path={`${process.env.PUBLIC_URL}/${coinId}/price`}>
              <Price coinId={coinId} />
            </Route>
            <Route path={`${process.env.PUBLIC_URL}/${coinId}/chart`}>
              <Chart coinId={coinId} />
            </Route>
          </Switch>
        </>
      )}
    </Container>
    // [ path ?????? ????????? ??? ]
    // <Route path={`/${coinId}/price`}> ????????? ???????????? ?????? ?????????
    // <Route path={`/:coinid/price`}> ??? ???????????? ???????????? ??????.
  );
}

export default Coin;

// <Title>{state?.name ? state.name : loading ? "Loading..." : infoData?.name}</Title>
// ????????? ????????? ??????
// -> api ?????? ?????? ????????? ????????? Loading?????? ????????? ?????????
//    Loading??? ??????????????? ???????????? ???????????? state?????? ?????? ?????? ???????????? ?????????
//    api ???????????? ??? ????????? ????????? ?????? ????????? ?????? ????????? ??????.
//    ????????? ???????????? ?????? ????????? ?????? ????????? state?????? undefined ?????? ?????????
//    api ?????? ?????? ?????? ????????? ????????? ????????? ??? ?????? ??????.

// [ Version 6.x.x ]
// react-router-dom v6 ???????????? ?????????
// const { coinId } = useParams(); ???????????? ???????????? ?????????.
// useParams?????? ?????? ????????? string or undefined??? ?????????.

// [ Version 5.x.x ]
// const { coinId } = useParams<{coinId: string}>();


// [ Version 6.x.x ]
// react-router-dom v6 ?????? ???????????? ???????????? ????????????.
//
// interface RouterState {
//   name: string;
// }
// const location = useLocation();
// const name = location.state as RouterState;


// [ useLocation() ] ?????????
// useLocation hooks??? ???????????? ?????? ??????????????? ???????????? ?????? ????????? ???????????? hooks ?????????.
// ?????? Link ??? property??? ?????? ?????? ???????????? ???????????????
// Link??? property????????? ????????? ????????????.

// [ useRouteMatch() ]
// useRouthMatch??? ????????? URL??? ???????????? ????????? ???????????? ??????.
// ?????? ????????? Url??? ??????????????? Object??? ?????? ????????? null ??? ???????????? ??????.

// [ react-router hook ]
// useParams()
// useLocation()
// useHistory()
// useRouteMatch()
// react-route ????????? : https://v5.reactrouter.com/web/api/Hooks
// ?????? ????????? : https://velog.io/@yiyb0603/React-Router-dom%EC%9D%98-%EC%9C%A0%EC%9A%A9%ED%95%9C-hooks%EB%93%A4

// [ nested routes ] ?????????
// ?????? ?????????
// ?????? route??? render ?????? route, /coin/bitcoin ??????
// ?????? route /coin/bitcoin/chart ??? ???????????? route??? ?????????.

// ----------------------------------------

// v6 ??????????????? ?????? nested routes ?????? ????????? ????????? ??? ????????????.

// https://ui.dev/react-router-nested-routes/
// ????????? ?????? ?????? ???????????? ??????????????????

// v6?????? nested routes??? ???????????? ????????? ??? ????????? ????????????.
// 1. ??? ????????? ?????? route??? path ???????????? /*??? ?????? ??????????????? ??? route??? ???????????? nested route??? render ??? ??? ????????? ???????????? ?????? route??? ?????? route??? element ????????? ???????????? ???????????????.

// ??? ????????? ??? ???????????? ????????? ?????? ????????? ???????????????. ?????? ????????? ????????? ????????????.

// router.tsx??????

// <Route path="/:coinId/*" element={<Coin/>} />

// Coin.tsx??????

// <Routes> == Switch
//   <Route path="chart" element={<Chart />} />
//   <Route path="price" element={<Price />} />
// </ Routes>

// Routes??? ??????????????? ???????????? ????????? path="chart"??? ?????? ?????? ??????????????? ?????????.

// 2. ??? ?????? ????????? ?????? route??? ?????? element??? ????????? ?????? route ????????? ???????????? ???????????????.

// ????????? ????????? ?????? ???????????????.

// router.tsx??????
// chart??? price ??????????????? import??????

// <Route path="/:coinId" element={<Coin />} >
//   <Route path="chart" element={<Chart />} />
//   <Route path="price" element={<Price />} />
// </Route>

// ????????? ??? ?????? Route?????? ????????? render ?????? ????????? element?????? Outlet??? ????????? ??????????????? ?????????.

// Coin.tsx??????, react-router-dom?????? Outlet??? import??????
// Overview??? Container ????????? <Outlet />??? ??????????????? ????????????.

// ?????? ????????????????????? ????????? ????????? ??????????????? ?????????????????? ??????..

// --------------------------------------

// [ react-helmet ]
// component??? <Helmet> ... </Helmet>??? ????????? render ?????? ?????? ????????? head??? ??????.
// <meta>, <link>, <title> ?????? ?????????.
