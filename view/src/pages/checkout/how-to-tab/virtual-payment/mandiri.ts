import { VirtualAccountInfo, StepCallback } from './types'
import { makeLinkNode } from './link'
import { makeColoredText } from './colored-text'
import { resolveVirtualAccount } from '../resolve-props'


const step2 = (props : any) => {
  const { bill_key } = resolveVirtualAccount(props as any)
  return {
    title: "Detail pembayaran",
    texts: [
      "Masukan nomor peruhasaan / institusi '70012' & tekan BENAR",
      makeColoredText({
        text:"Masukan kode pembayaran",
        number: bill_key
      }),
      `Tekan benar`,
      "Pastikan total yang di tampilkan telah sesuai dengan transaksi anda & pilih no 1 & tekan tombol YA"
    ]
  }
}
const step2IBanking = (props: any) => {
  const { bill_key } = resolveVirtualAccount(props as any)
  return     {
    title: "Detail pembayaran",
    texts:[
      "Pilih '70012 MIDTRANS' sebagai penyedia pembayaran",
      makeColoredText({
        text: "Masukan nomor virtual account",
        number: bill_key
      }),
      `Tekan Continue`,
      "Apabila detail pembayaran yang di tampilkan telah sesuai tekan tombol Confirm",
      "Masukan PIN / Challenge Code Token anda"
    ]
  }
}
const atm : VirtualAccountInfo =   {
  title: "ATM",
  steps: [
    {
      title: "Temukan ATM Mandiri terdekat",
      texts: [
        "Masukan kartu atm & pilih BAHASA INDONESIA",
        "Masukan pin ATM anda",
        "Pilih pembayaran",
        "Pilih Multipayment"
      ]
    },
    step2,
    {
      title: "Transaksi berhasil",
      texts: [
        "Simpan Recipt sebagai bukti pembayaran",
        "Status pembayaran akan otomatis berubah, mungkin membutuhkan waktu sampe 5 menit"
      ]
    }
  ]
}
const ibanking: VirtualAccountInfo = {
  title: "IBANKING",
  steps: [
    {
      title:"Login ke akun IBANKING Mandiri",
      texts: [
        makeLinkNode({
          bankSite: "Mandiri internet banking",
          link: "https://ibank.mandiri.co.id"
        }),
        "Login menggunakan USERID & PASSWORD anda",
        "Ke halaman home & pilih pembayaran",
        "Pilih Multi payment"
      ]
    },
    step2IBanking,
    {
      title: "Transaksi berhasil",
      texts:[
        "Simpan recipt pembayaran atau simpan tankapan layar sebagai bukti pembayaran",
        "Status pembayaran akan otomatis berubah, mungkin membutuhkan waktu sampe 5 menit"
      ]
    }
  ]
}

const livinStep2 : StepCallback = (props) => {
  const { bill_key } = resolveVirtualAccount(props as any)
  return {
    title: "Detail pembayaran",
    texts: [
      "Pilih '70012 MIDTRANS'",
      makeColoredText({
        text: "Masukan nomor virtual account",
        number: bill_key,
      }),
      "Nominal yang akan di transfer terisi secara otomatis",
      "Masukan MPIN anda"
    ]
  }

}

const livinApp : VirtualAccountInfo = {
  title: "MBANKING YELLOW LIVIN APP",
  steps:[
    {
      title:"Login ke akun",
      texts: [
        "Buka aplikasi LIVIN by Mandiri, masukan password / face recognition",
        "Pilih pembayaran",
        "Cari '70012 MIDTRANS'"
      ]
    },
    livinStep2,
    {
      title: "Transaksi berhasil",
      texts: [
        "Simpan recipt pembayaran atau simpan tankapan layar sebagai bukti pembayaran",
        "Status pembayaran akan otomatis berubah, mungkin membutuhkan waktu sampe 5 menit"
      ]
    }
  ]
}


export const mandiri : VirtualAccountInfo[] = [
  atm,
  ibanking,
  livinApp,
]
