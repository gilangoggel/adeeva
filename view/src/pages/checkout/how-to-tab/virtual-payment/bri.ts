import type { VirtualAccountInfo, StepCallback } from './types';
import { makeColoredText } from './colored-text'
import { makeLinkNode } from './link'
import { resolveVirtualAccount } from '../resolve-props'

const step2Atm : StepCallback = (props) => {
  const { va_number, gross_amount } = resolveVirtualAccount(props as any)
  return {
    title: "Detail pembayaran",
    texts: [
      makeColoredText({
        number: va_number,
        text: "Masukan nomor virtual account"
      }),
      `Masukan jumlah pembayaran Rp ${gross_amount}`,
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
        text: "Masukan nomor virtual account"
      }),
      `Masukan jumlah pembayaran Rp ${gross_amount}`,
      "Tekan tombol kirim",
      "Masukan lagi password anda beserta kode otentikasi dari internet bank mToken"
    ]
  }
}
const step2MBanking : StepCallback = (props) =>{
  const { va_number, gross_amount } = resolveVirtualAccount(props as any)
  return {
    title: "Detail pembayaran",
    texts: [
      makeColoredText({
        number: va_number,
        text: "Masukan nomor virtual account"
      }),
      `Masukan jumlah pembayaran ${gross_amount}`,
      "Masukan pin anda & tekan tombol kirim"
    ]
  }
}

const ibanking: VirtualAccountInfo = {
  title: "IBANKING",
  steps:[
    {
      title: "Login ke dalam akun anda",
      texts:[
        makeLinkNode({
          link: "https://ib.bri.co.id/ib-bri",
          bankSite: 'IBANKING BRI'
        }),
        "Pilih pembayaran & pilih briva"
      ]
    },
    step2MBanking,
    {
      title: "Transaksi berhasil",
      texts:[
        "Simpan recipt pembayaran atau simpan tankapan layar sebagai bukti pembayaran",
        "Status pembayaran akan otomatis berubah, mungkin membutuhkan waktu sampe 5 menit"
      ]
    }
  ],
}

const atm :VirtualAccountInfo = {
  title: "ATM BRI",
  steps:[
    {
      title: "Cari atm terdekat",
      texts: [
        "Masukan kartu atm & pin anda",
        "Pilih lainya & pilih pembayaran",
        "Pilih Pembayaran lainya & pilih BRIVA"
      ]
    },
    step2Atm,
    {
      title: "Transaksi berhasil",
      texts: [
        "Setelah pembayaran selesai, status pembayaran akan otomasi terupdate, mungkin membutuhkan waktu sekitar 5 menit"
      ]
    },
  ]
}
const mbanking: VirtualAccountInfo = {
  title: "MBANKING",
  steps:[
    {
      title: "Login ke dalam akun anda",
      texts:[
        "Login ke BRI Mobile banking",
        "Masukan USERID & PIN",
        "Pilih pembayaran & pilih briva"
      ]
    },
    step2Ibanking,
    {
      title: "Transaksi berhasil",
      texts:[
        "Simpan recipt pembayaran atau simpan tankapan layar sebagai bukti pembayaran",
        "Status pembayaran akan otomatis berubah, mungkin membutuhkan waktu sampe 5 menit"
      ]
    }
  ],
}
export const bri : VirtualAccountInfo[] = [
  atm,
  ibanking,
  mbanking,
]
