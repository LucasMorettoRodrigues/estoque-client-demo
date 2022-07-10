import { RootState } from "./store";

export const productsToAliquotSelector = (state: RootState) =>
    state.product.products.filter((product) => !!product.qty_to_child &&
        !!product.product_child_id
    )

export const archivedProducts = (state: RootState) =>
    state.product.products.filter(i => i.hide === true)