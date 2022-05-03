import { useEffect, useState, useRef } from 'react'
import { Population, Prefucture } from '../types/resas.d'
import { RESAS_API_KEY, RESAS_API_URL } from '../utils/config'

// 都道府県の一覧
export function usePrefuctures() {
  const [prefuctures, setPrefuctures] = useState<Array<Prefucture>>([])
  const fetchPrefuctures = async () => {
    const res = await fetch(RESAS_API_URL + '/api/v1/prefectures', {
      headers: { 'X-API-KEY': RESAS_API_KEY }
    })
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
  const [data, setData] = useState<Array<Array<Population>>>([]) // ここにメモ化みたいなやつをする
  const dataRef = useRef(data)
  useEffect(() => {
    dataRef.current = data
  }, [data])

  // 都道府県のリストが変わった際の処理
  useEffect(() => {
    // APIを叩いて人口構成を取得し、populationsに追加
    const fetchPopulation = async (prefucture: Prefucture) => {
      if (dataRef.current[prefucture.prefCode]) return
      const query = new URLSearchParams({
        prefCode: prefucture.prefCode,
        cityCode: '-'
      } as unknown as Record<string, string>)
      const res = await fetch(
        RESAS_API_URL + '/api/v1/population/composition/perYear?' + query,
        {
          headers: { 'X-API-KEY': RESAS_API_KEY }
        }
      )
      const json = await res.json()
      const tmp = { ...dataRef.current }
      tmp[prefucture.prefCode] = json.result.data[0].data
      setData(tmp)
    }
    prefuctures.forEach((pref) => fetchPopulation(pref))
  }, [prefuctures, setData])
  const populations = prefuctures.map((pref) => {
    return {
      prefucture: pref,
      population: data[pref.prefCode] || []
    }
  })
  return populations
}
