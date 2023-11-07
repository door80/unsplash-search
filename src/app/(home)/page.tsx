import Image from 'next/image'
import PhotoSearch from '@/components/PhotoSearch/PhotoSearch'
import Logo from '@/images/logo-unsplash.svg'
import css from './page.module.scss'

const Home = () => {
  return (
    <>
      <div className={css.intro}>
        <div className={css.headline}>
          <Image src={Logo} alt="Unsplash Logo" width={30} height={30} />
          <h1>Unsplash Photo Search</h1>
        </div>

        <p>
          Search for photos on Unsplash using the search box below. You can also
          filter by color, and sort by relevance or latest photos.
        </p>
      </div>

      <PhotoSearch />
    </>
  )
}

export default Home
