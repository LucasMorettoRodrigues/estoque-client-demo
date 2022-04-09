export type TProduct = {
    id?: number,
    name: string,
    code: number,
    brand: string,
    category: string,
    unit: string,
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