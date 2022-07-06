export const idColumn = {
  key: "id",
    title: "Nomor transaksi",
  render(entity : any) {
    return `${entity.customer_id}${entity.id}`
  }
};
