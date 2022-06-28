import styled from "styled-components"
import { TProduct } from "../../types/TProduct"
import { AiOutlineDelete } from 'react-icons/ai'
import { TSubProduct } from "../../types/TSubProduct"
import EditDeleteButton from "../UI/EditDeleteButton"
import ListHeader from "../List/ListHeader"
import Item from "../List/Item"
import ItemsContainer from "../List/ItemsContainer"
import { formatValidity } from '../../utils/functions'

const ProductListContainer = styled.div`
    margin-bottom: 30px;
`

type TProductList = {
    product: TProduct,
    subProduct: TSubProduct | null,
    quantity: number
}

type Props = {
    productList: TProductList[],
    deleteItem: (index: number) => void,
}

export default function RetirarEAjustarList({ productList, deleteItem }: Props) {

    return (
        <>
            {
                productList.length > 0 &&
                <>
                    <ProductListContainer>
                        <ListHeader>
                            <Item flex={1} text='Produto' />
                            <Item flex={0.4} text='Marca' />
                            <Item flex={0.2} text='Lote' />
                            <Item flex={0.25} text='Validade' />
                            <Item flex={0.1} align="center" text='Qtd' />
                            <Item width='50px' text='' align='center' />
                        </ListHeader>
                        <>
                            {
                                productList.map((item, index) => (
                                    <ItemsContainer key={index}>
                                        <Item flex={1} text={item.product.name} />
                                        <Item flex={0.4} text={item.product.brand} />
                                        <Item flex={0.2} text={item.subProduct?.lote} />
                                        <Item flex={0.25} text={formatValidity(item.subProduct?.validade)} />
                                        <Item flex={0.1} text={item.quantity} align="center" />
                                        <EditDeleteButton
                                            width='50px'
                                            onClick={() => deleteItem(index)}
                                        >
                                            <AiOutlineDelete />
                                        </EditDeleteButton>
                                    </ItemsContainer>
                                ))
                            }
                        </>
                    </ProductListContainer>
                </>
            }
        </>
    )
}
