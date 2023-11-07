'use client'

import { usePhotoSearch } from '@/hooks/usePhotoSearch'
import { SearchParams } from '../PhotoSearch/PhotoSearch'
import css from './Pagination.module.scss'

type Props = {
  searchParams: SearchParams
  setSearchParams: (searchParams: SearchParams) => void
}

const Pagination = ({ searchParams, setSearchParams }: Props) => {
  const page = searchParams.page
  const { data, isPlaceholderData } = usePhotoSearch(searchParams)
  const hasMore = data ? data.total_pages > page : false

  const handlePrevPage = () => {
    setSearchParams({ ...searchParams, page: Math.max(page - 1, 1) })
  }

  const handleNextPage = () => {
    if (!isPlaceholderData) {
      setSearchParams({ ...searchParams, page: page + 1 })
    }
  }

  if (!data || data.results?.length === 0) return null

  return (
    <div className={css.pagination}>
      <button
        onClick={handlePrevPage}
        disabled={page === 1}
        className={css.pager}
        data-testid="pager-prev"
      >
        &lt;
      </button>

      <span className={css.pageNum}>Page {searchParams.page}</span>

      <button
        onClick={handleNextPage}
        disabled={isPlaceholderData || !hasMore}
        className={css.pager}
        data-testid="pager-next"
      >
        &gt;
      </button>
    </div>
  )
}

export default Pagination
