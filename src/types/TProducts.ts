export type TProducts = {
    id: number,
    name: string,
    quantity: number,
    subproducts?: {
        id: number,
        lote: string,
        validade: string,
        quantity: number
    }[]
}