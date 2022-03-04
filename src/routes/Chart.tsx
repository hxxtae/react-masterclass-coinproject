import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';
import ReactApexChart from 'react-apexcharts';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../atoms';


interface ChartProps {
  coinId: string;
}

interface IHistoryData {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Chart({ coinId }: ChartProps) { // === props: ChartProps
  const { isLoading, data } = useQuery<IHistoryData[]>(['ohlcv', coinId], () =>
    fetchCoinHistory(coinId), {
      refetchInterval: 5000, // 매 5초마다 이 query를 refetch 한다.
    }
  );
  
  const isDark = useRecoilValue(isDarkAtom);

  return (
    <div>
      {isLoading ? "Loading chart..." : <ReactApexChart
        type='line'
        series={[
          {
            name: 'price',
            data: data?.map(item => item.close),
          }
        ]}

        options={{
          theme: {
            mode: isDark ? 'dark' : 'light'
          },
          chart: {
            width: 500,
            height: 300,
            background: 'translate',
            toolbar: { show: false },
          },
          stroke: { curve: 'smooth', width: 7 },
          yaxis: { show: false },
          xaxis: {
            type: 'datetime',
            labels: { show: false },
            axisBorder: { show: false },
            axisTicks: { show: false },
            tooltip: { enabled: false },
            categories: data?.map(item => item.time_close)
          },
          grid: { show: false },
          fill: {
            type: 'gradient',
            gradient: {
              gradientToColors: ['#00a8ff'],
              stops: [0, 50, 100]
            }
          },
          colors: ['#e84118'],
          tooltip: {
            y: {
              formatter: (value) => `$${value.toFixed(3)}`,
            }
          }
        }}
      />
      }
    </div>
  );
}

export default Chart;

// [ JavaScript APEX CHARTS / library ]
// APEX CHARTS
// https://apexcharts.com

// APEX CHARTS 설치
// npm install --save react-apexcharts apexcharts

// React APEX CHARTS Doc
// https://apexcharts.com/docs/react-charts

// [ Recoil ]
// atom
// -> atom은 상태(state)의 일부를 나타낸다.
// -> atom은 어떤 컴포넌트에서나 읽고 쓸 수 있다.
// -> atom 의 값을 읽는 컴포넌트들은 암묵적으로 atom을 구독한다.
//    그레서 변화가 있으면 해당 atom을 구독하는 모든 컴포넌트들이 reRendering 되는 결과가 발생할 것이다.