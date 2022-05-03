import React, { ChangeEventHandler } from 'react'
interface Props {
  value: boolean
  label: string
  handleChange: ChangeEventHandler
}
export default function LabeledCheckbox(props: Props) {
  return (
    <div>
      <label>
        <input type="checkbox" checked={props.value} onChange={props.handleChange}></input>
        {props.label}
      </label>
    </div>
  )
}
