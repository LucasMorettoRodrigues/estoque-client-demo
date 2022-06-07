import styled from "styled-components"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import Input from "../../components/Input"
import Select from "../../components/Select"
import { SetCategoryFilter, setProviderFilter, SetSearchFilter, switchMissingFilter } from "../../features/produtos/produtoSlice"

const Filter = styled.div`
    display: flex;
    align-items: center;
`
const InputContainer = styled.div`
    display: flex;
    align-items: center;
    margin-right: 20px;
`
const Label = styled.label`
    margin-right: 5px;
    cursor: pointer;
    color: #777;
`
const CheckBox = styled.input`
    padding: 5px 10px;
    margin-right: 10px;
`

type Props = {
    hasMissingFilter: boolean,
    hasCategoryFilter: boolean
}

export default function Filters({hasMissingFilter, hasCategoryFilter}: Props) {

    const dispatch = useAppDispatch()
    const productsData = useAppSelector(state => state.produto.produtos)
    const providers = useAppSelector(state => state.fornecedor.fornecedores)
    const searchFilter = useAppSelector(state => state.produto.searchFilter)
    const categoryFilter = useAppSelector(state => state.produto.categoryFilter)
    const providerFilter = useAppSelector(state => state.produto.providerFilter)
    const missingFilter = useAppSelector(state => state.produto.missingFilter)

    let categories = Array.from(new Set(productsData.map(i => i.category)))

    return (
        <Filter>
            <InputContainer>
                <Input name="search" label="Pesquisar:" 
                    display="flex" type='text' 
                    value={searchFilter}
                    onChange={(e) => dispatch(SetSearchFilter(e.target.value))}
                >
                </Input>
            </InputContainer>
            { hasCategoryFilter && 
                <InputContainer>
                    <Select name="categories" label="Categoria:"
                        display="flex" value={categoryFilter}
                        onChange={(e) => dispatch(SetCategoryFilter(e.target.value))}
                    >
                        <option></option>
                        {categories.map((i, index) => <option key={index}>{i}</option>)}
                    </Select>
                </InputContainer>            
            }
            <InputContainer>
                <Select name="providers" label="Fornecedor:"
                    display="flex" value={providerFilter}
                    onChange={(e) => dispatch(setProviderFilter(e.target.value))}
                >
                    <option></option>
                    {providers.map(i => <option key={i.id} value={i.name}>{i.name}</option>)}
                </Select>
            </InputContainer>
            { hasMissingFilter && 
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
