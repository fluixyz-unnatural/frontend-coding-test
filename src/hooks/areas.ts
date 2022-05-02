import { useEffect, useState } from 'react'
import { Prefucture } from '../types/areas.d'
import { AREAS_API_URL } from '../utils/config'

export function usePrefuctures() {
  const [prefuctures, setPrefuctures] = useState([] as Array<Prefucture>)
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
