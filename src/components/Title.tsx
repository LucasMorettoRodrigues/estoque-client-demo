import styled from 'styled-components'

const STitle = styled.h1<{ display?: string }>`
    color: #222;
    margin: 30px 0;
`

type Props = {
    title: string
}

export default function Title({ title }: Props) {
    return (
        <STitle>
            {title}
        </STitle>
    )
}

