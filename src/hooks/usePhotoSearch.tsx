import { createApi } from 'unsplash-js'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { SearchParams } from '@/components/PhotoSearch/PhotoSearch'

const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY
if (!accessKey) throw new Error('Missing Unsplash access key')

const unsplash = createApi({ accessKey })

const fetchPhotos = async (searchParams: SearchParams) => {
  const { query, page, perPage, orderBy, color } = searchParams

  const result = await unsplash.search.getPhotos({
    query,
    page,
    perPage,
    color,
    orderBy,
    orientation: 'landscape',
  })

  if (result.errors) throw new Error(result.errors[0])

  return result.response
}

const usePhotoSearch = (searchParams: SearchParams) => {
  return useQuery({
    queryKey: [
      'searchPhotos',
      searchParams.query,
      searchParams?.page,
      searchParams?.color,
      searchParams?.orderBy,
    ],
    queryFn: () => fetchPhotos(searchParams),
    placeholderData: keepPreviousData,
    staleTime: 60_000, // 1 minute cache to reduce API calls
    enabled: searchParams?.query.length > 2, // Don't run this unless we have a term
  })
}

export { usePhotoSearch }
