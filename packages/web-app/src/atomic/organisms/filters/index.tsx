import {
  FilterContainer,
  FiltersContainer,
  FiltersDrawerMenu,
  FiltersDrawer
} from './styles';
import { useEffect, useState } from 'react';
import MediaQuery, { useMediaQuery } from 'react-responsive';
import { TopicsSelect, CEFRSelect, InputStyled } from '@components';
import { 
  Icons
} from '@atomic/atoms';

const responsiveBreakpoint = 550;

export const ActivityFilters = ({ setFilters, filters}) => {

  const isBigScreen = useMediaQuery({ minWidth: responsiveBreakpoint });
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if(isBigScreen) setDrawerOpen(false);
  }, [isBigScreen]);

  const toggleDrawer = () => setDrawerOpen(open => !open)

  return (
    <>
      <MediaQuery maxWidth={responsiveBreakpoint}>
        <FiltersDrawerMenu>
          <p>Filtros</p>
          {drawerOpen ? <Icons.CHEVRON_DOWN onClick={toggleDrawer}/> : <Icons.CHEVRON_RIGHT onClick={toggleDrawer}/>}
        </FiltersDrawerMenu>
        {drawerOpen && <FiltersDrawer>
          <FilterContainer><InputStyled placeholder='Título' onChange={(e) => setFilters(filters => ({...filters, title: (e.target as any).value}))} value={filters.title}/></FilterContainer>
          <FilterContainer><TopicsSelect onChange={(vals) => {setFilters(f => ({...f, topics: vals}))}} value={filters.topics}/></FilterContainer>
          <FilterContainer><CEFRSelect onChange={(val) => {setFilters(f => ({...f, cefr: val}))}} value={filters.cefr}/></FilterContainer>
        </FiltersDrawer>}
      </MediaQuery>
      <MediaQuery minWidth={responsiveBreakpoint}>
        <FiltersContainer>
          <FilterContainer><InputStyled placeholder='Título' onChange={(e) => setFilters(filters => ({...filters, title: (e.target as any).value}))} value={filters.title}/></FilterContainer>
          <FilterContainer><TopicsSelect onChange={(vals) => {setFilters(f => ({...f, topics: vals}))}} value={filters.topics}/></FilterContainer>
          <FilterContainer><CEFRSelect onChange={(val) => {setFilters(f => ({...f, cefr: val}))}} value={filters.cefr}/></FilterContainer>
        </FiltersContainer>
      </MediaQuery>
    </>
  )
}