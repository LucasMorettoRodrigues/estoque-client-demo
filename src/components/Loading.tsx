import styled from "styled-components"

const Container = styled.div`
    position: fixed;
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

export default function Loading() {
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
