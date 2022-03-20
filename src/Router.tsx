import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Coin from './routes/Coin';
import Coins from './routes/Coins';

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={process.env.PUBLIC_URL + "/:coinId"} >
          <Coin />
        </Route>
        <Route path={process.env.PUBLIC_URL + "/"} >
          <Coins />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;

// [ React Router | react-router-dom ] ★★★
// - BrowserRouter : 기존 사이트처럼 /만 붙는 방식의 Router
// - HashRouter : 사이트에 #가 붙는 방식의 Router

// - Routes(Switch) : 한 번에 하나의 Route를 렌더링할 수 있는 방법
//  *version issue -> react-router-dom 버전 6.0.0부터 Switch를 Routes로 바꿨다고 합니다.

// - Route : 
//   Route는 위에서 부터 아래로 먼저 맞는 경로가 있을 경우에 보여주기 때문에
//   Router내부에 있는 Route의 순서를 신경써서 작성해야겠다.
//   이유
//   switch가 여러개의 route중에서 하나만 고르기 때문이다.
//   그렇다면 특정 url의 route를 나오게 하고 싶다면 어떻게 해야할까.
//   정확한 링크일 때만 보여주는 exact를 사용하면 된다.


// - Link : a와는 다르게 새로고침을 하지 않는 방식의 페이지 이동 방법.
//   페이지가 render 되고나면 Link 컴포넌트는 a 태그로 변경된다.

// React router 설명 링크 : https://v5.reactrouter.com/web/api/Link/to-func
