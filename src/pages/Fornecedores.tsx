import styled from "styled-components"
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { useNavigate } from "react-router-dom"
import Button from "../components/Button"
import { deleteProviderById } from "../features/fornecedor/fornecedorSlice"
import EditDeleteButton from "../components/EditDeleteButton"
import ListHeader from "../components/List/ListHeader"
import Item from "../components/List/Item"
import ItemsContainer from "../components/List/ItemsContainer"

const Title = styled.h1`
    color: #222;
    margin: 30px 0;
`
const ButtonContainer = styled.div`
    margin-bottom: 20px;
`

export default function Fornecedores() {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const fornecedores = useAppSelector(state => state.fornecedor.fornecedores)

    return (
        <>
            <Title>Fornecedores</Title>
            <ButtonContainer>
                <Button onClick={() => navigate('/novoFornecedor')} text={'Cadastrar Novo Fornecedor'} />
            </ButtonContainer>
            <ListHeader>
                <Item flex={1} text='Fornecedor' />
                <Item width='90px' text='Editar' align='center' />
                <Item width='90px' text='Deletar' align='center' />
            </ListHeader>
            {
                fornecedores.map((item) => (
                    <ItemsContainer key={item.id}>
                        <Item flex={1} text={item.name} />
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
                    </ItemsContainer>
                ))
            }
        </>
    )
}
