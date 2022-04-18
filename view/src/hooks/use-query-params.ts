import parser from 'query-string'
export function useQueryParams(){
  const str = parser.parse(window.location.search.replace("?", ''));
  return str;
}
