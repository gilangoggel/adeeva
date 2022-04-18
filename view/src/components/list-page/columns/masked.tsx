import { ColumnProps } from '../type'
import {get} from "lodash";

function splitString(str: string){
  const splitted = str.match(/.{1,4}/g);
  if (splitted)
    return splitted.join("-");
  return ""
}

export const Masked = ({ entity, config: {key} }: ColumnProps) => {

  const value = get(entity, key) as string;


  if (! value){
    return <>-</>
  }
  const content = splitString(value);
  return (
    <>
      <span className='font-poppins'>
        {content}
      </span>
    </>
  );
};
