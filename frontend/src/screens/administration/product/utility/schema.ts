import { object, number, string, instanceof as InstanceOf } from "zod";

export const schema = object({
  name: string().nonempty(),
  category: string().nonempty(),
  price: number().nonnegative().min(1),
  resellerPrice: number().nonnegative().min(1),
  pax: string().nonempty(),
  description: string().nonempty(),
  image: InstanceOf(File).nullable().optional(),
});
