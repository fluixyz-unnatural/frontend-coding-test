import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import React from 'react'
import { PrefsPopulation } from '../types/areas.d'

interface Props {
  populations: Array<PrefsPopulation>
}
export default function PrefsPopulationChart({ populations }: Props) {
  if (populations.length <= 0) return <p>please check prefucture</p>
  const options = {
    title: { text: '人口推移' },
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
        text: '人口数 (人)',
        align: 'high',
        rotation: '0'
      }
    },
    legend: {
      align: 'right',
      verticalAlign: 'top',
      layout: 'vertical',
      x: 0,
      y: 50
    }
  }

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  )
}
