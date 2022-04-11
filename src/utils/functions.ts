import { TProduct } from "../types/TProduct"
import { TProvider } from "../types/TProvider"
import { TSubProduct } from "../types/TSubProduct"

export const dateToString = (date: Date): string => {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`
}

export const getProduct = (products: TProduct[], product_id: number | undefined): TProduct | null => {
    if (!product_id) return null

    const product = products.find((item) => (item.id === product_id))

    if (!product) return null

    return product
}

export const getSubProduct = (products: TProduct[], product_id: number | undefined | null, subProduct_id: number | undefined | null): TSubProduct | null => {
    if (!product_id || !subProduct_id) return null

    const product = getProduct(products, product_id)

    if (!product) return null

    const subProduct = product.subproducts?.find(item => item.id === subProduct_id)

    if (!subProduct) return null

    return subProduct
}

export const getProvider = (providers: TProvider[], provider_id: number | undefined): TProvider | undefined | null => {
    if (!provider_id) return

    const provider = providers.find((item) => (item.id === provider_id))

    return provider
}

export const getSubProductByLote = (products: TProduct[], product_id: number | undefined | null, lote: string | undefined | null): TSubProduct | undefined => {
    if (!product_id || !lote) return

    const product = getProduct(products, product_id)

    if (!product) return

    const subProduct = product.subproducts?.find(item => item.lote === lote)

    return subProduct
}