import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import Pagination from './Pagination'

jest.mock('../../hooks/usePhotoSearch', () => ({
  usePhotoSearch: jest.fn(),
}))

describe('Pagination', () => {
  const setSearchParamsMock = jest.fn()
  const searchParams = { query: '', page: 1 }

  beforeEach(() => {
    // Reset the mock
    setSearchParamsMock.mockReset()
  })

  it('renders current page number', () => {
    const usePhotoSearchMock =
      require('../../hooks/usePhotoSearch').usePhotoSearch
    usePhotoSearchMock.mockReturnValueOnce({
      data: { total_pages: 3 },
      isPlaceholderData: false,
    })
    render(
      <Pagination
        searchParams={searchParams}
        setSearchParams={setSearchParamsMock}
      />
    )
    expect(screen.getByText(/page 1/i)).toBeInTheDocument()
  })

  it('calls setSearchParams with new page number on "Next" button click', () => {
    const usePhotoSearchMock =
      require('../../hooks/usePhotoSearch').usePhotoSearch
    usePhotoSearchMock.mockReturnValueOnce({
      data: { total_pages: 3 },
      isPlaceholderData: false,
    })
    render(
      <Pagination
        searchParams={searchParams}
        setSearchParams={setSearchParamsMock}
      />
    )
    fireEvent.click(screen.getByTestId('pager-next'))
    expect(setSearchParamsMock).toHaveBeenCalledWith({ query: '', page: 2 })
  })

  it('calls setSearchParams with new page number on "Previous" button click', () => {
    const usePhotoSearchMock =
      require('../../hooks/usePhotoSearch').usePhotoSearch
    usePhotoSearchMock.mockReturnValueOnce({
      data: { total_pages: 3 },
      isPlaceholderData: false,
    })
    render(
      <Pagination
        searchParams={{ ...searchParams, page: 2 }}
        setSearchParams={setSearchParamsMock}
      />
    )
    fireEvent.click(screen.getByTestId('pager-prev'))
    expect(setSearchParamsMock).toHaveBeenCalledWith({ query: '', page: 1 })
  })

  it('does not render if no data is present', () => {
    const usePhotoSearchMock =
      require('../../hooks/usePhotoSearch').usePhotoSearch
    usePhotoSearchMock.mockReturnValueOnce({
      data: null,
      isPlaceholderData: true,
    })
    const { container } = render(
      <Pagination
        searchParams={searchParams}
        setSearchParams={setSearchParamsMock}
      />
    )
    expect(container).toBeEmptyDOMElement()
  })

  it('disables "Next" button if on the last page', () => {
    const usePhotoSearchMock =
      require('../../hooks/usePhotoSearch').usePhotoSearch
    usePhotoSearchMock.mockReturnValueOnce({
      data: { total_pages: 1 },
      isPlaceholderData: false,
    })
    render(
      <Pagination
        searchParams={searchParams}
        setSearchParams={setSearchParamsMock}
      />
    )
    expect(screen.getByTestId('pager-next')).toBeDisabled()
  })

  it('disables "Previous" button if on the first page', () => {
    const usePhotoSearchMock =
      require('../../hooks/usePhotoSearch').usePhotoSearch
    usePhotoSearchMock.mockReturnValueOnce({
      data: { total_pages: 1 },
      isPlaceholderData: false,
    })
    render(
      <Pagination
        searchParams={searchParams}
        setSearchParams={setSearchParamsMock}
      />
    )
    expect(screen.getByTestId('pager-prev')).toBeDisabled()
  })
})
