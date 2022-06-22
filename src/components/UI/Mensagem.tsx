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
const Title = styled.h2<{ message?: string }>`
    color: ${props => props.message === "Sucesso"
        ? '#3dc73d'
        : props.message === 'Erro'
            ? '#ff3232'
            : 'black'};
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
`
const Text = styled.p`
    font-size: 14px;
    white-space: "pre-line";
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
    onClick: (arg0: string) => void,
    onClose?: () => void,
    message: {
        title: string,
        message: string
    }
}

export default function Mensagem({ onClick, onClose, message }: Props) {
    return (
        <Container>
            <Wrapper>
                <Box>
                    <Title message={message.title}>{message.title}</Title>
                    <ErrorsContainer>
                        <Text style={{ whiteSpace: "pre-line" }}>
                            {message.message.replaceAll(',', '')}
                        </Text>
                    </ErrorsContainer>
                    <ButtonContainer>
                        {onClose &&
                            <Button bg={'#ff3232'} onClick={onClose}>Cancelar</Button>
                        }
                        <Button bg={'#3dc73d'} onClick={() => onClick(message.title)}>OK</Button>
                    </ButtonContainer>
                </Box>
            </Wrapper>
        </Container>
    )
}
