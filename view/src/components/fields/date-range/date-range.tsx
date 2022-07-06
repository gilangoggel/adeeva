import {DateRangePicker} from 'rsuite';
import {useEffect, useState} from "react";

const { afterToday } = DateRangePicker as any;

type Value = {
  start: null| Date
  end: null| Date
}

type Props = {
  startDate?: null| Date
  endDate?: null| Date
  onChange(v ?: Value) : void
}

export const DateRange = ({startDate, endDate, onChange}: Props) => {
  const [initial, setInitial] = useState<(Date| null)[]>([
    startDate ? startDate : null,
    endDate ? endDate : null,
  ]);
  useEffect(()=>{
    if (initial){
      if (initial[0] && initial[1]){
        onChange({
          start: initial[0],
          end: initial[1]
        })
      }
    }else{
      onChange()
    }
  }, [initial])
  return (
    <div>
      <DateRangePicker
        placeholder='Pilih tanggal'
        value={initial as any}
        disabledDate={afterToday()}
        onChange={setInitial as any}
      />
    </div>
  );
};
