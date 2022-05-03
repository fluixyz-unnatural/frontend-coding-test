import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import React from 'react'
import { PrefsPopulation } from '../types/resas.d'

interface Props {
  populations: Array<PrefsPopulation>
}
export default function PrefsPopulationChart({ populations }: Props) {
  if (populations.length <= 0) return <p>please check prefucture</p>
  const options = {
    title: { text: '' },
    series: populations.map((elm) => {
      return {
        name: elm.prefucture.prefName,
        data: elm.population.map((e) => e.value)
      }
    }),
    xAxis: {
      title: {
        text: '年度',
        align: 'high'
      },
      categories: populations[0].population.map((e) => e.year)
    },
    yAxis: {
      title: {
        text: '人口 (人)',
        align: 'high',
        rotation: '0',
        x: 50,
        y: -30
      }
    },
    legend: {
      align: 'right',
      verticalAlign: 'top',
      layout: 'vertical',
      x: 0,
      y: 50
    },
    chart: {
      margin: [75, 75, 75, 90] // t r b l
    }
  }

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  )
}
