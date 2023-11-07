'use client'

import { ColorId, SearchOrderBy } from 'unsplash-js'
import { SearchParams } from '../PhotoSearch/PhotoSearch'
import css from './Filters.module.scss'

const orderByOptions: SearchOrderBy[] = ['relevant', 'latest', 'editorial']
const colorOptions: ColorId[] = [
  'black_and_white',
  'black',
  'white',
  'yellow',
  'orange',
  'red',
  'purple',
  'magenta',
  'green',
  'teal',
  'blue',
]

type Props = {
  searchParams: SearchParams
  setSearchParams: (searchParams: SearchParams) => void
}

const Filters = ({ searchParams, setSearchParams }: Props) => {
  const color = searchParams.color
  const orderBy = searchParams.orderBy

  const handleColorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const color = event.target.value
    if (color === 'none') {
      setSearchParams({ ...searchParams, color: undefined, page: 1 })
    } else {
      setSearchParams({ ...searchParams, color: color as ColorId, page: 1 })
    }
  }

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({
      ...searchParams,
      orderBy: event.target.value as SearchOrderBy,
      page: 1,
    })
  }

  return (
    <div className={css.filters}>
      <div className={css.filter}>
        Filter:
        <select onChange={handleColorChange}>
          <option value={undefined}>none</option>
          {colorOptions.map((option) => (
            <option
              key={option}
              value={option}
              defaultChecked={option === color}
            >
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className={css.sort}>
        Sort:
        <select onChange={handleSortChange}>
          {orderByOptions.map((option) => (
            <option
              key={option}
              value={option}
              defaultChecked={option === orderBy}
            >
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default Filters
