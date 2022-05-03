import React, { useEffect, useState } from 'react'
import { usePrefucturePopulation, usePrefuctures } from '../hooks/resas'
import { CheckedPrefucture, Prefucture } from '../types/resas.d'
import PrefsCheckBox from './PrefsCheckbox'
import PrefsPopulationChart from './PrefsPopulationChart'

export default function PrefsPopulationViewer() {
  const prefs = usePrefuctures()
  const [checked, setChecked] = useState<Array<CheckedPrefucture>>([])
  // highchartsは要素にkeyを振れないため、リストの真ん中に要素を加えると凡例と色の対応が変わってしまう
  // それを防ぐために順序を維持する必要があり、そのためにchecked とは別に管理する
  const [display, setDisplay] = useState<Array<Prefucture>>([])
  const populations = usePrefucturePopulation(display)
  useEffect(() => {
    setChecked(
      prefs
        .map((e) => ({
          prefucture: { prefName: e.prefName, prefCode: e.prefCode },
          checked: false
        }))
        .sort((a, b) => a.prefucture.prefCode - b.prefucture.prefCode)
    )
  }, [prefs])
  return (
    <>
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
              // 表示リストに追加
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
    </>
  )
}
