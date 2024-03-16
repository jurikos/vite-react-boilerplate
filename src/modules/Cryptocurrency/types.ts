import { z } from 'zod';

export const schemaCryptoCurrency = z.object({
  id: z.string(),
  rank: z.string(),
  symbol: z.string(),
  name: z.string(),
  supply: z.string(),
  maxSupply: z.string().nullable(),
  marketCapUsd: z.string(),
  volumeUsd24Hr: z.string(),
  priceUsd: z.string(),
  changePercent24Hr: z.string(),
  vwap24Hr: z.string().optional(),
  explorer: z.string().url().nullable(),
});

export type CryptoCurrency = z.infer<typeof schemaCryptoCurrency>;
