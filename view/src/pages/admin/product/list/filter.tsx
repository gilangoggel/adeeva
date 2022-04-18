import {SearchField} from "@components/fields/search-field";
import {FilterForm} from "@components/forms/filter-form";

export const Filter = () => {
  return (
    <FilterForm>
      {({makeHandler, values})=>(
        <SearchField
          sx={{
            minWidth: 300
          }}
          value={values['search'] ?? ""}
          variant='filled'
          hiddenLabel
          size='small'
          onChange={makeHandler('search', false)}
          placeholder='Cari produk'
        />
      )}
    </FilterForm>
  );
};
