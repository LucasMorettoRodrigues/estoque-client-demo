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

export const getProvider = (providers: TProvider[], provider_id: number | undefined): TProvider | null => {
    if (!provider_id) return null

    const provider = providers.find((item) => (item.id === provider_id))

    if (!provider) return null

    return provider
}

export const getSubProductByLote = (products: TProduct[], product_id: number | undefined | null, lote: string | undefined | null): TSubProduct | undefined => {
    if (!product_id || !lote) return

    const product = getProduct(products, product_id)

    if (!product) return

    const subProduct = product.subproducts?.find(item => item.lote === lote)

    return subProduct
}

export const compareDates = (a: string, b: string): number => {
    let dateA: any = new Date(a);
    let dateB: any = new Date(b);
    return dateB - dateA;
}

export const mergeProducts = (products: TProduct[]): TProduct[] => {
    let res: TProduct[] = []
    for (let product of products) {
        if (!res.find(i => i.name === product.name)) {
            res = [...res, product]
        } else {
            res =
                res.map(i => (
                    i.name === product.name
                        ? {
                            ...i,
                            stock: i.stock + product.stock,
                            subproducts: product.subproducts ? [...i.subproducts!, ...product.subproducts] : i.subproducts
                        }
                        : i
                )
                )
        }
    }

    return res
}

export const compare = (array: TProduct[], property: 'category' | 'brand' | 'unit' | 'id' | 'name') => {
    return array.sort((a, b) => (a[property]! > b[property]!) ? 1 : ((b[property]! > a[property]!) ? -1 : 0))
}