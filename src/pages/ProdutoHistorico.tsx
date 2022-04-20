import { useLocation } from "react-router-dom"
import { TProduct } from "../types/TProduct"
import Historico from "./Historico"

export default function ProdutoHistorico() {

    const location = useLocation()
    const product = location.state as TProduct;

    return (
        <Historico productFilter={product.name} />
    )
}
