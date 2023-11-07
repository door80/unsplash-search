'use client'

import Image from 'next/image'
import { usePhotoSearch } from '@/hooks/usePhotoSearch'
import { SearchParams } from '../PhotoSearch/PhotoSearch'
import css from './PhotoListing.module.scss'

type Props = {
  searchParams: SearchParams
}

const PhotoListing = ({ searchParams }: Props) => {
  const { data, isLoading, error } = usePhotoSearch(searchParams)

  if (error)
    return (
      <div className={css.error}>
        We’re having trouble getting photos at the moment.
      </div>
    )

  if (data?.results?.length === 0)
    return (
      <div className={css.warning}>
        No photos found. Try searching for something else.
      </div>
    )

  return (
    <div className={css.listing}>
      {isLoading
        ? 'Loading...'
        : data?.results?.map((result) => (
            <div key={result.id} className={css.listItem}>
              <Image
                src={result.urls.small}
                alt={result.alt_description || ''}
                width={result.width}
                height={result.height}
                style={{ objectFit: 'contain', width: '100%', height: 'auto' }}
              />
            </div>
          ))}
    </div>
  )
}

export default PhotoListing
