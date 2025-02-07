import Timeline from "@/components/timeline/Timeline"
import AuthButton from "@/components/AuthButton"
import { DarkModeToggle } from "@/components/DarkModeToggle"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold">Life Timeline</h1>
        <div className="flex items-center space-x-4">
          <DarkModeToggle />
          <AuthButton />
        </div>
      </div>
      <Timeline />
    </main>
  )
}

