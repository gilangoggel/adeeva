import type { VirtualAccountInfo, StepCallback } from './types';
import { makeColoredText } from './colored-text'
import { makeLinkNode } from './link'
import { resolveVirtualAccount } from '../resolve-props'

const step2Atm : StepCallback = (content) => {
  const { va_number } = resolveVirtualAccount(content as any);
  return {
    title: "Detail pembayaran",
    texts: [
      makeColoredText({
        number: va_number,
        text: "Masukan nomor virtual account"
      }),
      "Tekan tombol Benar",
      "Periksa detail pembayaran telah sesuai",
      "Tekan tombol ya"
    ]
  }
}

const step2Ibanking : StepCallback = (props) => {
  const { va_number, gross_amount } = resolveVirtualAccount(props as any)
  return {
    title: "Detail pembayaran",
    texts: [
      makeColoredText({
        number: va_number,
        text: "Masukan nomor BCA virtual account"
      }),
      `Masukan jumlah pembayaran ${gross_amount}`,
      "Validasi pembayaran",
    ]
  }
}
const step2MBanking : StepCallback = (props) => {
  const { va_number } = resolveVirtualAccount(props as any)
  return {
    title: "Detail pembayaran",
    texts: [
      makeColoredText({
        number: va_number,
        text: "Masukan nomor virtual account"
      }),
      "Masukan pin m-BCA"
    ]
  }
}

const ibanking: VirtualAccountInfo = {
  title: "KlickBCA individual ",
  steps:[
    {
      title: "Login ke dalam akun anda",
      texts:[
        makeLinkNode({
          link: "https://ibank.klikbca.com/",
          bankSite: 'Klik BCA'
        }),
        "Masukan USERID & PIN anda",
        "Pilih transfer dana"
      ]
    },
    step2Ibanking,
    {
      title: "Transaksi berhasil",
      texts:[
        "Simpan recipt pembayaran atau simpan tankapan layar sebagai bukti pembayaran",
        "Status pembayaran akan otomatis berubah, mungkin membutuhkan waktu sampe 5 menit atau anda dapat menekan tombol update status pembayaran"
      ]
    }
  ],
}

const atm :VirtualAccountInfo = {
  title: "ATM BCA",
  steps:[
    {
      title: "Cari atm terdekat",
      texts: [
        "Masukan kartu atm & pin anda",
        "Pilih lainya & pilih transfer",
        "Pilih kirim ke rekening BCA VIRTUAL ACCOUNT"
      ]
    },
    step2Atm,
    {
      title: "Transaksi berhasil",
      texts: [
        "Status pembayaran akan otomatis berubah, mungkin membutuhkan waktu sampe 5 menit atau anda dapat menekan tombol update status pembayaran"
      ]
    },
  ]
}
const mbanking: VirtualAccountInfo = {
  title: "m-BCA",
  steps:[
    {
      title: "Login ke dalam akun anda",
      texts:[
        "Login ke aplikasi m-BCA Mobile",
        "Pilih m-BCA",
        "Masukkan kode akses m-BCA",
        "Pilih m-Transfer",
        "Pilih BCA VIRTUAL ACCOUNT"
      ]
    },
    step2MBanking,
    {
      title: "Transaksi berhasil",
      texts:[
        "Simpan recipt pembayaran atau simpan tankapan layar sebagai bukti pembayaran",
        "Status pembayaran akan otomatis berubah, mungkin membutuhkan waktu sampe 5 menit atau anda dapat menekan tombol update status pembayaran"
      ]
    }
  ],
}
export const bca : VirtualAccountInfo[] = [
  atm,
  ibanking,
  mbanking,
]
