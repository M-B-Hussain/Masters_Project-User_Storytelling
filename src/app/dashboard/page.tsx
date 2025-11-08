'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Dashboard } from '@/components/Dashboard'

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    try {
      const ok = localStorage.getItem('quizCompleted') === 'true'
      if (!ok) {
        router.replace('/')
      }
    } catch {
      router.replace('/')
    }
  }, [router])

  return <Dashboard />
}
