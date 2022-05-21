import { useMemo, useEffect, useCallback, useState } from 'react'
import Image from '../src/components/Image'
import styled from '@emotion/styled'

function App() {
  const [favourites, setFavourites] = useState([])
  const [error, setError] = useState(false)
  const [images, setImages] = useState([])

  const { search } = new URL(window.location.href)

  const getData = useCallback(async() => {
    const data = await fetchData(search);
    if (!data.error) {
      setImages(data.images)
    }
    return setError(data.error)
  }, [search])

  useEffect(() => {
    if (search) {
      getData(search)
    }
  }, [search, getData])

  const ToggleFavourite = useCallback((img) => {
    if (favourites.includes(img)) {
      const newFavsArray = favourites.filter((f) => f !== img)
      setFavourites(newFavsArray)
      localStorage.setItem('favourites', JSON.stringify(newFavsArray))
    } else {
      const newFavsArray = [...favourites, img]
      setFavourites(newFavsArray)
      localStorage.setItem('favourites', JSON.stringify(newFavsArray))
    }
  }, [favourites])

  useEffect(() => {
    // First favourites render
    const favs = localStorage.getItem('favourites');
    setFavourites(JSON.parse(favs) || [])
  }, [])

  const FavouritesMemo = useMemo(() => {
    if (favourites.length === 0) {
      return <p>Parece que aún no tienes favoritos.</p>
    }
    return (
      favourites.map((image, index) => <Image
        toggleFavourite={() => ToggleFavourite(image)}
        isFavourite={true}
        key={index}
        src={image}
        alt={index.toString()}
        width={200}
        height={200}
      />
      ))
  }, [favourites, ToggleFavourite])

  const ImagesMemo = useMemo(() => {
    if (error) return (
      <p>
        No hemos encontrado esa raza de perro.
      </p>
    )
    return (
      images.filter(e => !favourites.includes(e)).map((image, index) => (
        <Image
          toggleFavourite={() => ToggleFavourite(image)}
          isFavourite={false}
          key={index}
          src={image}
          alt={index.toString()}
          width={200}
          height={200}
        />
      ))
    )
  }, [error, images, favourites, ToggleFavourite])

  return (
    <div>
      <Header>
        <h1>Razas de perro</h1>
        <Nav>
          <form action='/' method='get'>
            <SearchInput
              placeholder='Buscar una raza'
              name='search'
              type='search'
            />
            <SearchBtn>
              Buscar
            </SearchBtn>
          </form>
        </Nav>
      </Header>
      <main>
        <h2>Razas</h2>
        <ImagesWrapper>
          {ImagesMemo}
        </ImagesWrapper>
          <h2>Favoritos</h2>
        <ImagesWrapper>
          {FavouritesMemo}
        </ImagesWrapper>
      </main>
    </div>
  )
}

async function fetchData(search) {
  try {
    const req = await fetch(`https://dog.ceo/api/breed/${search.split('=')[1]}/images/random/10`);
    const res = await req.json();
    return {
      images: Array.isArray(res.message) ? res.message : [],
      error: !Array.isArray(res.message),
      search,
    }
  } catch (error) {
    return {
      error: true,
      images: [],
      search
    }
  }
}

const Header = styled.header`
  flex-direction: column;
  display: flex;
`
const Nav = styled.nav`
  width: 100%;
`
const SearchInput = styled.input`
  background: #F7F7F7;
  border-radius: 4px;
  border: none;
  height: 36px;
  width: calc(100% - 105px);
  /* & :focus-visible {
    outline: none;
    border: 1px solid red;
  }
  & :focus {
    outline: none;
    border: 1px solid red;
  } */
`
const SearchBtn = styled.button`
  width: 105px;
  height: 36px;
  background-color: #0794E3;
  border-radius: 4px;
  border: none;
  color: #FFF;
  cursor: pointer;
`
const ImagesWrapper = styled.div`
  grid-template-columns: repeat(auto-fill, 160px);
  justify-content: space-between;
  display: grid;
  row-gap: 25px;
`

export default App
