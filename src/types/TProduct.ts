export type TProduct = {
    id?: number,
    name: string,
    code: number,
    brand: string,
    provider_id?: number,
    category: string,
    unit: string,
    price?: string
    stock: number,
    max_stock: number,
    min_stock: number,
    lote?: string,
    validade?: string,
    quantity?: number,
    subproducts?: {
        id: number,
        lote: string,
        validade: string,
        quantity: number
    }[]
}