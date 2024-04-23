import { AxiosError } from 'axios'
import { cryptoApi } from "../api"
import { CryptoCurrenciesResponseSchema, CryptoPriceSchema } from '../schemas/crypto-schema'
import type { CryptoCurrencies, CryptoPrice, Pair } from '../types'


export class CryptoService {
    static cryptocompare = async (): Promise<CryptoCurrencies | undefined> => {
        try {
            const response = await cryptoApi.get(`/top/mktcapfull?limit=20&tsym=USD`)
            const { data } = CryptoCurrenciesResponseSchema.safeParse(response.data)
            return data
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response?.data)
                throw new Error(error.response?.data)
            }
            console.log(error)
            throw new Error('Error en el sistema')
        }
    }

    static fetchCurrentCryptoPrice = async (pair: Pair): Promise<CryptoPrice | undefined> => {
        try {
            const { data: { DISPLAY } } = await cryptoApi.get(`/pricemultifull?fsyms=${pair.criptocurrency}&tsyms=${pair.currency}`)
            const result = CryptoPriceSchema.safeParse(DISPLAY[pair.criptocurrency][pair.currency])
            if (result.success) {
                return result.data
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response?.data)
                throw new Error(error.response?.data)
            }
            console.log(error)
            throw new Error('Error en el sistema')
        }
    }
}