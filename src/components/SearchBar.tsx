import { useState, FormEvent } from "react";

interface Props {
  onSearch: (city: string) => void; // funcion que recibe la ciudad
  disabled?: boolean; 
}

export default function SearchBar({ onSearch, disabled }: Props) {
  const [value, setValue] = useState("");

  const submit = (e: FormEvent) => {
    // limpia la barra
    e.preventDefault();
    const city = value.trim();
    if (city.length === 0) return;
    onSearch(city); // llama a la funcion onSearch con la ciudad
  };

  return (
    <form onSubmit={submit} className="search-bar">
      <input
        type="text"
        placeholder="Escribe una ciudad"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled}
        aria-label="Ciudad"

       // boton de buscar desactivado si no hay texto
      /> 
      <button type="submit" disabled={disabled || value.trim().length === 0}>
        Buscar
      </button>
    </form>
  );
}
