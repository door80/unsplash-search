import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import Search from './Search'

jest.mock('../../hooks/usePhotoSearch', () => ({
  usePhotoSearch: () => ({
    isLoading: false,
  }),
}))

describe('Search', () => {
  it('updates input value on change', () => {
    render(
      <Search
        searchParams={{ query: '', page: 1 }}
        setSearchParams={() => {}}
      />
    )
    const input = screen.getByPlaceholderText('Search Unsplash')
    fireEvent.change(input, { target: { value: 'nature' } })
    expect(input.value).toBe('nature')
  })

  it('calls setSearchParams with input value when form is submitted', () => {
    const setSearchParamsMock = jest.fn()
    render(
      <Search
        searchParams={{ query: '', page: 1 }}
        setSearchParams={setSearchParamsMock}
      />
    )

    const input = screen.getByPlaceholderText('Search Unsplash')
    fireEvent.change(input, { target: { value: 'nature' } })
    fireEvent.submit(screen.getByRole('button', { name: /search/i }))

    expect(setSearchParamsMock).toHaveBeenCalledWith({
      query: 'nature',
      page: 1,
    })
  })
})
