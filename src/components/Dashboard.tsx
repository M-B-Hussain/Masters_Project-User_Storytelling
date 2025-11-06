'use client'

import { useState } from 'react'
import Image from 'next/image'
import { VerticalTabBar, PunctualityContent, MultiModalContent, EnvironmentalContent, IncidentsContent, CongestionContent } from './VerticalTabBar'

interface MetricCardProps {
  title: string
  value: string
  change: string
  changeType: 'positive' | 'negative' | 'neutral'
  icon?: string
}

export function MetricCard({ title, value, change, changeType, icon }: MetricCardProps) {
  const changeColor = {
    positive: 'text-db-green',
    negative: 'text-db-red',
    neutral: 'text-gray-500'
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300" suppressHydrationWarning>
      <div className="flex items-center justify-between mb-4" suppressHydrationWarning>
        <h3 className="text-lg font-semibold font-inter text-black dark:text-white">{title}</h3>
        {icon && (
          <div className="w-8 h-8 bg-db-light-green rounded-full flex items-center justify-center" suppressHydrationWarning>
            <span className="text-white text-sm">📊</span>
          </div>
        )}
      </div>
      <div className="text-3xl font-bold font-inter text-black dark:text-white mb-2" suppressHydrationWarning>{value}</div>
      <div className={`text-sm font-inter ${changeColor[changeType]}`} suppressHydrationWarning>{change}</div>
    </div>
  )
}

export function Dashboard() {
  const [activeTab, setActiveTab] = useState('punctuality')

  const metrics = [
    {
      title: 'Punctuality Rate',
      value: '75.2%',
      change: '+2.1% from last month',
      changeType: 'positive' as const,
      icon: '🚄'
    },
    {
      title: 'Average Delay',
      value: '7.3 min',
      change: '-0.8 min from last month',
      changeType: 'positive' as const,
      icon: '⏰'
    },
    {
      title: 'Compensation Paid',
      value: '€197M',
      change: '+48% from last year',
      changeType: 'negative' as const,
      icon: '💰'
    },
    {
      title: 'Infrastructure Issues',
      value: '80%',
      change: 'Main cause of delays',
      changeType: 'neutral' as const,
      icon: '🔧'
    }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'punctuality':
        return <PunctualityContent />
      case 'multimodal':
        return <MultiModalContent />
      case 'environmental':
        return <EnvironmentalContent />
      case 'incidents':
        return <IncidentsContent />
      case 'congestion':
        return <CongestionContent />
      default:
        return <PunctualityContent />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6" suppressHydrationWarning>
      <div className="max-w-7xl mx-auto" suppressHydrationWarning>
        {/* Header */}
        <div className="mb-8" suppressHydrationWarning>
          <h1 className="text-4xl font-bold font-inter text-black dark:text-white mb-2">
            Deutsche Bahn Dashboard
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Real-time metrics and performance indicators
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" suppressHydrationWarning>
          {metrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>

        {/* Main Content with Vertical Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6" suppressHydrationWarning>
          {/* Vertical Tab Bar */}
          <div className="lg:col-span-1" suppressHydrationWarning>
            <div className="sticky top-6" suppressHydrationWarning>
              <h2 className="text-xl font-bold font-inter text-black dark:text-white mb-4">
                Analytics Categories
              </h2>
              <VerticalTabBar 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
              />
            </div>
          </div>

          {/* Tab Content */}
          <div className="lg:col-span-3" suppressHydrationWarning>
            {renderTabContent()}
          </div>
        </div>

        {/* Original Charts Section - Keep for reference */}
        <div className="mt-8" suppressHydrationWarning>
          <h2 className="text-2xl font-bold font-inter text-black dark:text-white mb-6">
            Historical Data Overview
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" suppressHydrationWarning>
            {/* Punctuality Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg" suppressHydrationWarning>
              <h3 className="text-xl font-semibold font-inter text-black dark:text-white mb-4">
                Punctuality Trends
              </h3>
              <div className="flex justify-center" suppressHydrationWarning>
                <Image
                  src="/images/punctuality-chart.png"
                  alt="Punctuality Chart"
                  width={500}
                  height={300}
                  className="rounded-lg"
                />
              </div>
            </div>

            {/* Delay Causes Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg" suppressHydrationWarning>
              <h3 className="text-xl font-semibold font-inter text-black dark:text-white mb-4">
                Delay Causes Distribution
              </h3>
              <div className="flex justify-center" suppressHydrationWarning>
                <Image
                  src="/images/pie-chart.png"
                  alt="Delay Causes Pie Chart"
                  width={400}
                  height={300}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Additional Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6" suppressHydrationWarning>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg" suppressHydrationWarning>
              <h3 className="text-xl font-semibold font-inter text-black dark:text-white mb-4">
                Compensation Trends
              </h3>
              <div className="flex justify-center" suppressHydrationWarning>
                <Image
                  src="/images/chart-1.png"
                  alt="Compensation Chart"
                  width={500}
                  height={300}
                  className="rounded-lg"
                />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg" suppressHydrationWarning>
              <h3 className="text-xl font-semibold font-inter text-black dark:text-white mb-4">
                Infrastructure Analysis
              </h3>
              <div className="flex justify-center" suppressHydrationWarning>
                <Image
                  src="/images/chart-2.png"
                  alt="Infrastructure Chart"
                  width={500}
                  height={300}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
