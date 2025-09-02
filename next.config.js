/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/api\.openweathermap\.org\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'weather-cache',
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: 300, // 5 minutes
        },
      },
    },
    {
      urlPattern: /^https:\/\/earthquake\.usgs\.gov\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'earthquake-cache',
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: 300, // 5 minutes
        },
      },
    },
  ],
})

const nextConfig = {
  images: {
    domains: ['openweathermap.org', 'via.placeholder.com'],
  },
  env: {
    // Expose to the browser for client-side requests
    NEXT_PUBLIC_OPENWEATHER_API_KEY: process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY,
    // Keep server-only version available if needed server-side
    OPENWEATHER_API_KEY: process.env.OPENWEATHER_API_KEY,
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
    AI_API_KEY: process.env.AI_API_KEY,
  },
}

module.exports = withPWA(nextConfig)
