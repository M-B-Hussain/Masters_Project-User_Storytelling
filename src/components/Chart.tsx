'use client'

import dynamic from 'next/dynamic'
import { NoSSR } from './NoSSR'

const Line = dynamic(() => import('react-chartjs-2').then(m => m.Line), { ssr: false })
const Bar = dynamic(() => import('react-chartjs-2').then(m => m.Bar), { ssr: false })
const Doughnut = dynamic(() => import('react-chartjs-2').then(m => m.Doughnut), { ssr: false })


// Chart.js tree-shaking registration
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend)

export function LineChart(props: any) {
  return (
    <NoSSR>
      <Line {...props} />
    </NoSSR>
  )
}

export function BarChart(props: any) {
  return (
    <NoSSR>
      <Bar {...props} />
    </NoSSR>
  )
}

export function DoughnutChart(props: any) {
  return (
    <NoSSR>
      <Doughnut {...props} />
    </NoSSR>
  )
}



