'use client'
import React, { useState } from 'react'
import { AlertComponent } from '@/components/Alert'
export type AlertContentProps = {
  alert: Function
}

export const AlertContext = React.createContext<AlertContentProps>({
  alert: () => {},
})

export type ProviderProps = {
  children?: React.ReactNode
}
export const AlertContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const [alertMessage, setAlertMessage] = useState<string>('')
  const [alertIsOpen, setAlertIsOpen] = useState<boolean>(false)
  const [alertType, setAlertType] = useState<string>('warning')

  function alert(message: string, type?: string) {
    setAlertMessage(message)
    setAlertIsOpen(true)
    setAlertType(type || 'warning')
  }

  return (
    <AlertContext.Provider value={{ alert }}>
      {children}
      <AlertComponent
        isOpen={alertIsOpen}
        message={alertMessage}
        onClose={() => setAlertIsOpen(false)}
        type={alertType}
      />
    </AlertContext.Provider>
  )
}
