export type SidebarContentItem = {
  path: string;
  label: string;
};
export type SidebarContent = {
  label: string;
  items: SidebarContentItem[];
};
export const reseller: (SidebarContent | SidebarContentItem)[] = [
  {
    label: "Laporan",
    items: [
      {
        path: "/backoffice/order",
        label: "Order",
      },
      {
        path: "/backoffice/delivery",
        label: "Pengiriman",
      },
      {
        path: "/backoffice/transaction",
        label: "Transaksi",
      },
    ],
  },
  {
    label: "Stock barang",
    items: [
      {
        path: "/backoffice/stock",
        label: "Stok produk",
      },
      {
        path: "/backoffice/stock-request",
        label: "Order stok produk",
      },
    ],
  },
];
export const user: (SidebarContent | SidebarContentItem)[] = [];
export const admin: (SidebarContent | SidebarContentItem)[] = [
  {
    label: "Produk",
    path: "/backoffice/product",
  },
  {
    label: "Pengguna",
    items: [
      {
        path: "/backoffice/user",
        label: "Pelanggan",
      },
      {
        path: "/backoffice/reseller",
        label: "Reseller",
      },
    ],
  },
  {
    label: "Laporan",
    items: [
      {
        path: "/backoffice/order",
        label: "Order",
      },
      {
        path: "/backoffice/delivery",
        label: "Pengiriman",
      },
      {
        path: "/backoffice/retur",
        label: "Retur barang",
      },
      {
        path: "/backoffice/transaction",
        label: "Transaksi",
      },
    ],
  },
];
