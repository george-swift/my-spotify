import { Navigation } from './nav'

export function Dashboard({ children }) {
  return (
    <div className="h-screen">
      <Navigation />
      <main className="h-full overflow-auto bg-[#1a1a1a] pb-[50px] md:pb-0 md:pl-[100px]">
        {children}
      </main>
    </div>
  )
}
