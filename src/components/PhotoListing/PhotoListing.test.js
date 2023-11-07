import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import PhotoListing from './PhotoListing'
import { usePhotoSearch } from '../../hooks/usePhotoSearch'

jest.mock('../../hooks/usePhotoSearch')

describe('PhotoListing', () => {
  const mockSearchParams = {
    query: 'nature',
    page: 1,
    perPage: 12,
    orderBy: 'relevant',
    color: undefined,
  }

  it('displays an error message when there is an error', () => {
    usePhotoSearch.mockReturnValue({
      data: null,
      isLoading: false,
      error: 'Error fetching data',
    })

    render(<PhotoListing searchParams={mockSearchParams} />)
    expect(screen.getByText(/trouble getting photos/i)).toBeInTheDocument()
  })

  it('displays a loading message when data is being fetched', () => {
    usePhotoSearch.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    })

    render(<PhotoListing searchParams={mockSearchParams} />)
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument()
  })

  it('displays a warning message when no photos are found', () => {
    usePhotoSearch.mockReturnValue({
      data: { results: [] },
      isLoading: false,
      error: null,
    })

    render(<PhotoListing searchParams={mockSearchParams} />)
    expect(screen.getByText(/No photos found/i)).toBeInTheDocument()
  })

  it('renders images when search results are available', () => {
    const mockData = {
      results: [
        {
          id: '1',
          urls: {
            small:
              'https://images.unsplash.com/photo-1491485880348-85d48a9e5312?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjI0MzV8MHwxfHNlYXJjaHw3fHxjYXR8ZW58MHwwfHx8MTY5OTMzNTM5OHww&ixlib=rb-4.0.3&q=80&w=400',
          },
          width: 300,
          height: 200,
          alt_description: 'desc1',
        },
        {
          id: '2',
          urls: {
            small:
              'https://images.unsplash.com/photo-1491485880348-85d48a9e5312?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjI0MzV8MHwxfHNlYXJjaHw3fHxjYXR8ZW58MHwwfHx8MTY5OTMzNTM5OHww&ixlib=rb-4.0.3&q=80&w=400',
          },
          width: 300,
          height: 200,
          alt_description: 'desc2',
        },
      ],
    }

    usePhotoSearch.mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null,
    })

    render(<PhotoListing searchParams={mockSearchParams} />)
    const images = screen.getAllByRole('img')
    expect(images).toHaveLength(mockData.results.length)
    expect(images[0]).toHaveAttribute('alt', 'desc1')
    expect(images[1]).toHaveAttribute('alt', 'desc2')
  })
})
