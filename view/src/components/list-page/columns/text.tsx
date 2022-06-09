import {ColumnProps} from "@components/list-page";
import { get } from 'lodash'

export const Text = ({config : {key, render}, entity} : ColumnProps) => {
  const node = render ? render(entity) : get(entity, key);
  return (
    <>
      {node === null ? "-" : node}
    </>
  );
};
