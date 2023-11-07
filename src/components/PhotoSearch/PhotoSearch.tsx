'use client'

import { useState } from 'react'
import { ColorId, SearchOrderBy } from 'unsplash-js'
import Filters from '../Filters/Filters'
import PhotoListing from '../PhotoListing/PhotoListing'
import Pagination from '../Pagination/Pagination'
import Search from '../Search/Search'
import css from './PhotoSearch.module.scss'

export type SearchParams = {
  query: string
  page: number
  perPage: number
  orderBy: SearchOrderBy
  color: ColorId | undefined
}

const searchParamDefault = {
  query: '',
  page: 1,
  perPage: 12,
  orderBy: 'relevant',
  color: undefined,
} as SearchParams

const PhotoSearch = () => {
  const [searchParams, setSearchParams] =
    useState<SearchParams>(searchParamDefault)

  return (
    <>
      <div className={css.header}>
        <Search searchParams={searchParams} setSearchParams={setSearchParams} />
        <Filters
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </div>

      <PhotoListing searchParams={searchParams} />
      <Pagination
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
    </>
  )
}

export default PhotoSearch
