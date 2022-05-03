import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import PrefsCheckBox from './components/PrefsCheckbox'
import PrefsPopulationChart from './components/PrefsPopulationChart'
import { usePrefucturePopulation, usePrefuctures } from './hooks/resas'
import './style.css'
import { CheckedPrefucture, Prefucture } from './types/resas.d'

function App() {
  const prefs = usePrefuctures()
  const [checked, setChecked] = useState<Array<CheckedPrefucture>>([])
  const [display, setDisplay] = useState<Array<Prefucture>>([])
  const populations = usePrefucturePopulation(display)
  useEffect(() => {
    setChecked(
      prefs.map((e) => ({
        prefucture: { prefName: e.prefName, prefCode: e.prefCode },
        checked: false
      }))
    )
  }, [prefs])
  return (
    <div>
      <Header />
      <section className={'container'}>
        <h4>都道府県</h4>
        <div className={'checkbox-container'}>
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
              if (e.checked) {
                setDisplay([...display, e.prefucture])
              } else {
                setDisplay(
                  display.filter(
                    (pref) => pref.prefCode !== e.prefucture.prefCode
                  )
                )
              }
              return
            }}
          />
        </div>
        <PrefsPopulationChart populations={populations} />
      </section>
    </div>
  )
}

export default App
