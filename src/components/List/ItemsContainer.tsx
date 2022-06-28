import { useState } from "react";
import styled from "styled-components"

const Container = styled.ul<{ type?: string, bg?: string, click: boolean }>`
    width: 100%;
    height: 40px;
    background-color: ${props => props.bg ? props.bg : '#cbe6ff'};
    display: flex;
    align-items: center;
    border-top: ${props => props.type === 'subItem' ? 'none' : '1px solid #c9c9c9'} ;
    cursor: pointer;

    &:hover {
      filter: ${props => props.click && 'contrast(1.1)'};
      transform: ${props => props.click && 'scale(1.005)'};
    }
`

type Props = {
  children: JSX.Element | JSX.Element[]
  onClick?: () => void;
  type?: string;
  bg?: string,
  subproducts?: JSX.Element | JSX.Element[]
}

export default function ItemsContainer({ children, onClick, type, bg, subproducts }: Props) {

  const [showSubProducts, setShowSubproducts] = useState(false)

  const handleOnClick = () => {
    if (onClick !== undefined) {
      onClick()
    } else {
      setShowSubproducts(!showSubProducts)
    }
  }

  return (
    <>
      <Container onClick={handleOnClick} type={type} bg={bg} click={onClick ? true : false}>
        {children}
      </Container>
      {showSubProducts && subproducts}
    </>

  )
}
