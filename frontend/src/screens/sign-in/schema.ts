import { object, string } from "zod";

export const schema = object({
  email: string()
    .email("Format email tidak sesuai")
    .nonempty("Silahkan isi alamat email"),
  password: string().nonempty("Silahkan isi password"),
});
