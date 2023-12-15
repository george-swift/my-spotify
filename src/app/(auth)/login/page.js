import { LoginButton } from '@/components/ui/buttons'

export const metadata = {
  title: 'Login'
}

export default function LoginPage() {
  return (
    <main className="mx-auto flex h-screen max-w-7xl flex-col items-center justify-center gap-5 p-20">
      <h1 className="text-[36px] font-extrabold tracking-tight">
        My Spotify Profile
      </h1>
      <LoginButton />
    </main>
  )
}
