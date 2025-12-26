import { useState } from "react"

import { format, getYear } from "date-fns"

import "./App.css"
import { DEFAULT_COUNTRY_ISO_CODE } from "./constants"
import { useCountries } from "./data/use-countries"
import { usePublicHolidays } from "./data/use-public-holidays"
import type { IsoCode } from "./types"

function App() {
  const [selectedCountry, setSelectedCountry] = useState<IsoCode>(
    DEFAULT_COUNTRY_ISO_CODE
  )

  const year = getYear(Date())

  return (
    <main>
      <CountrySelect
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
      />

      <PublicHolidayList selectedCountry={selectedCountry} year={year} />
    </main>
  )
}

interface CountrySelectProps {
  selectedCountry: IsoCode
  setSelectedCountry: (country: IsoCode) => void
}

function CountrySelect({
  selectedCountry,
  setSelectedCountry,
}: CountrySelectProps) {
  const { data: countries } = useCountries()

  return (
    <select
      id="country-select"
      disabled={!countries}
      value={selectedCountry}
      onChange={(e) => setSelectedCountry(e.target.value as IsoCode)}
    >
      {!countries ? (
        <option value={selectedCountry}>Loading Countries...</option>
      ) : (
        countries?.map((country) => (
          <option
            id={`country-select-option-${country.isoCode}`}
            key={country.isoCode}
            value={country.isoCode}
          >
            {country.name}
          </option>
        ))
      )}
    </select>
  )
}

interface PublicHolidayProps {
  selectedCountry: IsoCode
  year: number
}

function PublicHolidayList({ selectedCountry, year }: PublicHolidayProps) {
  const { data: publicHolidays } = usePublicHolidays(selectedCountry, year)

  return !publicHolidays ? (
    <p className="holiday-list-loading">Loading Public Holidays...</p>
  ) : (
    <ul className="holiday-list">
      {publicHolidays.map((holiday) => (
        <li key={holiday.id}>
          {format(holiday.date, "d MMMM")} - {holiday.name}
        </li>
      ))}
    </ul>
  )
}

export default App
