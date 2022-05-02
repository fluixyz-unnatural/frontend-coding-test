import React, { ChangeEvent } from 'react'
import { CheckedPrefucture } from '../types/areas.d'
import LabeledCheckbox from './LabeledCheckbox'

interface Props {
  value: Array<CheckedPrefucture>
  handleChange: (e: CheckedPrefucture) => void
}

export default function PrefsCheckBox(props: Props) {
  return (
    <div className={'prefuctures-checkbox'}>
      {props.value.map((pref) => (
        <LabeledCheckbox
          key={pref.prefucture.prefCode}
          label={pref.prefucture.prefName}
          value={pref.checked}
          handleChange={(e: ChangeEvent) => {
            props.handleChange({
              prefucture: pref.prefucture,
              checked: !pref.checked
            })
          }}
        />
      ))}
    </div>
  )
}
