import {useCallback, useState} from "react";

type SelectedState = {
  id: number
  amount: number
}

export function useProductFieldProvider(){
  const [selected, setSelected] = useState<SelectedState[]>([])

  const isInSelected = useCallback(()=>{

  }, [selected]);

}
