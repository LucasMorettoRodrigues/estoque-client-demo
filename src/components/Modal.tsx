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
    color: #111;
    font-size: 20px;
    margin-bottom: 15px;
    margin-top: 10px;
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
    width: 350px;
    justify-content: center;
    border-radius: 15px;
    background-color: #f7f7f7;
    padding: 10px;
`
const ButtonContainer = styled.div`
    display: flex;
    width: 100%;
    gap: 10px;
`
const CategoryButton = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    height: 100px;
    border-radius: 10px;
    font-size: 15px;
    background-color: white;
    color: #111;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;

    &:hover {
        transform: scale(1.03);
    }
`

type Props = {
    selectCategory: (categories: string[]) => void
}

export default function Modal({ selectCategory }: Props) {
    return (
        <Container>
            <Wrapper>
                <Box>
                    <Title>Selecione a categoria:</Title>
                    <ButtonContainer>
                        <CategoryButton onClick={() => selectCategory(['Reagentes', 'Kits'])}>
                            Reagentes e Kits
                        </CategoryButton>
                        <CategoryButton onClick={() => selectCategory(['Descartáveis'])} >
                            Descartáveis
                        </CategoryButton>
                    </ButtonContainer>
                </Box>
            </Wrapper>
        </Container>
    )
}
