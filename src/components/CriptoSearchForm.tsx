import { ChangeEvent, FormEvent, useState } from "react";
import { currencies } from "../data";
import { useCryptoStore } from "../stores/cripto-store";
import type { Pair } from "../types";
import ErrorMessage from "./ErrorMessage";

const CriptoSearchForm = () => {
  const [error, setError] = useState("");
  const [pair, setPair] = useState<Pair>({
    currency: "",
    criptocurrency: "",
  });

  const cryptoCurrencies = useCryptoStore((state) => state.cryptoCurrencies);
  const fetchData = useCryptoStore((state) => state.fetchData);


  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setError('')
    setPair({
      ...pair,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.values(pair).includes("")) {
      setError("Todos los campos son obligatorios");
      return;
    }
    fetchData(pair)
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <div className="field">
        <label htmlFor="currency">Moneda:</label>
        <select
          onChange={handleChange}
          value={pair.currency}
          name="currency"
          id="currency"
        >
          <option value="">-- Seleccione --</option>
          {currencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.name}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="criptocurrency">Criptomoneda:</label>
        <select
          value={pair.criptocurrency}
          onChange={handleChange}
          name="criptocurrency"
          id="criptocurrency"
        >
          <option value="">-- Seleccione --</option>
          {cryptoCurrencies.map((cryptoCurrency) => (
            <option
              key={cryptoCurrency.CoinInfo.Name}
              value={cryptoCurrency.CoinInfo.Name}
            >
              {cryptoCurrency.CoinInfo.FullName}
            </option>
          ))}
        </select>
      </div>
      <input type="submit" value={"Cotizar"} />
    </form>
  );
};

export default CriptoSearchForm;
