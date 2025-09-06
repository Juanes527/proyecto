import { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import { getWeatherByCity } from "./services/weather";
import { WeatherData } from "./types/weather";

type Status = "idle" | "loading" | "done" | "error";

export default function App() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<WeatherData | null>(null);

  // Carga ultima ciudad buscada
  useEffect(() => {
    const last = localStorage.getItem("last_city");
    if (last) {
      handleSearch(last);
    }

  }, []);

  async function handleSearch(city: string) {
    try {
      setStatus("loading");
      setError(null);
      const w = await getWeatherByCity(city);
      setData(w);
      setStatus("done");
      localStorage.setItem("last_city", city);
    } catch (e: any) {
      setStatus("error");
      setData(null);
      setError(e?.message ?? "Ocurrio un error desconocido.");
    }
  }

  return (
    <div className="app">
      <header>
        <h1>Weather App</h1>
        <p>Consulta clima en tiempo real</p>
      </header>

      <SearchBar onSearch={handleSearch} disabled={status === "loading"} />

      {status === "loading" && <p className="state">Cargando…</p>}
      {status === "error" && <p className="state error">{error}</p>}
      {status === "done" && data && <WeatherCard data={data} />}

      {status === "idle" && (
        <p className="hint">Escribe una ciudad y presiona buscar.</p>
      )}

      <footer>
        <small>
          Profe no nos tire tan duro porfa, es que apenas vamos empezando :D
        </small>
      </footer>
    </div>
  );
}
