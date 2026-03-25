'use client'

import { LoginButton } from './LoginButton'
import { UserProfile } from './UserProfile'
import { useAuth } from '@/contexts/AuthContext'

export function AuthHeader() {
  const { user, loading } = useAuth()

  return (
    <div className="fixed right-0 top-0 z-50 p-4 sm:p-6">
      {loading ? (
        <div className="h-12 w-40 rounded-2xl border border-white/10 bg-white/5 animate-pulse" />
      ) : user ? (
        <UserProfile />
      ) : (
        <LoginButton />
      )}
    </div>
  )
}
