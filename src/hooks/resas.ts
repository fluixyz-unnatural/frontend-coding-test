import { useEffect, useState, useRef } from 'react'
import { Population, Prefucture } from '../types/resas.d'
import { RESAS_API_KEY, RESAS_API_URL } from '../utils/config'

// 都道府県の一覧
export function usePrefuctures() {
  const [prefuctures, setPrefuctures] = useState<Array<Prefucture>>([])
  useEffect(() => {
    const fetchPrefuctures = async () => {
      fetch(RESAS_API_URL + '/api/v1/prefectures', {
        headers: { 'X-API-KEY': RESAS_API_KEY }
      })
        .then((res) =>
          res
            .json()
            .then((data) => setPrefuctures(data.result))
            .catch((err) => console.error(err))
        )
        .catch((err) => console.error(err))
    }
    fetchPrefuctures()
  }, [setPrefuctures])
  return prefuctures
}

// 都道府県のArrayを受け取って都道府県と人口の一覧を返す
export function usePrefucturePopulation(prefuctures: Array<Prefucture>) {
  const [data, setData] = useState<Array<Array<Population>>>([]) // ここにfetchした人口の情報を入れる。キー(index)はprefCode
  const dataRef = useRef(data)
  useEffect(() => {
    dataRef.current = data
  }, [data])

  // 都道府県のリストが変わった際の処理
  useEffect(() => {
    // APIを叩いて人口構成を取得し、dataに追加
    const fetchPopulation = async (prefucture: Prefucture) => {
      if (dataRef.current[prefucture.prefCode]) return // 取得済みならば何もしない

      const query = new URLSearchParams({
        prefCode: prefucture.prefCode,
        cityCode: '-'
      } as unknown as Record<string, string>)

      fetch(RESAS_API_URL + '/api/v1/population/composition/perYear?' + query, {
        headers: { 'X-API-KEY': RESAS_API_KEY }
      })
        .then((res) =>
          res
            .json()
            .then((json) => {
              const tmp = { ...dataRef.current }
              tmp[prefucture.prefCode] = json.result.data[0].data
              setData(tmp)
            })
            .catch((err) => console.error(err))
        )
        .catch((err) => console.error(err))
    }
    prefuctures.forEach((pref) => fetchPopulation(pref))
  }, [prefuctures, setData])
  return prefuctures.map((pref) => {
    return {
      prefucture: pref,
      population: data[pref.prefCode] || []
    }
  })
}
