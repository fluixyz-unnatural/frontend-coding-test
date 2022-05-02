import React, { ChangeEventHandler } from 'react'
interface Props {
  label: string
  handleChange: ChangeEventHandler
}
export default function LabeledCheckbox(props: Props) {
  return (
    <span>
      <label>
        <input type="checkbox" onChange={props.handleChange}></input>
        {props.label}
      </label>
    </span>
  )
}
