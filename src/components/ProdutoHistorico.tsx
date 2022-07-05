import { useLocation } from "react-router-dom"
import { TProduct } from "../types/TProduct"
import ListOperations from "../pages/Historic/ListOperations"

export default function ProdutoHistorico() {

    const location = useLocation()
    const product = location.state as TProduct;

    return (
        <ListOperations productFilter={product.name} />
    )
}
