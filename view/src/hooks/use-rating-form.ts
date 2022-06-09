import {useFormRequest} from "@hooks/use-form-request";
import {usePage} from "@inertiajs/inertia-react";
import {useFormValues, UseFormValueReturn} from "@hooks/use-form-values";
import {useAuth} from "@hooks/use-auth";
import {createContext, useContext} from "react";


type Input = Omit<IComment, 'created_at' | 'user_id' | 'id'>

type UseRatingForm = [
  IComment | null, {
    input: UseFormValueReturn<Input>[0],
    register: UseFormValueReturn<Input>[1],
  },
  {
    loading: boolean,
    onSubmit(e?: any): void,
    reset(): void
  }
]

export const FormContext = createContext<null| UseRatingForm>(null);

export function useRatingForm() : UseRatingForm {
  const parent = useContext(FormContext);
  if (parent) return parent;
  const { product : {id} } = usePage().props as any;
  const [ response  , loading , {run, getError, clear}] = useFormRequest<IComment>({
    path: `/product/${id}/comment`,
    successMessage : "Terima kasih telah memberikan masukan kepada produk kami"
  })
  const auth = useAuth()
  const [ inputs , inputProps, resetInput  ] = useFormValues<Input>({
    initial: {
      username: auth? auth.name : "",
      rating: 3,
      content: ""
    },
    loading,
    getError
  })
  const reset = () => {
    clear();
    resetInput()
  }

  const onSubmit = (e: any) => {
    e.preventDefault();
    run(inputs);
  }

  return [
    response,
    {
      register : inputProps,
      input: inputs
    },
    {
      loading, onSubmit, reset
    }
  ]
}
