'use client'
import { ReactNode, useRef } from 'react'
import { Provider } from 'react-redux'
import store from './Redux/store'

interface StoreProviderProps {
  children: ReactNode
}

export default function StoreProvider({ children }: StoreProviderProps) {
  const storeRef = useRef<typeof store | null>(null)

  if (!storeRef.current) {
    // Use the existing store instance
    storeRef.current = store
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}