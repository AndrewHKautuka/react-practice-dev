export type IsoCode = string

interface LocalizedText {
  language: IsoCode
  text: string
}

export interface CountryResponse {
  isoCode: IsoCode
  name: LocalizedText[]
  officialLanguages: IsoCode[]
}

export interface Country {
  isoCode: IsoCode
  name: string
}
