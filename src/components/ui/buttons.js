'use client'

import { useState } from 'react'
import { signIn, signOut } from 'next-auth/react'

import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/core/button'

export function LoginButton() {
  const [isLoading, setIsLoading] = useState(false)

  const onClick = () => {
    setIsLoading(true)
    signIn('spotify')
  }

  return (
    <Button
      size="xl"
      variant="success"
      className="h-[54px]"
      text="Log in to Spotify"
      onClick={onClick}
      disabled={isLoading}
    />
  )
}

export function LogoutButton() {
  const onClick = e => {
    e.preventDefault()
    signOut()
  }

  return (
    <Button
      text="Logout"
      onClick={onClick}
      className="mt-3 w-fit py-2.5 text-center text-xs"
    />
  )
}

export function RecommendedPlaylistButton({ createPlaylist }) {
  const [recommendedPlaylistId, setRecommendedPlaylistId] = useState('')
  const [isFollowing, setIsFollowing] = useState(false)

  const handleFollowing = async ({ playlistId, userId }) => {
    try {
      const data = await fetch(
        `/api/playlists?playlistId=${playlistId}&userId=${userId}`
      ).then(res => res.json())
      setRecommendedPlaylistId(playlistId)
      setIsFollowing(data[0])
    } catch {}
  }

  return isFollowing ? (
    <a
      className={cn(
        buttonVariants({ variant: 'success', size: 'sm' }),
        'text-[12px] tracking-[1px] px-6'
      )}
      href={`https://open.spotify.com/playlist/${recommendedPlaylistId}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      Open in Spotify
    </a>
  ) : (
    <Button
      size="sm"
      variant="success"
      className="px-6 text-[12px] tracking-[1px]"
      text="Save to Spotify"
      onClick={async () => {
        const { playlistId, userId } = await createPlaylist()
        handleFollowing({ playlistId, userId })
      }}
    />
  )
}
