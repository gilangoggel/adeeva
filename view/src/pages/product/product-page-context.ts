import {createContext, useCallback, useContext, useState} from "react";
import {usePage} from "@inertiajs/inertia-react";

export type Comment = IComment

export type PageProps = {
  recomendations: IProduct[],
  product: IProduct
  comments: Comment[]
}
type UseProductPage = [
  {
    product: IProduct,
    recomendations: IProduct[],
    comments: Comment[]
  },
  (comment: Comment)=>any
]

export function useProvider() : UseProductPage {
  const props  = usePage().props as unknown as PageProps;
  const [comments, setComment] = useState<Comment[]>([])
  const addCommnet = useCallback( (comment) => {
    setComment(p => [comment , ...p])
  }, [])
  return [
    {...props, comments},
    addCommnet
  ]
}

export const PageContext = createContext<null| UseProductPage>(null)

export function useProductPage(){
  return useContext(PageContext) as UseProductPage
}
