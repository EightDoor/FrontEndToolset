export interface ButtonsType {
  list: ButtonsListType[]
  click: (val: string) => void
  w?: string
  h?: string
  loading?: boolean
}
export interface ButtonsListType {
  title: string
  type?: any
  size?: any
  plain?: boolean
}
export interface ListType {
  title: string
  url?: string
  router?: string
  type?: string
}
