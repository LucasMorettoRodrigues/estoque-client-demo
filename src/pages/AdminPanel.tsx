import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppSelector } from "../app/hooks";
import Title from "../components/Title";
import { formatValidity } from "../utils/functions";

const Info = styled.div`
    font-size: 18px;
    margin-bottom: 30px;
    margin-left: 50px;
`
const Box = styled.div`
    display: flex;
    justify-content: space-around;
    padding: 20px;
    width: 80%;
    margin: 5px auto;
    border-radius: 5px;
    background-color: white;
    align-self: center;
    justify-self:center;
    cursor: pointer;

    &:hover {
        transform: scale(1.02);
        background-color: #badaf8;
    } 
`

export default function AdminPanel() {

    const navigate = useNavigate()
    const carts = useAppSelector(state => state.cart.carts)

    return (
        <>
            <Title title='Bem Vindo'></Title>
            <Info>Você possui {carts.length} solicitações pendentes.</Info>
            {carts.map((cart, index) => (
                <Box key={index} onClick={() => navigate('/comprar', { state: cart })}>
                    <div>Solicitação de Compra</div>
                    <div>Data: {formatValidity(cart.createdAt)}</div>
                </Box>
            ))}
        </>
    )
}
