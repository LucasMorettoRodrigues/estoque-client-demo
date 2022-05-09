import styled from "styled-components"

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #00000084;
    z-index: 100;
`
const Title = styled.h2`
    color: #ff3232;
    margin-bottom: 15px;
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
    width: 320px;
    justify-content: center;
    border-radius: 15px;
    background-color: white;
    padding: 20px;
`
const ErrorsContainer = styled.div`
    margin-bottom: 20px;

    >p {
        font-size: 14px;
    }
`
const Button = styled.button<{ bg: string }>`
    background-color: ${props => props.bg};
    color: white;
    border: none;
    margin: 0 10px;
    padding: 10px 30px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
        opacity: 0.95;
    }
`
const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
`

type Props = {
    error?: string,
    warning?: string,
    onClick: () => void,
    onClose?: () => void
}

export default function Mensagem({ error, warning, onClick, onClose }: Props) {
    return (
        <Container>
            <Wrapper>
                <Box>
                    <Title>{error ? "Erro" : "Atenção"}</Title>
                    <ErrorsContainer>
                        <p>{error ? error : warning}</p>
                    </ErrorsContainer>
                    <ButtonContainer>
                        {onClose &&
                            <Button bg={'#ff3232'} onClick={onClose}>Cancelar</Button>
                        }
                        <Button bg={'#3dc73d'} onClick={onClick}>OK</Button>
                    </ButtonContainer>
                </Box>
            </Wrapper>
        </Container>
    )
}