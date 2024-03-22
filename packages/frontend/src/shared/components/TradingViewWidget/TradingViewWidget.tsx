import { useEffect } from 'react';

import { chakra, useColorMode } from '@chakra-ui/react';

type Props = {
  exchange: string;
  symbol: string;
  currency?: string;
  widgetHeight?: number;
};

const TradingViewWidget = ({ exchange, symbol, currency = '', widgetHeight = 480 }: Props) => {
  const { colorMode } = useColorMode();

  const containerId = `tradingview-widget-${exchange}-${symbol}-${currency}`;

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
        symbol: `${exchange}:${symbol}${currency}`,
        interval: 'D',
        timezone: 'Etc/UTC',
        style: '1',
        locale: 'en',
        toolbar_bg: '#f1f3f6',
        enable_publishing: false,
        allow_symbol_change: false,
        calendar: false,
        hide_top_toolbar: true,
        container_id: containerId,
      });
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [colorMode, containerId, currency, exchange, symbol]);

  return <chakra.div id={containerId} height={widgetHeight} />;
};

export default TradingViewWidget;
