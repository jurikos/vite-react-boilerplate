import { useEffect } from 'react';

import { chakra, useColorMode } from '@chakra-ui/react';

type Props = {
  symbol: string;
};

const TradingViewWidget = ({ symbol }: Props) => {
  const { colorMode } = useColorMode();

  useEffect(() => {
    const script = document.createElement('script');

    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => {
      // @ts-expect-error TODO
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      new TradingView.widget({
        theme: colorMode,
        autosize: true,
        symbol: `BINANCE:${symbol}USDT`,
        interval: 'D',
        timezone: 'Etc/UTC',
        style: '1',
        locale: 'en',
        toolbar_bg: '#f1f3f6',
        enable_publishing: false,
        allow_symbol_change: false,
        calendar: false,
        hide_top_toolbar: true,
        container_id: 'tradingview-widget',
      });
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [colorMode, symbol]);

  return <chakra.div id="tradingview-widget" height={480} />;
};

export default TradingViewWidget;
