import {LinkItem} from "./types";

function makeHref(tab: string){
  return `/account?tab=${tab}`
}

export const linkList : LinkItem[] = [
  {
    title: "Pembelian",
    links: [
      {
        label: "Menunggu pembayaran",
        href : makeHref('pending-payment')
      },
      {
        label: "Transaksi",
        href : makeHref("transaction")
      },
      {
        label: "Pengembalian barang",
        href : makeHref("retur")
      },
    ]
  },
  {
    title: "Pengaturan akun",
    links: [
      {
        label: "Alamat & kontak",
        href: makeHref("contact")
      },
      {
        label: "Email & password",
        href: makeHref("credential")
      },
    ]
  }
];
