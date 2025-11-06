'use client'

import { useEffect, useMemo, useState } from 'react'
import { latestDestatisRail } from '@/data/destatis-rail-incidents'
import { fetchPunctualitySeries } from '@/lib/github'
import { LineChart, BarChart, DoughnutChart } from './Chart'

interface TabItem {
  id: string
  label: string
  icon: string
}

interface VerticalTabBarProps {
  className?: string
  activeTab?: string
  onTabChange?: (tabId: string) => void
}

export function VerticalTabBar({ className = '', activeTab = 'punctuality', onTabChange }: VerticalTabBarProps) {

  const tabs: TabItem[] = [
    { id: 'punctuality', label: 'Punctuality', icon: '🚄' },
    { id: 'multimodal', label: 'Multi Modal', icon: '🚌' },
    { id: 'environmental', label: 'Environmental Problems', icon: '🌱' },
    { id: 'incidents', label: 'Incidents', icon: '⚠️' },
    { id: 'congestion', label: 'Congestion', icon: '🚦' }
  ]

  return (
    <div className={`flex flex-col space-y-2 ${className}`} suppressHydrationWarning>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange?.(tab.id)}
          className={`
            flex items-center space-x-3 px-4 py-3 text-left transition-all duration-300 rounded-lg
            ${activeTab === tab.id
              ? 'bg-db-light-green text-white shadow-lg'
              : 'bg-white dark:bg-gray-800 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
            }
          `}
          suppressHydrationWarning
        >
          <span className="text-lg" suppressHydrationWarning>{tab.icon}</span>
          <span className="font-medium font-roboto" suppressHydrationWarning>{tab.label}</span>
          {activeTab === tab.id && (
            <div className="ml-auto w-2 h-2 bg-white rounded-full" suppressHydrationWarning></div>
          )}
        </button>
      ))}
    </div>
  )
}

// Content components for each tab
export function PunctualityContent() {
  const [series, setSeries] = useState<{ date: string; punctualityPct: number }[]>([])

  useEffect(() => {
    fetchPunctualitySeries().then(setSeries)
  }, [])

  const latest = useMemo(() => series[series.length - 1], [series])
  const previous = useMemo(() => series[series.length - 2], [series])
  const deltaPct = useMemo(() => {
    if (!latest || !previous) return undefined
    return Number((latest.punctualityPct - previous.punctualityPct).toFixed(1))
  }, [latest, previous])

  return (
    <div className="space-y-6" suppressHydrationWarning>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg" suppressHydrationWarning>
        <h3 className="text-xl font-semibold font-inter text-black dark:text-white mb-4">
          Punctuality Overview (GitHub)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4" suppressHydrationWarning>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg" suppressHydrationWarning>
            <div className="text-2xl font-bold text-db-light-green" suppressHydrationWarning>
              {latest ? `${latest.punctualityPct.toFixed(1)}%` : '—'}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400" suppressHydrationWarning>On-time Performance (latest)</div>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg" suppressHydrationWarning>
            <div className="text-2xl font-bold text-db-dark-green" suppressHydrationWarning>
              {deltaPct === undefined ? '—' : `${deltaPct > 0 ? '+' : ''}${deltaPct}%`}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400" suppressHydrationWarning>vs previous month</div>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg" suppressHydrationWarning>
            <div className="text-2xl font-bold text-gray-900 dark:text-white" suppressHydrationWarning>
              {latest ? latest.date : '—'}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400" suppressHydrationWarning>as of</div>
          </div>
        </div>
        <p className="mt-3 text-xs text-gray-500 dark:text-gray-400" suppressHydrationWarning>
          Source: GitHub dataset inspired by piebro/deutsche-bahn-statistics and linked data repo
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg" suppressHydrationWarning>
        <h3 className="text-xl font-semibold font-inter text-black dark:text-white mb-4">
          Punctuality Trends
        </h3>
        <div className="h-64" suppressHydrationWarning>
          <LineChart
            data={{
              labels: series.map(p => p.date),
              datasets: [
                {
                  label: 'On-time %',
                  data: series.map(p => p.punctualityPct),
                  borderColor: '#22c55e',
                  backgroundColor: 'rgba(34,197,94,0.2)'
                }
              ]
            }}
            options={{
              responsive: true,
              plugins: { legend: { display: true }, tooltip: { enabled: true } },
              scales: { y: { beginAtZero: false, ticks: { callback: (v: any) => `${v}%` } } }
            }}
          />
        </div>
      </div>
    </div>
  )
}

export function MultiModalContent() {
  return (
    <div className="space-y-6" suppressHydrationWarning>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg" suppressHydrationWarning>
        <h3 className="text-xl font-semibold font-inter text-black dark:text-white mb-4">
          Multi-Modal Transportation
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" suppressHydrationWarning>
          <div className="space-y-4" suppressHydrationWarning>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg" suppressHydrationWarning>
              <span className="font-medium" suppressHydrationWarning>🚄 Train Connections</span>
              <span className="text-db-light-green font-bold" suppressHydrationWarning>85%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg" suppressHydrationWarning>
              <span className="font-medium" suppressHydrationWarning>🚌 Bus Integration</span>
              <span className="text-db-light-green font-bold" suppressHydrationWarning>72%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg" suppressHydrationWarning>
              <span className="font-medium" suppressHydrationWarning>🚗 Car Sharing</span>
              <span className="text-db-light-green font-bold" suppressHydrationWarning>68%</span>
            </div>
          </div>
          <div className="h-48" suppressHydrationWarning>
            <BarChart
              data={{
                labels: ['Train','Bus','Car Sharing'],
                datasets: [{
                  label: 'Integration %',
                  data: [85,72,68],
                  backgroundColor: ['#22c55e','#10b981','#84cc16']
                }]
              }}
              options={{ responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, max: 100 } } }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export function EnvironmentalContent() {
  return (
    <div className="space-y-6" suppressHydrationWarning>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg" suppressHydrationWarning>
        <h3 className="text-xl font-semibold font-inter text-black dark:text-white mb-4">
          Environmental Impact
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4" suppressHydrationWarning>
          <div className="md:col-span-1 col-span-1 p-4" suppressHydrationWarning>
            <DoughnutChart
              data={{
                labels: ['CO2 Reduction','Electric Trains','Renewables'],
                datasets: [{ data: [15, 92, 78], backgroundColor: ['#16a34a','#06b6d4','#f59e0b'] }]
              }}
              options={{ plugins: { legend: { position: 'bottom' } } }}
            />
          </div>
          <div className="col-span-2 grid grid-cols-1 gap-4" suppressHydrationWarning>
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg" suppressHydrationWarning>
              <div className="text-2xl font-bold text-green-600" suppressHydrationWarning>-15%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400" suppressHydrationWarning>CO2 Emissions</div>
            </div>
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg" suppressHydrationWarning>
              <div className="text-2xl font-bold text-blue-600" suppressHydrationWarning>92%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400" suppressHydrationWarning>Electric Trains</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg" suppressHydrationWarning>
              <div className="text-2xl font-bold text-yellow-600" suppressHydrationWarning>78%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400" suppressHydrationWarning>Renewable Energy</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg" suppressHydrationWarning>
        <h3 className="text-xl font-semibold font-inter text-black dark:text-white mb-4">
          Sustainability Initiatives
        </h3>
        <div className="space-y-3" suppressHydrationWarning>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg" suppressHydrationWarning>
            <span className="text-green-500" suppressHydrationWarning>✅</span>
            <span suppressHydrationWarning>Green energy procurement program</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg" suppressHydrationWarning>
            <span className="text-green-500" suppressHydrationWarning>✅</span>
            <span suppressHydrationWarning>Biodiversity protection measures</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg" suppressHydrationWarning>
            <span className="text-green-500" suppressHydrationWarning>✅</span>
            <span suppressHydrationWarning>Waste reduction initiatives</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function IncidentsContent() {
  return (
    <div className="space-y-6" suppressHydrationWarning>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg" suppressHydrationWarning>
        <h3 className="text-xl font-semibold font-inter text-black dark:text-white mb-4">
          Railway Accidents and Casualties (Destatis, 2022)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4" suppressHydrationWarning>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg" suppressHydrationWarning>
            <div className="text-sm text-gray-600 dark:text-gray-400" suppressHydrationWarning>Accidents with injury</div>
            <div className="text-2xl font-bold text-db-light-green" suppressHydrationWarning>{latestDestatisRail.accidentsInvolvingPersonalInjury}</div>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg" suppressHydrationWarning>
            <div className="text-sm text-gray-600 dark:text-gray-400" suppressHydrationWarning>Total casualties</div>
            <div className="text-2xl font-bold text-db-light-green" suppressHydrationWarning>{latestDestatisRail.casualties.total}</div>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg" suppressHydrationWarning>
            <div className="text-sm text-gray-600 dark:text-gray-400" suppressHydrationWarning>Persons killed</div>
            <div className="text-2xl font-bold text-db-red" suppressHydrationWarning>{latestDestatisRail.personsKilled.total}</div>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg" suppressHydrationWarning>
            <div className="text-sm text-gray-600 dark:text-gray-400" suppressHydrationWarning>Seriously injured</div>
            <div className="text-2xl font-bold text-yellow-600" suppressHydrationWarning>{latestDestatisRail.personsSeriouslyInjured.total}</div>
          </div>
        </div>
        <div className="mt-6 h-56" suppressHydrationWarning>
          <BarChart
            data={{
              labels: ['Accidents','Killed','Serious Injuries','Slight Injuries'],
              datasets: [{
                label: 'Count (2022)',
                data: [
                  latestDestatisRail.accidentsInvolvingPersonalInjury,
                  latestDestatisRail.personsKilled.total,
                  latestDestatisRail.personsSeriouslyInjured.total,
                  latestDestatisRail.personsSlightlyInjured.total
                ],
                backgroundColor: ['#64748b','#ef4444','#f59e0b','#22c55e']
              }]
            }}
            options={{ responsive: true, plugins: { legend: { display: false } } }}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4" suppressHydrationWarning>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg" suppressHydrationWarning>
            <div className="text-sm text-gray-600 dark:text-gray-400" suppressHydrationWarning>Passengers casualties</div>
            <div className="text-xl font-bold text-db-light-green" suppressHydrationWarning>{latestDestatisRail.casualties.passengers}</div>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg" suppressHydrationWarning>
            <div className="text-sm text-gray-600 dark:text-gray-400" suppressHydrationWarning>Railway staff casualties</div>
            <div className="text-xl font-bold text-db-light-green" suppressHydrationWarning>{latestDestatisRail.casualties.railwayStaff}</div>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg" suppressHydrationWarning>
            <div className="text-sm text-gray-600 dark:text-gray-400" suppressHydrationWarning>Other persons casualties</div>
            <div className="text-xl font-bold text-db-light-green" suppressHydrationWarning>{latestDestatisRail.casualties.otherPersons}</div>
          </div>
        </div>
        <p className="mt-3 text-xs text-gray-500 dark:text-gray-400" suppressHydrationWarning>
          Source: Destatis – Accidents and casualties in railway transport (as at 14 Nov 2023)
        </p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg" suppressHydrationWarning>
        <h3 className="text-xl font-semibold font-inter text-black dark:text-white mb-4">
          Incident Management
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" suppressHydrationWarning>
          <div className="space-y-4" suppressHydrationWarning>
            <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg" suppressHydrationWarning>
              <span className="font-medium" suppressHydrationWarning>🚨 Critical Incidents</span>
              <span className="text-red-600 font-bold" suppressHydrationWarning>12</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg" suppressHydrationWarning>
              <span className="font-medium" suppressHydrationWarning>⚠️ Minor Issues</span>
              <span className="text-yellow-600 font-bold" suppressHydrationWarning>47</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg" suppressHydrationWarning>
              <span className="font-medium" suppressHydrationWarning>✅ Resolved</span>
              <span className="text-green-600 font-bold" suppressHydrationWarning>156</span>
            </div>
          </div>
          <div className="h-48 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center" suppressHydrationWarning>
            <span className="text-gray-500 dark:text-gray-400" suppressHydrationWarning>Incident timeline visualization</span>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg" suppressHydrationWarning>
        <h3 className="text-xl font-semibold font-inter text-black dark:text-white mb-4">
          Recent Incidents
        </h3>
        <div className="space-y-3" suppressHydrationWarning>
          <div className="p-3 border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20 rounded-r-lg" suppressHydrationWarning>
            <div className="font-medium" suppressHydrationWarning>Signal failure at Munich Central</div>
            <div className="text-sm text-gray-600 dark:text-gray-400" suppressHydrationWarning>2 hours ago • 15 min delay</div>
          </div>
          <div className="p-3 border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 rounded-r-lg" suppressHydrationWarning>
            <div className="font-medium" suppressHydrationWarning>Weather disruption in Hamburg</div>
            <div className="text-sm text-gray-600 dark:text-gray-400" suppressHydrationWarning>4 hours ago • 8 min delay</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function CongestionContent() {
  return (
    <div className="space-y-6" suppressHydrationWarning>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg" suppressHydrationWarning>
        <h3 className="text-xl font-semibold font-inter text-black dark:text-white mb-4">
          Traffic Congestion Analysis
        </h3>
        <div className="h-56" suppressHydrationWarning>
          <BarChart
            data={{
              labels: ['Peak','Off-Peak','Night'],
              datasets: [{ label: 'Congestion Level', data: [90, 60, 30], backgroundColor: ['#ef4444','#f59e0b','#22c55e'] }]
            }}
            options={{ responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, max: 100 } } }}
          />
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg" suppressHydrationWarning>
        <h3 className="text-xl font-semibold font-inter text-black dark:text-white mb-4">
          Congestion Hotspots
        </h3>
        <div className="space-y-3" suppressHydrationWarning>
          <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg" suppressHydrationWarning>
            <span className="font-medium" suppressHydrationWarning>🚦 Frankfurt Central</span>
            <span className="text-red-600 font-bold" suppressHydrationWarning>85% capacity</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg" suppressHydrationWarning>
            <span className="font-medium" suppressHydrationWarning>🚦 Cologne Central</span>
            <span className="text-yellow-600 font-bold" suppressHydrationWarning>72% capacity</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg" suppressHydrationWarning>
            <span className="font-medium" suppressHydrationWarning>🚦 Stuttgart Central</span>
            <span className="text-green-600 font-bold" suppressHydrationWarning>58% capacity</span>
          </div>
        </div>
      </div>
    </div>
  )
}
