import { useState } from "react"

import "./App.css"
import { DEFAULT_COUNTRY_ISO_CODE } from "./constants"
import { useCountries } from "./data/use-countries"
import type { IsoCode } from "./types"

function App() {
  const { data: countries } = useCountries()

  const [selectedCountry, setSelectedCountry] = useState<IsoCode>(
    DEFAULT_COUNTRY_ISO_CODE
  )

  return (
    <main>
      <select
        disabled={!countries}
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value as IsoCode)}
      >
        {!countries ? (
          <option value={selectedCountry}>Loading Countries...</option>
        ) : (
          countries?.map((country) => (
            <option
              id={`select-option-${country.isoCode}`}
              key={country.isoCode}
              value={country.isoCode}
            >
              {country.name}
            </option>
          ))
        )}
      </select>
    </main>
  )
}

export default App
