import { useEffect, useState, useRef } from 'react'
import { PrefsPopulation, Prefucture } from '../types/areas.d'
import { AREAS_API_URL } from '../utils/config'

// 都道府県の一覧
export function usePrefuctures() {
  const [prefuctures, setPrefuctures] = useState<Array<Prefucture>>([])
  const fetchPrefuctures = async () => {
    const res = await fetch(AREAS_API_URL + '/api/v1/prefectures')
    const data = await res.json()
    setPrefuctures(data.result)
  }
  useEffect(() => {
    fetchPrefuctures()
  }, [setPrefuctures])
  return prefuctures
}

// 都道府県のArrayを受け取って都道府県と人口の一覧を返す
export function usePrefucturePopulation(prefuctures: Array<Prefucture>) {
  const [populations, setPopulations] = useState<Array<PrefsPopulation>>([])
  const populationsRef = useRef(populations)

  useEffect(() => {
    populationsRef.current = populations
  }, [populations])

  // APIを叩いて人口構成を取得し、populationsに追加
  const fetchPopulation = async (prefucture: Prefucture) => {
    const query = new URLSearchParams({
      prefCode: prefucture.prefCode,
      cityCode: '-'
    } as unknown as Record<string, string>)
    const res = await fetch(
      AREAS_API_URL + '/api/v1/population/composition/perYear?' + query
    )
    const data = await res.json()

    setPopulations([
      ...populationsRef.current,
      { prefucture: prefucture, population: data.result.data[0].data }
    ])
  }

  // 都道府県のリストが変わった際の処理
  useEffect(() => {
    // 消えたものを取り除く
    setPopulations(
      populationsRef.current.filter((elm) =>
        prefuctures.map((e) => e.prefCode).includes(elm.prefucture.prefCode)
      )
    )
    // 追加されたものを加える
    prefuctures.forEach((pref) => {
      if (
        !populationsRef.current
          .map((e) => e.prefucture.prefCode)
          .includes(pref.prefCode)
      ) {
        console.log(prefuctures, pref)
        fetchPopulation(pref)
      }
    })
  }, [prefuctures])
  return populations
}
