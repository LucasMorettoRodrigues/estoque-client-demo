import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import Button from "../components/Button"
import { useAppSelector } from "../app/hooks"
import { TProduct } from "../types/TProduct"

const Container = styled.div``
const Wrapper = styled.div`
    max-width: 1300px;
    margin: 0 auto;
    padding: 40px 20px;
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
    min-width: 75px;
    padding: 10px;
`
const Product = styled.ul`
    height: 40px;
    background-color: #cbe6ff;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #cacaca;
`
const SubProduct = styled.ul`
    height: 40px;
    display: flex;
    background-color: #eef7ff;
    align-items: center;
    border-bottom: 1px solid #e4e4e4;
`
const ProductLi = styled.li<{ flex?: number, color?: string }>`
    flex: ${props => props.flex ? props.flex : null};
    background-color: ${props => props.color ? props.color : null};
    font-size: 14px;
    min-width: 75px;
    padding: 10px;
`
const SubProductLi = styled.li<{ flex?: number }>`
    flex: ${props => props.flex ? props.flex : null};
    font-size: 14px;
    margin-left: 20px;
    color: #555;
    min-width: 120px;
    padding: 10px;
`
const Form = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`
const InputContainer = styled.div<{ flex: number }>`
    flex: ${props => props.flex};
    display: flex;
    margin-right: 20px;
    flex-direction: column;
    font-size: 14px;
`
const Label = styled.label`
    margin-left: 4px;
    margin-bottom: 4px;
`
const Select = styled.select`
    padding: 10px;
    width: 100%;
    outline-color: lightblue;
    background-color: white;
    border: 1px solid lightgray;
    border-radius: 5px;
    margin-bottom: 20px;
`
const Input = styled.input`
    padding: 10px;
    width: 100%;
    outline-color: lightblue;
    background-color: white;
    border: 1px solid lightgray;
    border-radius: 5px;
    margin-bottom: 20px;
`
const FormButton = styled.button`
    background-color: #3dc73d;
    color: white;
    border: none;
    padding: 12px 25px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 600;
`
const Title = styled.h1`
    color: #222;
    margin-bottom: 30px;
`


export default function Compra() {

    const navigate = useNavigate()
    const products = useAppSelector(state => state.produto.produtos)

    return (
        <Container>
            <Wrapper>
                <Title>Comprar Produtos</Title>
                <Form>
                    <InputContainer flex={4}>
                        <Label>Produto</Label>
                        <Select>
                            <option>z</option>
                            <option>b</option>
                            <option>c</option>
                        </Select>
                    </InputContainer>
                    <InputContainer flex={2}>
                        <Label>Fornecedor</Label>
                        <Select>
                            <option>z</option>
                            <option>b</option>
                            <option>c</option>
                        </Select>
                    </InputContainer>
                    <InputContainer flex={1}>
                        <Label>Preço</Label>
                        <Input></Input>
                    </InputContainer>
                    <InputContainer flex={1}>
                        <Label>Quantidade</Label>
                        <Input></Input>
                    </InputContainer>
                    <InputContainer flex={1}>
                        <Label>Lote</Label>
                        <Input></Input>
                    </InputContainer>
                    <InputContainer flex={1}>
                        <Label>Validade</Label>
                        <Input type='date'></Input>
                    </InputContainer>
                    <FormButton>Lançar</FormButton>
                </Form>


                <ListHeader>
                    <ListHeaderItem flex={3}>Produto</ListHeaderItem>
                    <ListHeaderItem flex={1}>Categoria</ListHeaderItem>
                    <ListHeaderItem flex={1}>Unidade</ListHeaderItem>
                    <ListHeaderItem flex={1}>Fornecedor</ListHeaderItem>
                    <ListHeaderItem flex={1}>Preço</ListHeaderItem>
                </ListHeader>
                {
                    products.map((item) => (
                        <Container key={item.id}>
                            <Product>
                                <ProductLi flex={3}>{item.name}</ProductLi>
                                <ProductLi flex={1}>{item.category}</ProductLi>
                                <ProductLi flex={1}>{item.unit}</ProductLi>
                                <ProductLi flex={1}>{item.provider_id}</ProductLi>
                                <ProductLi flex={1}>{item.price}</ProductLi>
                            </Product>
                            {item.subproducts &&
                                item.subproducts.map((subitem) => (
                                    <SubProduct key={subitem.id}>
                                        <SubProductLi>Lote: {subitem.lote}</SubProductLi>
                                        <SubProductLi>Validade: {subitem.validade.slice(0, 10)}</SubProductLi>
                                        <SubProductLi>Quantidade: {subitem.quantity}</SubProductLi>
                                    </SubProduct>
                                ))
                            }
                        </Container>
                    ))
                }
            </Wrapper>
        </Container>
    )
}
