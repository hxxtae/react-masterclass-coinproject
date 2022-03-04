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
  // [ 문법 ]
  // const { isLoading, data } = Object(); === const { isLoading: isLoading, data: data }
  // -> key가 isLoading이면 const isLoading = isLoading 값 / key가 data이면 const data = data 값
  // const { isLoading: a, data: b } = Object();
  // -> key가 isLoading이면 const a = isLoading 값 / key가 data이면 const b = data 값

  const loading = infoLoading || tickersLoading;
  // infoLoading이 true 이면 infoLoading, false 이면 tickersLoading
  // 즉 여기에서는 두 개의 api를 전부 받아올 때 까지 loading은 true 이다.

  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <Title>{state?.name ? state.name : loading ? "Loading..." : infoData?.name}</Title>
        <Link to={`/`}>go back</Link>
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
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>            
            
          <Switch>
            <Route path={`/${coinId}/price`}>
              <Price coinId={coinId} />
            </Route>
            <Route path={`/${coinId}/chart`}>
              <Chart coinId={coinId} />
            </Route>
          </Switch>
        </>
      )}
    </Container>
    // [ path 에서 가능한 점 ]
    // <Route path={`/${coinId}/price`}> 이렇게 하드코딩 하지 않아도
    // <Route path={`/:coinid/price`}> 로 유연하게 변경해도 된다.
  );
}

export default Coin;

// <Title>{state?.name ? state.name : loading ? "Loading..." : infoData?.name}</Title>
// 이렇게 작성한 이유
// -> api 호출 동안 타이틀 이름은 Loading으로 보이게 되는데
//    Loading을 최소한으로 안보이게 하기위해 state으로 부터 먼저 타이틀을 받아와
//    api 호출보다 더 빠르게 이름을 먼저 보이게 하기 위해서 이다.
//    그리고 사용자가 바로 링크를 통해 접속시 state값은 undefined 이기 때문에
//    api 호출 이후 로도 터이틀 이름을 받아올 수 있게 한다.

// [ Version 6.x.x ]
// react-router-dom v6 이상이신 분들은
// const { coinId } = useParams(); 이렇게만 해주셔도 됩니다.
// useParams쓰는 순간 타입이 string or undefined로 됩니다.

// [ Version 5.x.x ]
// const { coinId } = useParams<{coinId: string}>();


// [ Version 6.x.x ]
// react-router-dom v6 부터 제네릭을 지원하지 않습니다.
//
// interface RouterState {
//   name: string;
// }
// const location = useLocation();
// const name = location.state as RouterState;


// [ useLocation() ] ★★★
// useLocation hooks는 사용자가 현재 머물러있는 페이지에 대한 정보를 알려주는 hooks 입니다.
// 만약 Link 의 property를 담아 현재 페이지로 넘어왔다면
// Link의 property에대한 정보를 알려준다.

// [ useRouteMatch() ]
// useRouthMatch는 특정한 URL에 있는지의 여부를 알려주게 된다.
// 현재 지정한 Url에 존재한다면 Object를 반환 아니면 null 을 반환하게 된다.

// [ react-router hook ]
// useParams()
// useLocation()
// useHistory()
// useRouteMatch()
// react-route 사이트 : https://v5.reactrouter.com/web/api/Hooks
// 참고 사이트 : https://velog.io/@yiyb0603/React-Router-dom%EC%9D%98-%EC%9C%A0%EC%9A%A9%ED%95%9C-hooks%EB%93%A4

// [ nested routes ] ★★★
// 중첩 라우터
// 다른 route를 render 하는 route, /coin/bitcoin 에서
// 다음 route /coin/bitcoin/chart 를 정의하는 route를 말한다.

// ----------------------------------------

// v6 사용하시는 분들 nested routes 작성 방법이 달라진 것 같습니다.

// https://ui.dev/react-router-nested-routes/
// 여기서 알기 쉽게 차근차근 설명해주네요

// v6에서 nested routes를 구현하는 방법은 두 가지가 있습니다.
// 1. 첫 번째는 부모 route의 path 마지막에 /*를 적어 명시적으로 이 route의 내부에서 nested route가 render 될 수 있음을 표시하고 자식 route를 부모 route의 element 내부에 작성하는 방법입니다.

// 이 방법이 이 영상에서 니코가 하는 방법과 유사합니다. 실제 코딩은 다음과 같습니다.

// router.tsx에서

// <Route path="/:coinId/*" element={<Coin/>} />

// Coin.tsx에서

// <Routes> == Switch
//   <Route path="chart" element={<Chart />} />
//   <Route path="price" element={<Price />} />
// </ Routes>

// Routes가 상대경로도 지원하기 때문에 path="chart"와 같이 써도 동작한다고 하네요.

// 2. 두 번째 방법은 자식 route를 부모 element의 내부가 아닌 route 내부에 작성하는 방법입니다.

// 코드는 다음과 같이 작성합니다.

// router.tsx에서
// chart와 price 컴포넌트를 import하고

// <Route path="/:coinId" element={<Coin />} >
//   <Route path="chart" element={<Chart />} />
//   <Route path="price" element={<Price />} />
// </Route>

// 그리고 이 자식 Route들이 어디에 render 될지 부모의 element안에 Outlet을 이용해 표시해주면 됩니다.

// Coin.tsx에서, react-router-dom에서 Outlet을 import하고
// Overview와 Container 사이에 <Outlet />를 작성해주면 끝납니다.

// 최신 업데이트인데도 버전이 달라서 여러군데서 고생을하네요 ㅜㅜ..

// --------------------------------------

// [ react-helmet ]
// component로 <Helmet> ... </Helmet>에 무엇을 render 하던 그게 문서의 head로 간다.
// <meta>, <link>, <title> 등을 보낸다.
