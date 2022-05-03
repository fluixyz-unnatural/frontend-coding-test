import React, { useEffect, useState } from 'react'
import PrefsCheckBox from './components/PrefsCheckbox'
import PrefsPopulationChart from './components/PrefsPopulationChart'
import { usePrefucturePopulation, usePrefuctures } from './hooks/areas'
import './style.css'
import { CheckedPrefucture, Prefucture } from './types/areas.d'

function App() {
  const prefs = usePrefuctures()
  const [checked, setChecked] = useState<Array<CheckedPrefucture>>([])
  const [display, setDisplay] = useState<Array<Prefucture>>([])
  const populations = usePrefucturePopulation(display)
  console.log('population', populations)
  useEffect(() => {
    setChecked(
      prefs.map((e) => ({
        prefucture: { prefName: e.prefName, prefCode: e.prefCode },
        checked: false
      }))
    )
  }, [prefs])
  useEffect(() => {
    console.log(
      checked.filter((elm) => elm.checked).map((elm) => elm.prefucture.prefName)
    )
    setDisplay(
      checked.filter((elm) => elm.checked).map((elm) => elm.prefucture)
    )
  }, [checked])
  return (
    <div>
      <PrefsCheckBox
        value={checked}
        handleChange={(e: CheckedPrefucture) => {
          setChecked(
            [
              ...checked.filter(
                (elm) => elm.prefucture.prefCode !== e.prefucture.prefCode
              ),
              e
            ].sort((a, b) => a.prefucture.prefCode - b.prefucture.prefCode)
          )
          return
        }}
      />
      <PrefsPopulationChart populations={populations} />
      {populations.map((elm) => elm.prefucture.prefName).join(', ')}
    </div>
  )
}

export default App
