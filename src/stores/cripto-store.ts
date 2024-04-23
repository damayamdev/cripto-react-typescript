
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { CryptoService } from '../services/crypto.service'
import type { CryptoCurrency, CryptoPrice, Pair } from '../types'


interface CriptoState {
    cryptoCurrencies: CryptoCurrency[]
    result: CryptoPrice
    loading: boolean
    fetchCryptos: () => void
    fetchData: (pair: Pair) => Promise<void>
}

export const useCryptoStore = create<CriptoState>()(
    devtools(
        (set) => ({
            cryptoCurrencies: [],
            result: {} as CryptoPrice,
            loading: false,
            fetchCryptos: async () => {
                try {
                    const result = await CryptoService.cryptocompare()
                    set(({ cryptoCurrencies: result?.Data }))
                } catch (error) {

                }
            },
            fetchData: async (pair) => {
                try {
                    set(({loading: true}))
                    const result  = await CryptoService.fetchCurrentCryptoPrice(pair)
                    set(({result, loading: false
                    }))
                } catch (error) {
                    
                }
                
            }
        })
    )
)

