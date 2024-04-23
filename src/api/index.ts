import axios from 'axios'

export const cryptoApi = axios.create({
    baseURL:'https://min-api.cryptocompare.com/data'
})