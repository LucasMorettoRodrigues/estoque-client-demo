import styled from "styled-components"
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { useNavigate } from "react-router-dom"
import Button from "../components/Button"
import { deleteProviderById } from "../features/fornecedor/fornecedorSlice"

const Container = styled.div``
const Wrapper = styled.div`
    max-width: 1300px;
    margin: 0 auto;
    padding: 40px 20px;
`
const ListHeader = styled.div`
    background-color: #add9ff;
    display: flex;
    align-items: center;
    border-bottom: 1px solid lightgray;
    font-size: 18px;
`
const ListHeaderItem = styled.p<{ flex?: number }>`
    flex: ${props => props.flex ? props.flex : null};
    min-width: 75px;
    padding: 10px;
`
const FornecedoresList = styled.div`
    background-color: aliceblue;
`
const Fornecedor = styled.ul`
    display: flex;
    align-items: center;
    border-bottom: 1px solid lightgray;
`
const FornecedorName = styled.li`
    flex: 2;
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
        <Container>
            <Wrapper>
                <Button onClick={() => navigate('/novoFornecedor')} text={'Cadastrar Novo Fornecedor'} />
                <ListHeader>
                    <ListHeaderItem flex={1}>Fornecedor</ListHeaderItem>
                    <ListHeaderItem>Editar</ListHeaderItem>
                    <ListHeaderItem>Deletar</ListHeaderItem>
                </ListHeader>
                <FornecedoresList>
                    {
                        fornecedores.map((item) => (
                            <Fornecedor key={item.id}>
                                <FornecedorName>{item.name}</FornecedorName>
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
                </FornecedoresList>
            </Wrapper>
        </Container>
    )
}
