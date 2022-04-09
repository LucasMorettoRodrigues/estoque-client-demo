import { TProduct } from "../types/TProduct"
import { TProvider } from "../types/TProvider"
import { TSubProduct } from "../types/TSubProduct"

export const dateToString = (date: Date): string => {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`
}

export const getProduct = (products: TProduct[], product_id: number | undefined): TProduct | undefined | null => {
    if (!product_id) return

    const product = products.find((item) => (item.id === product_id))

    return product
}

export const getSubProduct = (products: TProduct[], product_id: number | undefined | null, subProduct_id: number | undefined | null): TSubProduct | undefined => {
    if (!product_id || !subProduct_id) return

    const product = getProduct(products, product_id)

    if (!product) return

    const subProduct = product.subproducts?.find(item => item.id === subProduct_id)

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