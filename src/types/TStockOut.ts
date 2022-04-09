export type TStockOut = {
    id?: number,
    date?: string,
    product_id: number,
    subproduct_id: number | null,
    quantity: number
}