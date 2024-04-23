import {z} from 'zod'
import { CryptoCurrenciesResponseSchema, CryptoCurrencyResponseSchema, CryptoPriceSchema, CurrencySchema, PairSchema } from './../schemas/crypto-schema';

export type Currency = z.infer<typeof CurrencySchema>
export type CryptoCurrency = z.infer<typeof CryptoCurrencyResponseSchema>
export type CryptoCurrencies = z.infer<typeof CryptoCurrenciesResponseSchema>
export type Pair = z.infer<typeof PairSchema>
export type CryptoPrice = z.infer<typeof CryptoPriceSchema>