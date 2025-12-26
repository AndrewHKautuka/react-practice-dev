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

export type RegionalScope = "National" | "Regional" | "Local"
export type TemporalScope = "FullDay" | "HalfDay"
export type HolidayType =
  | "Public"
  | "Bank"
  | "Optional"
  | "School"
  | "BackToSchool"
  | "EndOfLessons"

export interface SubdivisionReference {
  code: string
  shortName: string
}

export interface GroupReference {
  code: string
  shortName: string
}

interface BaseHolidayResponse {
  id: string
  startDate: Date
  endDate: Date
  name: LocalizedText[]
  type: HolidayType
  comment?: LocalizedText[]
  regionalScope?: RegionalScope
  temporalScope?: TemporalScope
  tags?: string
  groups?: GroupReference[]
}

export interface NationalHolidayResponse extends BaseHolidayResponse {
  nationwide: true
}

export interface RegionalHolidayResponse extends BaseHolidayResponse {
  nationwide: false
  subdivisions: SubdivisionReference[]
}

export type HolidayResponse = NationalHolidayResponse | RegionalHolidayResponse

export interface PublicHoliday {
  id: string
  date: Date
  name: string
}
