import { Autocomplete, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { FormEvent, useRef, useState } from 'react'
import styled from 'styled-components'
import { useAppSelector } from '../../app/hooks'
import { formatValidity, isExpired } from '../../utils/functions'
import Button from '../UI/Button'
import Form from '../UI/Form'
import Input from '../UI/Input'

const InputContainer = styled.div<{ flex: number, minWidth?: string }>`
    flex: ${props => props.flex};
    min-width: ${props => props.minWidth};
    display: flex;
    margin-right: 20px;
    flex-direction: column;
    font-size: 14px;
    margin-bottom: 10px;
`

type Props = {
    onSubmit: (productId: number, subProductId: number, quantity: number) => void,
}

export default function RetirarForm({ onSubmit }: Props) {

    const products = useAppSelector(state => state.produto.produtos)

    const [quantity, setQuantity] = useState(1)
    const [subProductId, setSubProductId] = useState(0)
    const [productId, setProductId] = useState(0)
    const elmRef = useRef(null as HTMLElement | null);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = '')
        );

        elmRef.current!.querySelector("button")?.click();

        Array.from(document.querySelectorAll("select")).forEach(
            input => (input.value = '')
        );

        onSubmit(productId, subProductId, quantity)
    }

    return (
        <Form onSubmit={handleSubmit}>
            <InputContainer flex={1} minWidth='80vw'>
                <Autocomplete
                    ref={elmRef}
                    disablePortal
                    onChange={(event, newValue) => setProductId(newValue?.id || 0)}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    id="select"
                    options={
                        products.map(i => ({
                            label: `${i.id} - ${i.name} - ${i.brand} - ${i.unit}`, id: i.id
                        }))
                    }
                    sx={{ backgroundColor: 'white', marginTop: '20px' }}

                    renderInput={(params) =>
                        <TextField {...params} label="Produto" size='small' />}
                />
            </InputContainer>
            <InputContainer flex={1} minWidth='60vw'>
                <FormControl sx={{ m: 0, minWidth: 120, backgroundColor: 'white', marginTop: '20px' }} size="small">
                    <InputLabel id="select-Lote/Validade">Lote/Validade</InputLabel>
                    <Select
                        sx={{ fontSize: '14px', padding: '2px' }}
                        labelId="lote"
                        id="lote"
                        value={subProductId}
                        required
                        label="Lote/Validade"
                        onChange={(e) => typeof e.target.value === 'string'
                            ? setSubProductId(parseInt(e.target.value))
                            : setSubProductId(e.target.value)}
                    >
                        {
                            products.filter(item => item.id === productId).map(item => (
                                item.subproducts?.map((item, index) => (
                                    <MenuItem style={{ color: isExpired(item.validade!) ? 'red' : 'black', backgroundColor: `${index === 0 && 'lightgreen'}` }} key={item.id} value={item.id}>
                                        {item.lote} / {formatValidity(item.validade)}
                                    </MenuItem>
                                ))
                            ))
                        }
                    </Select>
                </FormControl>
            </InputContainer>
            <InputContainer flex={0.5}>
                <Input
                    name='quantity'
                    label='Quantidade'
                    type='number'
                    min={1}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    required
                />
            </InputContainer>
            <Button style={{ marginTop: '10px', marginRight: '20px' }} text={'Lançar'} />
        </Form>
    )
}



