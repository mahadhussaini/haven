import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { LocationInput } from '@/components/common/LocationInput'

// Mock fetch
const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>

describe('Haven LocationInput', () => {
  const mockOnLocationSelect = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    mockFetch.mockClear()
  })

  it('renders the input field', () => {
    render(<LocationInput onLocationSelect={mockOnLocationSelect} />)

    expect(screen.getByPlaceholderText(/enter location/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /use current location/i })).toBeInTheDocument()
  })

  it('searches for locations when user types', async () => {
    const mockResponse = [
      {
        display_name: 'New York, NY, USA',
        lat: '40.7128',
        lon: '-74.0060',
        address: {
          city: 'New York',
          state: 'NY',
          country: 'USA',
        },
      },
    ]

    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponse),
    } as any)

    render(<LocationInput onLocationSelect={mockOnLocationSelect} />)

    const input = screen.getByPlaceholderText(/enter location/i)
    await userEvent.type(input, 'New York')

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        'https://nominatim.openstreetmap.org/search?format=json&q=New%20York&limit=5&addressdetails=1'
      )
    })
  })

  it('displays search results', async () => {
    const mockResponse = [
      {
        display_name: 'New York, NY, USA',
        lat: '40.7128',
        lon: '-74.0060',
        address: {
          city: 'New York',
          state: 'NY',
          country: 'USA',
        },
      },
    ]

    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponse),
    } as any)

    render(<LocationInput onLocationSelect={mockOnLocationSelect} />)

    const input = screen.getByPlaceholderText(/enter location/i)
    await userEvent.type(input, 'New York')

    await waitFor(() => {
      expect(screen.getByText('New York, NY, USA')).toBeInTheDocument()
    })
  })

  it('calls onLocationSelect when a suggestion is clicked', async () => {
    const mockResponse = [
      {
        display_name: 'New York, NY, USA',
        lat: '40.7128',
        lon: '-74.0060',
        address: {
          city: 'New York',
          state: 'NY',
          country: 'USA',
        },
      },
    ]

    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponse),
    } as any)

    render(<LocationInput onLocationSelect={mockOnLocationSelect} />)

    const input = screen.getByPlaceholderText(/enter location/i)
    await userEvent.type(input, 'New York')

    await waitFor(() => {
      const suggestion = screen.getByText('New York, NY, USA')
      fireEvent.click(suggestion)
    })

    expect(mockOnLocationSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        latitude: 40.7128,
        longitude: -74.0060,
        city: 'New York',
        state: 'NY',
        country: 'USA',
        address: 'New York, NY, USA',
      })
    )
  })

  it('handles geolocation when current location button is clicked', async () => {
    const mockGeolocation = {
      getCurrentPosition: jest.fn().mockImplementation((success) =>
        success({
          coords: {
            latitude: 40.7128,
            longitude: -74.0060,
          },
        })
      ),
    }

    Object.defineProperty(navigator, 'geolocation', {
      value: mockGeolocation,
      writable: true,
    })

    // Mock reverse geocoding
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve({
        display_name: 'New York, NY, USA',
        address: {
          city: 'New York',
          state: 'NY',
          country: 'USA',
        },
      }),
    } as any)

    render(<LocationInput onLocationSelect={mockOnLocationSelect} />)

    const locationButton = screen.getByRole('button', { name: /use current location/i })
    await userEvent.click(locationButton)

    await waitFor(() => {
      expect(mockOnLocationSelect).toHaveBeenCalledWith(
        expect.objectContaining({
          latitude: 40.7128,
          longitude: -74.0060,
        })
      )
    })
  })

  it('handles search input changes', async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve([]),
    } as any)

    render(<LocationInput onLocationSelect={mockOnLocationSelect} />)

    const input = screen.getByPlaceholderText(/enter location/i)
    await userEvent.type(input, 'New York')

    expect(input).toHaveValue('New York')
  })
})
