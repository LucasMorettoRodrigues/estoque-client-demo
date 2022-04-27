import styled from "styled-components"

const SItem = styled.div<{ fontSize?: string, flex?: number, width?: string, align?: string, color?: string }>`
    flex: ${props => props.flex ? props.flex : null};
    padding: 10px;
    font-size: ${props => props.fontSize ? props.fontSize : '14px'};
    flex: ${props => props.flex ? props.flex : null};
    width: ${props => props.width ? props.width : null};
    text-align: ${props => props.align === 'center' ? props.align : null};
    color: ${props => props.color === 'center' ? props.color : null};
`

type Props = {
    text: string | number | string[],
    fontSize?: string
    align?: string,
    width?: string,
    flex?: number
    color?: string
}

export default function Item({ fontSize, align, width, flex, text, color }: Props) {
    return (
        <SItem fontSize={fontSize} align={align} width={width} flex={flex} color={color} >
            {text}
        </SItem>
    )
}
