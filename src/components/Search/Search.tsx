'use client'

import { useState } from 'react'
import { usePhotoSearch } from '@/hooks/usePhotoSearch'
import { SearchParams } from '../PhotoSearch/PhotoSearch'
import css from './Search.module.scss'

type Props = {
  searchParams: SearchParams
  setSearchParams: (searchParams: SearchParams) => void
}

const Search = ({ searchParams, setSearchParams }: Props) => {
  const [input, setInput] = useState('')
  const { isLoading } = usePhotoSearch(searchParams)

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value)
  }

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isLoading) return
    setSearchParams({ ...searchParams, query: input, page: 1 })
  }

  return (
    <form onSubmit={handleSearch} className={css.searchBox}>
      <input
        type="search"
        className={css.searchInput}
        placeholder="Search Unsplash"
        onChange={handleInput}
      />
      <button className={css.searchButton} type="submit">
        Search
      </button>
    </form>
  )
}

export default Search
