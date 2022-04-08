import styled from "styled-components"
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { useNavigate } from "react-router-dom"
import Button from "../components/Button"
import { deleteProviderById } from "../features/fornecedor/fornecedorSlice"

const ListHeader = styled.div`
    background-color: #5fb4ff;
    height: 45px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid lightgray;
    font-size: 15px;
    font-weight: bold;
    border-bottom: 1px solid #cacaca;
`
const ListHeaderItem = styled.p<{ flex?: number }>`
    flex: ${props => props.flex ? props.flex : null};
    min-width: 75px;
    padding: 10px;
`
const Fornecedor = styled.ul`

    background-color: #cbe6ff;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #cacaca;
`
const FornecedorLi = styled.li`
    flex: 1;
    background-color: ${props => props.color ? props.color : null};
    font-size: 14px;
    min-width: 75px;
    padding: 10px;
`
const ActionButton = styled.li`
    display: flex;
    align-items: center;
    font-size: 20px;
    min-width: 75px;
    padding: 10px;
    color: gray;
    cursor: pointer;

    &:hover {
        color: black;
    }
`

export default function Fornecedores() {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const fornecedores = useAppSelector(state => state.fornecedor.fornecedores)

    return (
        <>
            <Button onClick={() => navigate('/novoFornecedor')} text={'Cadastrar Novo Fornecedor'} />
            <ListHeader>
                <ListHeaderItem flex={1}>Fornecedor</ListHeaderItem>
                <ListHeaderItem>Editar</ListHeaderItem>
                <ListHeaderItem>Deletar</ListHeaderItem>
            </ListHeader>
            {
                fornecedores.map((item) => (
                    <Fornecedor key={item.id}>
                        <FornecedorLi>{item.name}</FornecedorLi>
                        <ActionButton
                            onClick={() => navigate(`/fornecedores/${item.id}`, { state: item })}
                        >
                            <AiOutlineEdit />
                        </ActionButton>
                        <ActionButton
                            onClick={() => dispatch(deleteProviderById(item.id!))}
                        >
                            <AiOutlineDelete />
                        </ActionButton>
                    </Fornecedor>
                ))
            }
        </>
    )
}
