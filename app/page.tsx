import { Hero } from '@/components/home/Hero'
import { Features } from '@/components/home/Features'
import { QuickActions } from '@/components/home/QuickActions'
import { LiveAlerts } from '@/components/alerts/LiveAlerts'
import { WeatherWidget } from '@/components/weather/WeatherWidget'

export default function Home() {
  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Hero Section */}
      <Hero />

      {/* Live Alerts */}
      <section className="container mx-auto px-3 sm:px-4 lg:px-6">
        <LiveAlerts />
      </section>

      {/* Weather Widget */}
      <section className="container mx-auto px-3 sm:px-4 lg:px-6">
        <WeatherWidget />
      </section>

      {/* Quick Actions */}
      <section className="container mx-auto px-3 sm:px-4 lg:px-6">
        <QuickActions />
      </section>

      {/* Features Overview */}
      <section className="container mx-auto px-3 sm:px-4 lg:px-6">
        <Features />
      </section>
    </div>
  )
}
