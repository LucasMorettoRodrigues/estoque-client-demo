import styled from "styled-components"

const SItem = styled.div<{
    fontSize?: string, flex?: number, width?: string, align?: string,
    bg?: string, cursor?: string, color?: string
}>`
    flex: ${props => props.flex ? props.flex : null};
    padding: 10px;
    font-size: ${props => props.fontSize ? props.fontSize : '14px'};
    flex: ${props => props.flex ? props.flex : null};
    width: ${props => props.width ? props.width : null};
    text-align: ${props => props.align === 'center' ? props.align : null};
    background-color: ${props => props.bg ? props.bg : null};
    color: ${props => props.color ? props.color : null};
    cursor: ${props => props.cursor === 'pointer' ? props.cursor : null};
`

type Props = {
    text: any,
    fontSize?: string
    align?: string,
    width?: string,
    flex?: number,
    bg?: string,
    color?: string,
    cursor?: string,
    onClick?: () => void
}

export default function Item({ fontSize, align, width, flex, text, bg, onClick, cursor, color }: Props) {
    return (
        <SItem fontSize={fontSize} align={align} width={width} flex={flex}
            bg={bg} onClick={onClick} cursor={cursor} color={color} >
            {text}
        </SItem>
    )
}
