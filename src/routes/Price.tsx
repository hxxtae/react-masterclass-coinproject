import styled from 'styled-components';
import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';
import { motion } from 'framer-motion';

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PriceBoxs = styled.ul`
  width: 100%;
`;

const PriceBox = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;

  span {
    font-size: 20px;
    font-weight: 500;
  }

  p {
    font-size: 18px;
  }

  &:hover {
    color: ${(props) => props.theme.accentColor};
  }
`;

const containerVariants = {
  start: {
    opacity: 0
  },
  end: {
    opacity: 1,
    transition: {
      duration: 1
    }
  }
}

interface PriceProps {
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

function Price({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery<IHistoryData[]>(['price', coinId], () =>
  fetchCoinHistory(coinId, false), {
    refetchInterval: 5000, 
  });
  
  const priceObject = data?.slice(1, 2)[0];
  const regexpDate = (date: string) => {
    const req = new RegExp(/[TZ]/g);
    const day = date.split(req)[0];
    const time = date.split(req)[1];
    return `${day} / ${time}`;
  }

  return (
    <Container variants={containerVariants} initial="start" animate="end">
      <PriceBoxs>
        {isLoading
          ? 'Loading...'
          : (
            <>
              <PriceBox>
                <span>Time Open</span>
                <p>{ regexpDate(String(priceObject?.time_open)) }</p>
              </PriceBox>
              <PriceBox>
                <span>Time Close</span>
                <p>{ regexpDate(String(priceObject?.time_close)) }</p>
              </PriceBox>
              <PriceBox>
                <span>Open Price</span>
                <p>{ priceObject?.open.toFixed(2) }</p>
              </PriceBox>
              <PriceBox>
                <span>High Price</span>
                <p>{priceObject?.high.toFixed(2)}</p>
              </PriceBox>
              <PriceBox>
                <span>Low Price</span>
                <p>{priceObject?.low.toFixed(2)}</p>
              </PriceBox>
              <PriceBox>
                <span>Close Price</span>
                <p>{priceObject?.close.toFixed(2)}</p>
              </PriceBox>
            </>
          )}
      </PriceBoxs>
    </Container>
  );
}

export default Price;
