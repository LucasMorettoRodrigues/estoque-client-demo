import styled from "styled-components"

const Container = styled.ul<{ type?: string, bg?: string, click: boolean }>`
    width: 100%;
    height: 40px;
    background-color: ${props => props.bg ? props.bg : '#cbe6ff'};
    display: flex;
    align-items: center;
    border-top: ${props => props.type === 'subItem' ? 'none' : '1px solid #c9c9c9'} ;
    cursor: ${props => props.click && 'pointer'};

    &:hover {
      filter: ${props => props.click && 'contrast(1.1)'};
      transform: ${props => props.click && 'scale(1.005)'};
    }
`

type Props = {
  children: JSX.Element[]
  onClick?: () => void;
  type?: string;
  bg?: string
}

export default function ItemsContainer({ children, onClick, type, bg }: Props) {
  return (
    <Container onClick={onClick} type={type} bg={bg} click={onClick ? true : false}>
      {children}
    </Container>
  )
}
