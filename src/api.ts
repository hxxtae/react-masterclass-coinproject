const BASE_URL = 'https://api.coinpaprika.com/v1';

// 1. fetch 로 api ajax 호출
export async function fetchCoins() {
  return await (await fetch(`${BASE_URL}/coins`)).json();
}

export function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then(response =>
    response.json()
  );
}

export function fetchCoinTicker(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then(response =>
    response.json()
  );
}

export function fetchCoinHistory(coinId: string) {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - (60 * 60 * 24 * 7*2);
  return fetch(`${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`).then(response =>
    response.json()
  );
}


interface CoinInterface {
  id: string,
  name: string,
  symbol: string,
  rank: number,
  is_new: ConstrainBooleanParameters,
  is_active: boolean,
  type: string,
};

// 2. promise 로 api ajax 호출
export function fetchCoinsP(payload: Object) {
  return new Promise<CoinInterface[]>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.coinpaprika.com/v1/coins');
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify(payload));

    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;

      if (xhr.status >= 200 && xhr.status < 400) {
        resolve(xhr.response); // Success!
      } else {
        reject(new Error(`@@@${xhr.statusText}@@@`)); // Failed...
      }
    };
  });
};
