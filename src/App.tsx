import React, { useEffect, useState } from 'react'
import PrefsCheckBox from './components/PrefsCheckbox'
import { usePrefuctures } from './hooks/areas'
import './style.css'
import { CheckedPrefucture } from './types/areas.d'

function App() {
  const prefs = usePrefuctures()
  const [checked, setChecked] = useState([] as Array<CheckedPrefucture>)
  useEffect(() => {
    setChecked(
      prefs.map((e) => ({
        prefucture: { prefName: e.prefName, prefCode: e.prefCode },
        checked: false
      }))
    )
  }, [prefs])
  useEffect(() => {
    console.log(checked.filter((elm) => elm.checked).map(elm=>elm.prefucture.prefName))
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
    </div>
  )
}

export default App
