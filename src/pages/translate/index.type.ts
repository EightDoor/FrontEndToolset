export namespace TranslateType {
  export interface Data {
    entryText: string
    resultText: TransResult[]
    loading: boolean
  }
  export interface TransResult {
    dst: string
    src: string
  }
}
