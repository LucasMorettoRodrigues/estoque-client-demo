import { Link } from "react-router-dom";
import styled from "styled-components";
import { getUser, logout } from "../services/auth.service";

const Container = styled.div`
    background-color: #5fb4ff;
`
const Nav = styled.nav`
    max-width: 1300px;
    margin: 0 auto;
    padding: 0 20px;
    height: 58px;
`
const Wrapper = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
`
const Title = styled.h1`
    flex: 1;
`
const List = styled.ul`
    flex: 2;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const Item = styled.li`
    padding: 20px;
    color: #111;
    transition: all .2s ease-in-out;
    cursor: pointer;

    &:hover {
        color: #ffffff;
    }
`

export default function Navbar() {
    return (
        <Container>
            <Nav>
                <Wrapper>
                    <Title>Estoque</Title>
                    {getUser() &&
                        <List>
                            <Link to='/produtos/detalhes'><Item>Produtos</Item></Link>
                            <Link to='/fornecedores'><Item>Fornecedores</Item></Link>
                            <Link to='/comprar'><Item>Comprar</Item></Link>
                            <Link to='/retirar'><Item>Retirar</Item></Link>
                            <Link to='/ajustar'><Item>Ajustar</Item></Link>
                            <Link to='/historico'><Item>Histórico</Item></Link>
                            <Item onClick={() => logout()}>Sair</Item>
                        </List>
                    }
                </Wrapper>
            </Nav>
        </Container>
    )
}
