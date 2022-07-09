import styled from "styled-components"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import Input from "./Input"
import { SetCategoryFilter, setProviderFilter, SetSearchFilter, switchMissingFilter } from "../../features/product/productSlice"
import MUISelect from "../MultipleSelect"
import { SelectChangeEvent } from "@mui/material"

const Filter = styled.div`
    display: flex;
    align-items: center;
`
const InputContainer = styled.div`
    display: flex;
    align-items: center;
    margin-left: 20px;
`
const Label = styled.label`
    margin-right: 5px;
    cursor: pointer;
    color: #777;
`
const CheckBox = styled.input`
    padding: 5px 10px;
    margin-right: 5px;
    margin-left: 15px;
`

type Props = {
    hasMissingFilter: boolean,
    hasCategoryFilter: boolean
}

export default function Filters({ hasMissingFilter, hasCategoryFilter }: Props) {

    const dispatch = useAppDispatch()
    const productsData = useAppSelector(state => state.product.products)
    const providers = useAppSelector(state => state.provider.providers)
    const searchFilter = useAppSelector(state => state.product.searchFilter)
    const categoryFilter = useAppSelector(state => state.product.categoryFilter)
    const providerFilter = useAppSelector(state => state.product.providerFilter)
    const missingFilter = useAppSelector(state => state.product.missingFilter)

    let categories = Array.from(new Set(productsData.map(i => i.category)))

    const handleCategoryChange = (event: SelectChangeEvent<string[]>) => {
        const {
            target: { value },
        } = event;
        dispatch(SetCategoryFilter(
            typeof value === 'string' ? value.split(',') : value,
        ))
    };

    const handleProviderChange = (event: SelectChangeEvent<string[]>) => {
        const {
            target: { value },
        } = event;
        dispatch(setProviderFilter(
            typeof value === 'string' ? value.split(',') : value,
        ))
    };

    return (
        <Filter>
            <InputContainer style={{ marginTop: '1px' }}>
                <Input
                    name="search" label=""
                    display="flex" type='text'
                    value={searchFilter}
                    placeholder="Pesquisar"
                    onChange={(e) => dispatch(SetSearchFilter(e.target.value))}
                >
                </Input>
            </InputContainer>
            {hasCategoryFilter &&
                <InputContainer>
                    <MUISelect handleOnChange={handleCategoryChange} value={categoryFilter} options={categories} label="Categoria" />
                </InputContainer>
            }
            <InputContainer>
                <InputContainer style={{ marginLeft: 0 }}>
                    <MUISelect handleOnChange={handleProviderChange} value={providerFilter} options={providers.map(i => i.name)} label="Fornecedor" />
                </InputContainer>
            </InputContainer>
            {hasMissingFilter &&
                <>
                    <CheckBox
                        style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                        onChange={() => dispatch(switchMissingFilter())}
                        id="lowStock"
                        name="lowStock"
                        type='checkbox'
                        checked={missingFilter}
                    >
                    </CheckBox>
                    <Label htmlFor="lowStock">Produtos em falta</Label>
                </>
            }
        </Filter>
    )
}
