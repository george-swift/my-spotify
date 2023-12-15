import { Dashboard } from '@/components/ui/dashboard'

export default function DashboardLayout({ children }) {
  return (
    <Dashboard>
      <div className="mt-10 min-h-screen w-full max-w-[1400px] overflow-auto px-6 py-[30px] md:h-full md:px-10 xl:px-[55px] 2xl:p-20">
        {children}
      </div>
    </Dashboard>
  )
}
