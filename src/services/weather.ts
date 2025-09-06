import { WeatherData } from "../types/weather";

// integracion de la api de openweather

const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY as string;
// consultamos el clima de una ciudad
export async function getWeatherByCity(city: string): Promise<WeatherData> {
  const endpoint = new URL("https://api.openweathermap.org/data/2.5/weather");
  endpoint.searchParams.set("q", city);
  endpoint.searchParams.set("units", "metric");
  endpoint.searchParams.set("lang", "es");
  endpoint.searchParams.set("appid", API_KEY ?? "");
  
  // respuesta del endpoint
  const resp = await fetch(endpoint.toString());

  if (!resp.ok) {
    let message = "Error al consultar el clima.";
    try {
      const errJson = await resp.json();
      if (errJson?.message) message = errJson.message;
    } catch {

    }

    if (resp.status === 404) {
      message = "No encontramos esa ciudad.";
    }
    throw new Error(message);
  }
  // json temporal de la respuesta
  const data = await resp.json();
  const country = data?.sys?.country ?? "";
  const temp = data?.main?.temp;
  const hum = data?.main?.humidity;
  const weather0 = data?.weather?.[0];
  const description = weather0?.description ?? "Sin descripción";
  // icono del clima dependiendo del codigo
  const icon = weather0?.icon ?? "01d";
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  return {
    city: data?.name ?? city,
    country,
    temperature: typeof temp === "number" ? temp : NaN,
    humidity: typeof hum === "number" ? hum : NaN,
    description,
    iconUrl,
  };
}
