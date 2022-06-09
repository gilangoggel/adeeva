import {useCallback, useMemo} from "react";
import {MenuItem, TextField} from "@mui/material";
import {useCheckoutPage} from "@stores/checkout";
import {observer} from "mobx-react";
import {ExpeditionField} from "@components/fields/expedition-field";


export const ResellerOption = observer( () => {
  const store = useCheckoutPage();
  const options = useMemo(()=>{
    return store.resellers.map(item=>(
      <MenuItem key={item.id} value={item.id}>
        {item.name}
      </MenuItem>
    ))
  }, [store.resellers])
  const onChange = useCallback( (e: any) => {
    store.updateSelected(e.target.value)
  }, [])
  return (
    <div>
      <TextField fullWidth onChange={onChange} select value={store.selected}>
        <MenuItem value='__adeeva__'>
          Adeeva
        </MenuItem>
        {options}
      </TextField>
    </div>
  );
});
