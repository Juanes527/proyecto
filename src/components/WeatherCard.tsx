import { WeatherData } from "../types/weather";

interface Props {
  data: WeatherData;
}
// tarjeta que muestra el clima con la informacion recibida
export default function WeatherCard({ data }: Props) {
  return (
    <div className="weather-card">
      <h2>{data.city}, {data.country}</h2>
      <div className="weather-main">
        <img src={data.iconUrl} alt={data.description} />
        <div className="weather-info">
          <p className="temp">{Math.round(data.temperature)}°C</p>
          <p className="desc">{data.description}</p>
          <p className="hum">Humedad: {data.humidity}%</p>
        </div>
      </div>
    </div>
  );
}
