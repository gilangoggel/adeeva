import  type { ItemGroup, ComponentProps } from './types'

const resellerLinks : ItemGroup [] = [
  {
    title: "Produk",
    items:[
      {
        to: "/product",
        text: "Data produk"
      },
      {
        to: "/product/add",
        text: "Pesan produk"
      },
      {
        to: "/product/order",
        text: "Riwayat pesanan produk"
      },
    ]
  },
  {
    title: "Transaksi",
    items:[
      {
        to: "transaction",
        text: "Transaksi selesai"
      },
      {
        to: "/transaction/order",
        text: "Order"
      },
      {
        to: "/transaction/shipping",
        text: "Pesanan terkirim"
      },
      {
        to: "/transaction/invalid",
        text: "Pesanan yang dibatalkan"
      },
    ]
  }
]

const adminLinks : ItemGroup[] = [
  {
    title: "Produk",
    items:[
      {
        to: "/product",
        text: "Data produk"
      },
      {
        to: "/product/create",
        text: "Tambah produk"
      },
    ]
  },
  {
    title: "Reseller",
    items:[
      {
        to: "/reseller-order",
        text: "Pembelian produk"
      },
      {
        to: "/reseller",
        text: "Data reseller"
      },
      {
        to: "/reseller/create",
        text: "Tambah reseller"
      },
    ]
  },
  {
    title: "Pengguna",
    items:[
      {
        to: "/user",
        text: "Data pengguna"
      },
    ]
  },
  {
    title: "Transaksi",
    items:[
      {
        to: "/transaction",
        text: "Data transaksi"
      },
      {
        to: "/order",
        text: "Order"
      },
      {
        to: "/shipment",
        text: "Pengiriman"
      },
      {
        to: "/retur",
        text: "Pengembalian"
      },
    ]
  },
];

export function routeList(mode: ComponentProps['mode']){
  return mode === "admin" ? adminLinks: resellerLinks
}
