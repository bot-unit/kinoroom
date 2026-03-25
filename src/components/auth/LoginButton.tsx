'use client'

import React, { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { LoaderCircle, Sparkles } from 'lucide-react'

export function LoginButton() {
  const { user, loading, loginWithGoogle, error } = useAuth()
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  if (loading) {
    return <div className="h-12 w-40 rounded-2xl border border-white/10 bg-white/5 animate-pulse" />
  }

  if (user) {
    return null // User is logged in, show profile instead
  }

  const handleLogin = async () => {
    try {
      setIsLoggingIn(true)
      await loginWithGoogle()
    } catch (err) {
      console.error('Login error:', err)
    } finally {
      setIsLoggingIn(false)
    }
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <button
        onClick={handleLogin}
        disabled={isLoggingIn}
        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/45 px-4 py-3 text-sm font-medium text-white shadow-[0_12px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-400/50 hover:shadow-[0_16px_40px_rgba(249,115,22,0.22)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span className="absolute inset-0 bg-linear-to-r from-violet-500/20 via-fuchsia-500/15 to-orange-400/20 opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
        <span className="relative flex items-center gap-3">
          {isLoggingIn ? <LoaderCircle size={18} className="animate-spin" /> : <Sparkles size={18} />}
          {isLoggingIn ? 'Connecting Google...' : 'Continue with Google'}
        </span>
      </button>
      {error && <p className="max-w-64 text-right text-xs text-red-300">{error}</p>}
    </div>
  )
}
