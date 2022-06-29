export type TStockOut = {
    id?: number,
    product_id: number,
    subproduct_id?: number | null,
    lote?: string | null,
    validade?: string | null,
    quantity: number,
    user_id?: string,
    password?: string
    username?: string,
    force?: boolean,
    product?: {
        name: string,
        brand: string,
        unit: string,
        category: string
    },
    user?: {
        name: string
    },
    createdAt?: string,
    notification?: {
        description: string,
        data: any
    } | null
}