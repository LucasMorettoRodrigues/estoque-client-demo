import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout } from "../../services/auth.service";
import { updateAuthentication } from '../../features/authentication/authentication'
import { productsToAliquotSelector } from "../../app/selectors";

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
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const Item = styled.li`
    z-index: 1;
    position: relative;
    padding: 14px;
    color: #111;
    transition: all .2s ease-in-out;
    cursor: pointer;

    &:hover {
        color: #ffffff;
    }
`
const LeaveBtn = styled.button`
    padding: 8px 14px;
    border-radius: 5px;
    border: none;
    background-color: #168eff;
    font-size: 14px;
    margin-left: 10px;
    color: #222;
    font-weight: 800;
    transition: all .2s ease-in-out;
    cursor: pointer;

    &:hover {
        background-color: #007bee;
    }
`

const Badge = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 500;
    position: absolute;
    top: 1px;
    right: 2px;
    font-size: 12px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: #f58c41;
`

export default function Navbar() {

    const auth = useAppSelector(state => state.authentication)
    const productsToAliquot = useAppSelector(productsToAliquotSelector)
    const dispatch = useAppDispatch()

    const handleOnClick = () => {
        logout()
        dispatch(updateAuthentication())
    }

    return (
        <Container>
            <Nav>
                <Wrapper>
                    <Title><Link to='/inbox' style={{ color: '#222' }}>Estoque</Link></Title>
                    {auth.authenticated &&
                        <List>
                            {auth.role === 'admin' &&
                                <>
                                    <Link to='/usuarios'><Item>Usuários</Item></Link>
                                    <Link to='/produtos/detalhes'><Item>Produtos</Item></Link>
                                    <Link to='/fornecedores'><Item>Fornecedores</Item></Link>
                                </>
                            }
                            <Link to='/inserir'><Item>Inserir</Item></Link>
                            <Link to='/retirar'><Item>Retirar</Item></Link>
                            {auth.role === 'admin' &&
                                <>
                                    <Link to='/ajustar'><Item>Ajustar</Item></Link>
                                </>
                            }
                            <Link to='/aliquotagem/em-espera'>
                                <Item>
                                    Alíquotagem
                                    {productsToAliquot.length > 0 && <Badge>{productsToAliquot.length}</Badge>}
                                </Item>
                            </Link>
                            <Link to='/novoInventario'><Item>Inventário</Item></Link>
                            {auth.role === 'admin' &&
                                <>
                                    <Link to='/historico'><Item>Histórico</Item></Link>
                                </>
                            }
                            <LeaveBtn onClick={handleOnClick}>
                                Sair
                            </LeaveBtn>
                        </List>
                    }
                </Wrapper>
            </Nav>
        </Container>
    )
}
