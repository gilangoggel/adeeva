import { useApi } from "./use-api";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toJS } from "mobx";

type Options = {
  path: string;
};
type Paginator = {
  currentPage: number;
  lastPage: number;
};

type UsePaginator = [
  Record<string, any>[],
  {
    paginator: Paginator;
    query: Record<string, any>;
    updateQuery(q: Record<string, any>): void;
    resetQuery(): void;
    go(n: number): void;
  }
];

export const PaginatorContext = createContext<null | UsePaginator>(null);
export function usePaginatorContext(): UsePaginator {
  return useContext(PaginatorContext) as UsePaginator;
}
export const usePaginator = ({ path }: Options): UsePaginator => {
  const [query, setQuery] = useState<Record<string, any>>({});
  const [data, setData] = useState<Record<string, any>[]>([]);
  const [{ response }, run] = useApi({ path });

  const updateQuery = (query: Record<string, any>) => {
    setQuery({ ...query });
    run({
      ...query,
      page: 1,
    });
  };
  const resetQuery = () => {
    setQuery({});
    run({ page: 1 });
  };

  useEffect(() => {
    if (response && response.data && response.meta) {
      const { data } = toJS(response);
      setData([...data]);
    }
  }, [response]);

  useEffect(() => {
    run({});
  }, []);
  const go = (page: number) => {
    run({
      page,
      ...query,
    });
  };
  const paginator = useMemo((): Paginator => {
    if (response) {
      const { current_page, last_page } = response.meta;
      return {
        currentPage: current_page,
        lastPage: last_page,
      };
    }
    return {
      currentPage: 1,
      lastPage: 1,
    };
  }, [response]);

  return [
    data,
    {
      go,
      paginator,
      query,
      updateQuery,
      resetQuery,
    },
  ];
};
