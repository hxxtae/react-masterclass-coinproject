import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoins } from '../api';
import { Helmet } from 'react-helmet-async';
import { useRecoilState } from 'recoil';
import { isDarkAtom } from '../atoms';

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

  button {
    width: 100px;
    height: 30px;
    margin-top: 15px;
    border: none;
    border-radius: 4px;
    background-color: ${(props) => props.theme.textColor};
    color: ${(props) => props.theme.bgColor};
    transition: background-color 500ms ease-in-out;
  }
`;

const CoinList = styled.ul``;

const Coin = styled.li`
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 20px;
  box-shadow: 0 0px 10px ${(props) => props.theme.textColor};

  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in-out;
  }

  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
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

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

interface CoinInterface {
  id: string,
  name: string,
  symbol: string,
  rank: number,
  is_new: ConstrainBooleanParameters,
  is_active: boolean,
  type: string,
};


function Coins() {
  // const [coins, setCoins] = useState<CoinInterface[]>([]);
  // const [loading, setLoading] = useState(true);
  // coins -> data 로 대체
  // loading -> isLoading 로 대체
  const { isLoading, data } = useQuery<CoinInterface[]>('allCoins', fetchCoins);
  // - { isLoading: isLoading, data: data }
  // - data : fetchCoins으로 비동기 데이터를 받아와 반환한다.
  // - isLoading : fetchCoins가 정상적으로 받아오면 isLoading은 false, 받아오는 중 이면 true 를 반환한다.
  //   큰 특징 : 한 번 React query가 호출되어 데이터를 받아오고나면 다시 React query를 호출할 때 React query는 이미
  //            data가 캐시(react-query cacing)에 있다는 것을 알고 다시 api를 호출하지 않는다. (데이터를 React query cacing 에 저장)

  const [ mode, setMode ] = useRecoilState(isDarkAtom); // setState처럼 함수 호출로 값의 변경이 일어난다.
  const toggleTheme = () => setMode((prev) => !prev);

  
  return (
    <Container>
      <Helmet>
        <title>
          코인
        </title>
      </Helmet>
      <Header>
        <Title>Coins</Title>
        <button onClick={toggleTheme}>{mode ? 'Light' : 'Dark'}</button>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinList>
          {data?.slice(0, 100)?.map(coin =>
            <Coin key={coin.id}>
              <Link to={{
                pathname: `/${coin.id}`,
                state: { name: coin.name }
              }}>
                <Img src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLocaleLowerCase()}`}></Img>
                {coin.name} &rarr;
              </Link>
            </Coin>
          )}
        </CoinList>
      )}
    </Container>
  );
}

export default Coins;

// [ Data send kind ] ★★★
// 1. url뒤에 :dataid 의 값을 보내고 useParams()를 통해 받는 방법
// 2. Link 태그의 property 로 데이터 보내고 useLocation()을 통해 받는 방법

// [ Link ] ★★★
// react-router-dom 6.0.0버전 이상 사용 시
// Link의 to 프롭에 모든 정보를 담지 않고
// <Link to={} state={} > 처럼 사용하도록 바뀌었습니다.

/*
  react-router-dom version 6.0.0 미만
  <Link
    to={{
      pathname: "/btc",
      search: "?sort=name",
      hash: "#the-hash",
      state: { fromDash: true }
    }}
  />
*/

// Link 를 이용하되, Link안의 property를 사용하면 두가지 경우의 상황이 발생할 수 있다.
// 1. Link 클릭을 통해 다음 페이지로 접속한 경우
//    -> Link 클릭을 통해 Link 안의 데이터를 다음 페이지로 넘겨준다. (정상동작)
// 2. url로 바로 다음 페이지 링크로 접속한 경우
//    -> Link 안의 데이터를 알 수 없으므로, 다음페이지로 전환 시 에러 발생 (에러)

// [ React Query ]
// React 애플리케이션에서 서버 state를 fetching, caching, synchronizing, updating 할 수 있도록
// 도와주는 라이브러리
// https://react-query.tanstack.com/reference/useQuery#_top

// - useQuery()
//   장점은 한번 호출된 데이터를 캐시(react-query caching)에 저장하기 때문에, api 재 호출시 저장된 캐쉬 데이터를 불러와
//   더 빠른 화면 전환이 가능하다.

// ※ Query Key
// React Query는 쿼리 키를 기반으로 쿼리 캐싱(caching)을 관리
// https://react-query.tanstack.com/guides/query-keys

// [ React query Devtools ]
// React query로 가져온 데이터를 시각화 해서 보여준다.
// https://react-query.tanstack.com/devtools#_top
