import styled from "styled-components"
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { useNavigate } from "react-router-dom"
import Button from "../components/Button"
import { deleteProviderById } from "../features/fornecedor/fornecedorSlice"
import EditDeleteButton from "../components/EditDeleteButton"

const Title = styled.h1`
    color: #222;
    margin: 30px 0;
`
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
    min-width: 90px;
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

export default function Fornecedores() {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const fornecedores = useAppSelector(state => state.fornecedor.fornecedores)

    return (
        <>
            <Title>Fornecedores</Title>
            <Button onClick={() => navigate('/novoFornecedor')} text={'Cadastrar Novo Fornecedor'} />
            <ListHeader>
                <ListHeaderItem flex={1}>Fornecedor</ListHeaderItem>
                <ListHeaderItem style={{ textAlign: 'center' }}>Editar</ListHeaderItem>
                <ListHeaderItem style={{ textAlign: 'center' }}>Deletar</ListHeaderItem>
            </ListHeader>
            {
                fornecedores.map((item) => (
                    <Fornecedor key={item.id}>
                        <FornecedorLi>{item.name}</FornecedorLi>
                        <EditDeleteButton
                            onClick={() => navigate(`/fornecedores/${item.id}`, { state: item })}
                        >
                            <AiOutlineEdit />
                        </EditDeleteButton>
                        <EditDeleteButton
                            onClick={() => dispatch(deleteProviderById(item.id!))}
                        >
                            <AiOutlineDelete />
                        </EditDeleteButton>
                    </Fornecedor>
                ))
            }
        </>
    )
}
