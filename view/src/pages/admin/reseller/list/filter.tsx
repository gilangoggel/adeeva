import {FilterForm} from "@components/forms/filter-form";
import {SearchField} from "@components/fields/search-field";
import {CityField} from "@components/fields/city-field";

export const Filter = () => {
  return (
    <FilterForm>
      {({makeHandler, values})=>(
        <>
          <SearchField
            onChange={makeHandler('name', false)}
            placeholder='Cari nama'
            value={values['name'] ?? ""}
          />
          <CityField
            size='small'
            sx={{minWidth:300, ml : 1}}
            variant='filled'
            label='Kota'
            onChange={makeHandler("city", false)}
          />
        </>
      )}
    </FilterForm>
  );
};
