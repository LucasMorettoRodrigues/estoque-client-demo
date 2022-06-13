import styled from "styled-components"
import { useAppSelector } from "../../app/hooks"

const Container = styled.div`
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #00000084;
`
const Wrapper = styled.div`
    display: flex;
    height: 100vh;
    align-items: center;
    justify-content: center;
`
const Box = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 200px;
    justify-content: center;
    border-radius: 15px;
    background-color: white;
    padding: 20px;
`
const Loader = styled.div`
    border: 6px solid #f3f3f3;
    border-radius: 50%;
    border-top: 6px solid black;
    margin-top: 20px;
    width: 50px;
    height: 50px;
    animation: spin 2s linear infinite;

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`

export default function Loading({ loading }: { loading: boolean }) {

    const statusProvider = useAppSelector(state => state.fornecedor.status)
    const statusProduct = useAppSelector(state => state.produto.status)
    const statusStockIn = useAppSelector(state => state.stockIn.status)
    const statusStockOut = useAppSelector(state => state.stockOut.status)
    const statusAdjustStock = useAppSelector(state => state.adjustStock.status)

    if (loading) {
        return (
            <Container>
                <Wrapper>
                    <Box>
                        <p>Loading</p>
                        <Loader></Loader>
                    </Box>
                </Wrapper>
            </Container>
        )
    }

    if (
        statusProduct !== 'loading' ||
        statusProvider !== 'loading' ||
        statusStockIn !== 'loading' ||
        statusStockOut !== 'loading' ||
        statusAdjustStock !== 'loading') {
        return <></>
    }

    return (
        <Container>
            <Wrapper>
                <Box>
                    <p>Loading</p>
                    <Loader></Loader>
                </Box>
            </Wrapper>
        </Container>
    )
}
