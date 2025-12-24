export type IsoCode = string

interface CountryName {
  language: IsoCode
  text: string
}

export interface CountryResponse {
  isoCode: IsoCode
  name: CountryName[]
  officialLanguages: IsoCode[]
}

export interface Country {
  isoCode: IsoCode
  name: string
}
