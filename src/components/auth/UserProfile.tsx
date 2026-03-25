'use client'

import React, { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { ChevronDown, LogOut, Sparkles, User as UserIcon } from 'lucide-react'

export function UserProfile() {
  const { user, loading, logout } = useAuth()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  if (loading) {
    return <div className="h-12 w-36 rounded-2xl border border-white/10 bg-white/5 animate-pulse" />
  }

  if (!user) {
    return null // User is not logged in, show login button instead
  }

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true)
      await logout()
      setShowMenu(false)
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-black/45 px-3 py-2 text-left text-white shadow-[0_12px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-400/50"
      >
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt={user.displayName || 'User'}
            className="h-9 w-9 rounded-full border border-white/20 object-cover"
          />
        ) : (
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/8">
            <UserIcon size={18} className="text-violet-200" />
          </div>
        )}
        <div className="hidden min-w-0 sm:block">
          <p className="max-w-32 truncate text-sm font-medium text-white">{user.displayName || 'Profile'}</p>
          <p className="text-xs text-violet-200/80">Personal watchlist</p>
        </div>
        <ChevronDown size={16} className={`text-violet-200/80 transition-transform duration-200 ${showMenu ? 'rotate-180' : ''}`} />
      </button>

      {showMenu && (
        <div className="absolute right-0 top-full z-50 mt-3 w-72 overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(20,14,36,0.98),rgba(10,8,20,0.98))] shadow-[0_24px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.18),transparent_35%),radial-gradient(circle_at_top_left,rgba(139,92,246,0.2),transparent_45%)]" />
          <div className="relative border-b border-white/10 p-4">
            <div className="mb-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-violet-200/70">
              <Sparkles size={12} />
              Signed in
            </div>
            <div className="flex items-center gap-3">
              {user.photoURL ? (
                <img src={user.photoURL} alt={user.displayName || 'User'} className="h-12 w-12 rounded-full border border-white/20 object-cover" />
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/8">
                  <UserIcon size={20} className="text-violet-200" />
                </div>
              )}
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">{user.displayName || 'User'}</p>
                <p className="truncate text-xs text-violet-100/70">{user.email}</p>
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="relative z-10 flex w-full items-center gap-2 px-4 py-3 text-sm text-orange-200 transition-colors hover:bg-white/6 hover:text-orange-100 disabled:opacity-50"
          >
            <LogOut size={18} />
            {isLoggingOut ? 'Signing out...' : 'Sign out'}
          </button>
        </div>
      )}
    </div>
  )
}
