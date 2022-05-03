export interface Prefucture {
  prefCode: number
  prefName: string
}

export interface CheckedPrefucture {
  prefucture: Prefucture
  checked: boolean
}

export interface Population {
  year: number
  value: number
}

export interface PrefsPopulation {
  prefucture: Prefucture
  population: Array<Population>
}
