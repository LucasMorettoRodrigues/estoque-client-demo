export type TStockIn = {
    id?: number,
    date?: string,
    product_id: number,
    provider_id: number,
    price: string,
    lote: string | null,
    validade: string | null,
    quantity: number,
}