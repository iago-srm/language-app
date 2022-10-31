import {
  FilterContainer,
  FiltersContainer,
  FiltersDrawerMenu,
  FiltersDrawer,
} from "./styles";
import { useEffect, useState } from "react";
import MediaQuery, { useMediaQuery } from "react-responsive";
import { Input, CheckboxMenu } from "@atomic";
import { TopicsSelect, CEFRSelect } from "../index";
import { Icons, Toggle } from "@atomic/atoms";

const responsiveBreakpoint = 550;

export const ActivityFilters = ({ setFilters, filters, clearAll }) => {
  const isBigScreen = useMediaQuery({ minWidth: responsiveBreakpoint });
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (isBigScreen) setDrawerOpen(false);
  }, [isBigScreen]);

  const toggleDrawer = () => setDrawerOpen((open) => !open);

  const filterComponents = (
    <>
      <FilterContainer className="title">
        <Input
          placeholder="Título"
          onChange={(e) =>
            setFilters((filters) => ({
              ...filters,
              title: (e.target as any).value,
            }))
          }
          value={filters.title}
        />
      </FilterContainer>
      <FilterContainer className="topics">
        <TopicsSelect
          onChange={(vals) => {
            setFilters((f) => ({ ...f, topics: vals }));
          }}
          value={filters.topics}
        />
      </FilterContainer>
      <FilterContainer className="cefr">
        <CEFRSelect
          onChange={(val) => {
            setFilters((f) => ({ ...f, cefr: val }));
          }}
          value={filters.cefr}
        />
      </FilterContainer>
      <FilterContainer className="content-type">
        <CheckboxMenu
          label={"Content Type"}
          values={filters.contentTypes}
          onChange={(vals) => {
            setFilters((f) => ({ ...f, contentTypes: vals }));
          }}
          options={[
            { value: "TEXT", label: "Texto" },
            { value: "VIDEO", label: "Video" },
          ]}
        />
      </FilterContainer>
      <FilterContainer className="clear-all">
        <button onClick={clearAll}>Clear all</button>
      </FilterContainer>
    </>
  );
  return (
    <>
      <MediaQuery maxWidth={responsiveBreakpoint}>
        <FiltersDrawerMenu>
          <p>Filtros</p>
          {drawerOpen ? (
            <Icons.CHEVRON_DOWN onClick={toggleDrawer} />
          ) : (
            <Icons.CHEVRON_RIGHT onClick={toggleDrawer} />
          )}
        </FiltersDrawerMenu>
        {drawerOpen && <FiltersDrawer>{filterComponents}</FiltersDrawer>}
      </MediaQuery>
      <MediaQuery minWidth={responsiveBreakpoint}>
        <FiltersContainer>{filterComponents}</FiltersContainer>
      </MediaQuery>
    </>
  );
};
