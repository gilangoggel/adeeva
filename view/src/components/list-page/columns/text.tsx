import {ColumnProps} from "@components/list-page";
import { get } from 'lodash'

export const Text = ({config : {key}, entity} : ColumnProps) => {
  const node = get(entity, key)
  return (
    <>
      {node === null ? "-" : node}
    </>
  );
};
