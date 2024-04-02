import { z } from 'zod';

const error = z.string().optional();
const timestamp = z.number();

export const cryptoCurrencySchema = z.object({
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
  vwap24Hr: z.string().nullable().optional(),
  explorer: z.string().url().nullable(),
});

export const cryptoCurrencyListApiValidationSchema = z.object({
  error,
  timestamp,
  data: z.array(cryptoCurrencySchema),
});

export const cryptoCurrencyDetailApiValidationSchema = z.object({
  error,
  timestamp,
  data: cryptoCurrencySchema.optional(),
});
