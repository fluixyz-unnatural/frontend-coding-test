import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

import PrefsCheckBox from '../components/PrefsCheckbox'
import userEvent from '@testing-library/user-event'
import PrefsPopulationChart from '../components/PrefsPopulationChart'
import PrefsPopulationViewer from '../components/PrefsPopulationViewer'
import { act } from 'react-dom/test-utils'

describe('Component', () => {
  test('renders PrefsCheckbox component', async () => {
    const handleChange = jest.fn()
    render(
      <PrefsCheckBox
        value={[
          {
            prefucture: { prefCode: 0, prefName: 'ラベル県' },
            checked: false
          }
        ]}
        handleChange={handleChange}
      />
    )
    expect(screen.getByLabelText('ラベル県')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('checkbox'))
    expect(handleChange).toHaveBeenCalledTimes(1)
  })
  test('renders empty PrefsPopulationChart', async () => {
    render(<PrefsPopulationChart populations={[]} />)
    expect(screen.getByText('please check prefucture')).toBeInTheDocument()
  })
  test('renders PrefsPopulationChart', async () => {
    render(
      <PrefsPopulationChart
        populations={[
          {
            prefucture: { prefCode: 0, prefName: 'ラベル県' },
            population: [{ year: 100, value: 10 }]
          }
        ]}
      />
    )
    expect(screen.getByText('Highcharts.com')).toBeInTheDocument()
  })
})
