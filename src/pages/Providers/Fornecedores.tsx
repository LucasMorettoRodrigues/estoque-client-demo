import styled from "styled-components"
import { useAppSelector } from "../../app/hooks"
import { useNavigate } from "react-router-dom"
import Button from "../../components/UI/Button"
import ListHeader from "../../components/List/ListHeader"
import Item from "../../components/List/Item"
import ItemsContainer from "../../components/List/ItemsContainer"
import Title from "../../components/UI/Title"

const ButtonContainer = styled.div`
    margin-bottom: 20px;
`

export default function Fornecedores() {

    const navigate = useNavigate()
    const fornecedores = useAppSelector(state => state.fornecedor.fornecedores)

    return (
        <>
            <Title title='Fornecedor' />
            <ButtonContainer>
                <Button onClick={() => navigate('/novoFornecedor')} text={'Cadastrar Novo Fornecedor'} />
            </ButtonContainer>
            <ListHeader>
                <Item flex={1} text='Fornecedor' />
            </ListHeader>
            {
                fornecedores.map((item) => (
                    <ItemsContainer
                        key={item.id}
                        onClick={() => navigate(`/fornecedores/${item.id}`, { state: item })}
                    >
                        <Item flex={1} text={item.name} />
                    </ItemsContainer>
                ))
            }
        </>
    )
}
