export type TStockIn = {
    id?: number,
    product_id: number,
    provider_id: number,
    price: string,
    lote: string | null,
    validade: string | null,
    quantity: number,
    user?: {
        name: string
    }
    product?: {
        name: string,
        brand: string,
        unit: string,
        category: string
    },
    createdAt?: string,
    notification?: string,
    cart?: string
}