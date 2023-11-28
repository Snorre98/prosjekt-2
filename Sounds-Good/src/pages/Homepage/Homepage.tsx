import { useEffect, useState } from 'react'
import Searchbar from '../../components/Searchbar/Searchbar.tsx'
import { SearchFilter } from '../../components/FilterComponents/SearchFilter/SearchFilter.tsx'
import ArtistCardContainer from '../../components/ArtistCardContainer/ArtistCardContainer.tsx'
import AlbumCardContainer from '../../components/AlbumCardContainer/AlbumCardContainer.tsx'
import SongCardContainer from '../../components/SongCardContainer/SongCardContainer.tsx'
import { TrackDurationFilter } from '../../components/FilterComponents/TrackDurationFilter/TrackDurationFilter.tsx'
import styles from './Homepage.module.css'
import { AlbumTagFilter } from '../../components/FilterComponents/AlbumTagFilter/AlbumTagFilter.tsx'
import { ArtistListenersFilter } from '../../components/FilterComponents/ArtistListenersFilter/ArtistListenersFilter.tsx'
import { useDispatch, useSelector } from 'react-redux'
import { updateSortingDirection } from '../../redux/slices/sortingDirectionSlice.ts'
import Page from '../../components/Page/Page.tsx'

export default function Homepage() {
  const [searchbarValue, setSearchbarValue] = useState('')
  const [selectedValue, setSelectedValue] = useState('TRACK')
  const [maxDuration, setMaxDuration] = useState(600)
  const [minDuration, setMinDuration] = useState(0)
  const dispatch = useDispatch()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setSortingChange = (event: any) => {
    //sets value in redux store
    dispatch(updateSortingDirection(event.target.value))
  }
  //gets sortingDirectionState from store
  const sortingDirection = useSelector((state) => state.sortingDirection.value)

  useEffect(() => {
    console.log(searchbarValue)
  }, [searchbarValue])

  return (
    <Page>
      <div className={styles.container}>
        <div className={styles.filterContainer}>
          {selectedValue === 'TRACK' && (
            <>
              <div className={styles.children} data-cy="SliderContainer">
                <TrackDurationFilter
                  setMaxDuration={setMaxDuration}
                  setMinDuration={setMinDuration}
                />
              </div>
              <div className={styles.children}>
                <label htmlFor="select" className={styles.label}>
                  Sorting:
                </label>
                <select
                  id="select"
                  value={sortingDirection}
                  onChange={setSortingChange}
                  data-cy="Select"
                >
                  <option value="Default">Default</option>
                  <option value="ASC">Alphabetically(a-z)</option>
                  <option value="DESC">Alphabetically(z-a)</option>
                </select>
              </div>
            </>
          )}
          {selectedValue === 'ALBUM' && (
            <>
              <div className={styles.children}>
                <AlbumTagFilter />
              </div>
              <div className={styles.children}>
                <label htmlFor="select" className={styles.label}>
                  Sorting:
                </label>
                <select
                  id="select"
                  value={sortingDirection}
                  onChange={setSortingChange}
                >
                  <option value="Default">Default</option>
                  <option value="ASC">Alphabetically(a-z)</option>
                  <option value="DESC">Alphabetically(z-a)</option>
                </select>
              </div>
            </>
          )}
          {selectedValue == 'ARTIST' && (
            <>
              <div className={styles.children}>
                <ArtistListenersFilter />
              </div>
              <div className={styles.children}>
                <label htmlFor="select" className={styles.label}>
                  Sorting:
                </label>
                <select
                  id="select"
                  value={sortingDirection}
                  onChange={setSortingChange}
                >
                  <option value="Default">Default</option>
                  <option value="ASC">Alphabetically(a-z)</option>
                  <option value="DESC">Alphabetically(z-a)</option>
                </select>
              </div>
            </>
          )}
        </div>
        <div className={styles.searchContainer}>
          <Searchbar
            searchbarName="homePageSearch"
            isRequired={true}
            placeholder="Search..."
            labelValue="Search"
            ariaLabel="Searchbar"
            setSearchbarValue={setSearchbarValue}
          />
          <div className={styles.children}>
            <SearchFilter
              selectedValue={selectedValue}
              setSelectedValue={setSelectedValue}
            />
          </div>
        </div>

        {searchbarValue && selectedValue === 'ARTIST' && (
          <ArtistCardContainer input={searchbarValue} />
        )}

        {searchbarValue && selectedValue === 'ALBUM' && (
          <AlbumCardContainer input={searchbarValue} />
        )}

        {searchbarValue && selectedValue === 'TRACK' && (
          <SongCardContainer
            input={searchbarValue}
            maxDuration={maxDuration}
            minDuration={minDuration}
            sortingDirection={sortingDirection}
          />
        )}
      </div>
    </Page>
  )
}
