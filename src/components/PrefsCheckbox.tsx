import React, { ChangeEvent } from 'react'
import { CheckedPrefucture } from '../types/resas.d'
import LabeledCheckbox from './LabeledCheckbox'

interface Props {
  value: Array<CheckedPrefucture>
  handleChange: (e: CheckedPrefucture) => void
}

export default function PrefsCheckBox(props: Props) {
  return (
    <div className={'prefuctures-checkbox'}>
      {props.value.map((elm) => (
        <LabeledCheckbox
          key={elm.prefucture.prefCode}
          label={elm.prefucture.prefName}
          value={elm.checked}
          handleChange={(e: ChangeEvent) => {
            props.handleChange({
              prefucture: elm.prefucture,
              checked: !elm.checked
            })
          }}
        />
      ))}
    </div>
  )
}
