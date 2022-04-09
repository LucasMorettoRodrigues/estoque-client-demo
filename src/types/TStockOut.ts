export type TStockOut = {
    id?: number,
    date?: string,
    product_id: number,
    subproduct_id?: number | null,
    lote?: string | null,
    validade?: string | null,
    quantity: number
}