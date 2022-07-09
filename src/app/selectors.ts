import { RootState } from "./store";

export const productsToAliquotSelector = (state: RootState) =>
    state.produto.produtos.filter((product) => !!product.qty_to_child &&
        !!product.product_child_id &&
        product.subproducts!.length > 0
    )