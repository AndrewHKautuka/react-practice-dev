import type { Country, CountryResponse, IsoCode } from "./types"

export function mapResponseToCountry(
  response: CountryResponse,
  isoCode: IsoCode
): Country {
  return {
    isoCode: response.isoCode,
    name:
      response.name.find((name) => name.language === isoCode)?.text ??
      response.name?.[0]?.text ??
      "Unknown",
  }
}
