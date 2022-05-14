import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import EditDeleteButton from "../components/EditDeleteButton";
import Title from "../components/Title";
import { deleteCart } from "../features/cart/cartSlice";
import { formatValidity } from "../utils/functions";
import { AiOutlineDelete } from 'react-icons/ai'

const Info = styled.div`
    font-size: 18px;
    margin-bottom: 30px;
    margin-left: 50px;
`
const Box = styled.div`
    display: flex;
    justify-content: space-around;
    padding: 10px;
    width: 80%;
    margin: 5px auto;
    border-radius: 5px;
    background-color: white;
    align-self: center;
    justify-self:center;
    cursor: pointer;

    &:hover {
        transform: scale(1.01);
        background-color: #badaf8;
    }
`
const BoxItem = styled.div`
    display: flex;
    align-items: center;
`

export default function AdminPanel() {

    const navigate = useNavigate()
    const carts = useAppSelector(state => state.cart.carts)
    const dispatch = useAppDispatch()

    return (
        <>
            <Title title='Bem Vindo'></Title>
            <Info>Você possui {carts.length} solicitações pendentes.</Info>
            {carts.map((cart, index) => (
                <Box key={index} >
                    <div style={{ display: 'flex', flex: 1, justifyContent: 'space-around' }} onClick={() => navigate('/comprar', { state: cart })}>
                        <BoxItem>Solicitação de Compra</BoxItem>
                        <BoxItem>Data: {formatValidity(cart.createdAt)}</BoxItem>
                    </div>
                    <EditDeleteButton onClick={() => dispatch(deleteCart(cart.id!))}>
                        <AiOutlineDelete />
                    </EditDeleteButton>
                </Box>
            ))}
        </>
    )
}
