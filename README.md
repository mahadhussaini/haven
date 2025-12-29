# 🏠 Haven - Disaster & Climate Resilience Platform

[![Next.js](https://img.shields.io/badge/Next.js-14.0.4-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.6-38B2AC)](https://tailwindcss.com/)
[![Jest](https://img.shields.io/badge/Jest-29.7.0-C21325)](https://jestjs.io/)
[![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8)](https://web.dev/progressive-web-apps/)

An AI-powered web application that helps individuals, communities, and organizations prepare for, respond to, and recover from natural disasters and climate challenges.

## 🚀 Features

### Core Functionality
- **🔔 Real-time Alerts**: Live disaster alerts and climate trends from multiple sources
- **🤖 AI Risk Assessment**: Location-based vulnerability analysis with personalized recommendations
- **📍 Resource Finder**: Map-based search for nearby shelters, hospitals, and emergency services
- **📱 Emergency Response**: AI-generated step-by-step action plans for disaster scenarios
- **🌱 Climate Toolkit**: Sustainability recommendations and climate adaptation strategies
- **👥 Community Hub**: Knowledge sharing, emergency communication, and volunteer coordination
- **📴 Offline Mode**: Essential survival information available without internet connectivity

### Technical Features
- **Progressive Web App (PWA)**: Installable on mobile devices with offline capabilities
- **Responsive Design**: Mobile-first approach with accessibility features
- **Real-time Data**: Integration with OpenWeatherMap, USGS, NASA Earth Data, and other APIs
- **AI Integration**: OpenAI-powered emergency plans, risk assessments, and resilience recommendations
- **Multi-language Support**: Framework for internationalization
- **Push Notifications**: Browser and SMS/email integration (extensible)

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Query** - Data fetching and caching
- **Zustand** - State management
- **Leaflet** - Interactive maps
- **Recharts** - Data visualization

### Backend & APIs
- **OpenWeatherMap API** - Weather data and forecasts
- **USGS Earthquake API** - Seismic activity monitoring
- **NASA Earth Data** - Climate and environmental data
- **OpenStreetMap** - Geocoding and mapping services

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Jest** - Testing framework
- **React Testing Library** - Component testing
- **Husky** - Git hooks
- **Next PWA** - Progressive Web App support

## 📦 Installation

### Prerequisites
- Node.js 18.x or later
- npm or yarn package manager
- Git

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/haven.git
   cd haven
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your API keys:
   ```env
   # OpenWeatherMap API Key - Required for weather data
   # Get your API key from: https://openweathermap.org/api
   NEXT_PUBLIC_OPENWEATHER_API_KEY=your_openweather_api_key_here

   # OpenAI API Key - Required for AI-powered features
   # Get your API key from: https://platform.openai.com/api-keys
   OPENAI_API_KEY=your_openai_api_key_here

   # Google Maps API Key - Optional, for enhanced map features
   # Get your API key from: https://console.cloud.google.com/google/maps-apis
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
   ```

   ### API Key Setup Details

   #### OpenAI API Key (Required for AI Features)
   1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
   2. Sign in or create an account
   3. Navigate to API Keys section
   4. Click "Create new secret key"
   5. Copy the generated key and paste it in your `.env.local` file
   6. **Important**: Never commit API keys to version control

   #### OpenWeatherMap API Key (Required for Weather Data)
   1. Visit [OpenWeatherMap](https://openweathermap.org/api)
   2. Sign up for a free account
   3. Verify your email and log in
   4. Go to API Keys section in your dashboard
   5. Copy your API key to the `.env.local` file

   #### Google Maps API Key (Optional)
   1. Visit [Google Cloud Console](https://console.cloud.google.com/google/maps-apis)
   2. Create a new project or select existing one
   3. Enable required APIs (Maps JavaScript API, Places API)
   4. Create credentials (API Key)
   5. Restrict the API key for security (recommended)

4. **Development Server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🧪 Testing

### Run Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Test Structure
```
__tests__/
├── components/
│   ├── common/
│   ├── home/
│   └── ...
├── lib/
├── store/
└── utils/
```

## 🚀 Deployment

### Build for Production
```bash
# Build the application
npm run build

# Start production server
npm start
```

### Deploy to Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Variables for Production

When deploying to production platforms, configure these environment variables:

#### Vercel Deployment
```bash
# Set environment variables in Vercel dashboard or via CLI
vercel env add NEXT_PUBLIC_OPENWEATHER_API_KEY
vercel env add OPENAI_API_KEY
vercel env add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
```

#### Netlify Deployment
```bash
# Set in Netlify dashboard under Site Settings > Environment Variables
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key
OPENAI_API_KEY=your_api_key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key
```

#### Docker Deployment
```env
# .env file for Docker
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key
OPENAI_API_KEY=your_api_key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key
```

#### Security Notes
- **Never commit API keys** to version control
- Use different API keys for development and production
- Regularly rotate your API keys
- Monitor API usage to prevent unexpected charges
- Set up billing alerts on your OpenAI account

## 🎨 Branding & Customization

### Logo
The application includes a custom SVG logo located at `public/logo.svg` featuring:
- **Shield**: Represents protection and safety
- **Leaf**: Symbolizes climate and nature
- **Alert Triangle**: Indicates emergency response
- **Technology Elements**: Represents AI and digital tools

### Customizing the Logo
1. Replace `public/logo.svg` with your custom logo
2. Update the favicon files in `public/` directory
3. Modify the `manifest.json` icon references if needed
4. Update color scheme in `tailwind.config.js` if changing brand colors

## 📱 Progressive Web App (PWA)

The application is configured as a PWA with the following features:

- **Offline Support**: Critical information cached for offline access
- **Installable**: Add to home screen on mobile devices
- **Push Notifications**: Real-time alerts (framework ready)
- **Background Sync**: Data synchronization when online

### PWA Features
- Service worker with caching strategies
- Web app manifest
- Offline fallback pages
- Background data synchronization

## 🏗️ Project Structure

```
haven/
├── app/                    # Next.js App Router
│   ├── (routes)/          # Route groups
│   ├── api/               # Server-side API routes
│   │   ├── weather/       # Weather data endpoint
│   │   ├── earthquakes/   # Earthquake data endpoint
│   │   ├── risk/          # Risk assessment endpoint
│   │   ├── emergency-plan/# AI emergency plans
│   │   ├── resilience/    # Climate resilience tips
│   │   └── resources/     # Emergency resources
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── common/           # Shared components
│   ├── home/            # Home page components
│   ├── alerts/          # Alert components
│   ├── weather/         # Weather components
│   ├── emergency/       # Emergency response
│   ├── climate/         # Climate toolkit
│   ├── map/             # Map components
│   ├── offline/         # Offline components
│   └── ...
├── lib/                 # Utility libraries
│   ├── api.ts          # API integrations
│   ├── utils.ts        # Helper functions
│   └── ...
├── store/              # State management
│   └── useAppStore.ts  # Zustand store
├── types/              # TypeScript types
│   └── index.ts        # Type definitions
├── __tests__/          # Test files
├── public/             # Static assets
└── ...
```

## 🎯 Usage

### For Users
1. **Set Location**: Allow location access or manually enter your location
2. **View Dashboard**: See current alerts, weather, and risk assessment
3. **Access Resources**: Find nearby emergency services and shelters
4. **Emergency Plans**: Generate personalized response plans
5. **Community**: Connect with neighbors and share information

### For Developers
1. **API Integration**: Add new data sources in `lib/api.ts`
2. **AI Features**: Configure OpenAI integration in `lib/openai.ts`
3. **Components**: Create reusable components in `components/`
4. **State Management**: Update store in `store/useAppStore.ts`
5. **Styling**: Use Tailwind classes or extend `tailwind.config.js`

### AI Features Configuration
The application uses OpenAI GPT-4.1-nano for intelligent features:
- **Emergency Plan Generation**: AI creates customized response plans based on disaster type and location
- **Risk Assessment**: Enhanced risk analysis using historical data and patterns
- **Resilience Recommendations**: Personalized climate adaptation suggestions

The AI integration includes:
- Graceful fallback to default templates if OpenAI is unavailable
- Environment-based configuration for different deployment scenarios
- Error handling and validation for API keys
- Cost-effective API usage with GPT-4.1-nano model for optimal performance

## 🚀 API Reference

The application provides server-side API routes for secure data access and AI processing:

### Weather API
- **GET** `/api/weather?lat={lat}&lon={lon}&type={current|forecast}`
- Retrieves current weather or 5-day forecast from OpenWeatherMap
- **Caching**: 5 minutes for current, 30 minutes for forecast

### Earthquake API
- **GET** `/api/earthquakes?feed={feed}`
- Fetches recent earthquake data from USGS
- **Feeds**: `significant_day`, `all_day`, `significant_week`, `all_week`, `significant_month`
- **Caching**: 5 minutes

### Risk Assessment API
- **POST** `/api/risk`
- Body: `{ "latitude": number, "longitude": number }`
- Returns comprehensive risk assessment with AI-enhanced analysis

### Emergency Plan API
- **POST** `/api/emergency-plan`
- Body: `{ "disasterType": string, "latitude": number, "longitude": number }`
- Generates AI-powered emergency response plans

### Resilience Recommendations API
- **GET** `/api/resilience?lat={lat}&lon={lon}`
- Returns AI-generated climate resilience suggestions for the location

### Resources API
- **GET** `/api/resources?lat={lat}&lon={lon}&radius={radius}&type={type}`
- Finds nearby emergency resources (currently returns mock data)
- **Parameters**: `radius` (km), `type` (shelter, hospital, etc.)

### Security Features
- All external API keys are server-side only (not exposed to client)
- Input validation and rate limiting
- Error handling with graceful fallbacks
- CORS protection and secure headers

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make changes and add tests
4. Run linting: `npm run lint`
5. Run tests: `npm test`
6. Commit changes: `git commit -m 'Add your feature'`
7. Push to branch: `git push origin feature/your-feature`
8. Create a Pull Request

### Code Standards
- **TypeScript**: Strict type checking enabled
- **ESLint**: Airbnb config with Next.js rules
- **Prettier**: Consistent code formatting
- **Testing**: Minimum 80% coverage required
- **Accessibility**: WCAG 2.1 AA compliance

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenWeatherMap** for weather data
- **USGS** for earthquake monitoring
- **NASA** for climate data
- **OpenStreetMap** for mapping services
- **Leaflet** for map rendering

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/your-org/haven/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-org/haven/discussions)
- **Email**: support@haven-app.org

## 🚨 Emergency Disclaimer

This application provides general information and guidance for disaster preparedness and response. It is not a substitute for professional emergency services, official government alerts, or expert advice. Always follow instructions from local authorities during emergencies.

---

**Built with ❤️ for community safety and climate resilience**
