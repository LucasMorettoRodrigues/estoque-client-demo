export type TProduct = {
    id?: number,
    name: string,
    code: string,
    brand: string,
    category: string,
    unit: string,
    stock: number,
    max_stock: number,
    min_stock: number,
    lote?: string,
    validade?: string,
    quantity?: number,
    observation: string | null,
    hide?: boolean,
    providers?: string[],
    inventory?: number,
    subproducts?: {
        id: number,
        lote: string,
        validade: string | null,
        quantity: number
    }[]
}