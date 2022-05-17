export interface WeaterType {
  status: string
  count: string
  info: string
  infocode: string
  forecasts: ForecastType[]
}
export interface ForecastType {
  city: string
  adcode: string
  province: string
  reporttime: string
  casts: CastType[]
}
export interface CastType {
  date: string
  week: string
  dayweather: string
  nightweather: string
  daytemp: string
  nighttemp: string
  daywind: string
  nightwind: string
  daypower: string
  nightpower: string
}
