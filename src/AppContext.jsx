import { createContext, useContext, useState } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [language, setLanguage] = useState('en')
  const [query, setQuery] = useState('')
  const [intent, setIntent] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState(null)
  const [location, setLocation] = useState(null)
  const [crop, setCrop] = useState(null)
  const [conversationHistory, setConversationHistory] = useState([])

  const addMessage = (msg) => {
    setConversationHistory(prev => [...prev, msg])
  }

  const resetSession = () => {
    setQuery('')
    setIntent(null)
    setResult(null)
    setImage(null)
    setCrop(null)
  }

  return (
    <AppContext.Provider value={{
      language, setLanguage,
      query, setQuery,
      intent, setIntent,
      result, setResult,
      loading, setLoading,
      image, setImage,
      location, setLocation,
      crop, setCrop,
      conversationHistory, addMessage,
      resetSession,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
