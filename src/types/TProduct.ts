import { TSubProduct, TSubProductInventory } from "./TSubProduct"

export type TProduct = {
    id: number,
    name: string,
    code: string,
    brand: string,
    category: string,
    unit: string,
    stock: number,
    max_stock: number,
    min_stock: number,
    observation: string | null
    hide?: boolean,
    providers?: string[],
    delivery_time?: number,
    product_child_id?: number | null,
    qty_to_child: number | null
    subproducts?: TSubProduct[]
}

export interface IProductInventory extends TProduct {
    subproducts: TSubProductInventory[]
}

export type TProductRequest = {
    name?: string,
    code?: string,
    brand?: string,
    category?: string,
    unit?: string,
    max_stock?: number,
    min_stock?: number,
    observation?: string | null
    delivery_time?: number | null,
    product_child_id?: number | null,
    qty_to_child?: number | null,
    hide?: boolean,
}