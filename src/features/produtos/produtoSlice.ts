import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import { TAccount } from '../Types/taccount'
import axios from 'axios'
import { TProducts } from '../../types/TProducts'

export const getProdutos = createAsyncThunk(
    'produtos/getProdutos',
    async () => {
        try {
            const data = await axios.get('http://localhost:5000/api/v1/products')
            return data.data
        } catch (error) {
            console.log(error);
        }
    }
)

// export const addAccount = createAsyncThunk(
//     'accounts/addAccounts',
//     async (newAccount: TAccount, thunkAPI) => {
//         await axios.post('https://financas--api.herokuapp.com/api/v1/accounts', newAccount)
//         thunkAPI.dispatch(getAccounts())
//     }
// )

export const deleteProductById = createAsyncThunk(
    'products/deleteProduct',
    async (id: number, thunkAPI) => {
        await axios.delete(`http://localhost:5000/api/v1/products/${id}`)
        return id
    }
)

export const deleteSubProductById = createAsyncThunk(
    'products/deleteSubProduct',
    async (id: number, thunkAPI) => {
        await axios.delete(`http://localhost:5000/api/v1/subProducts/${id}`)
        return id
    }
)

// export const editAccount = createAsyncThunk(
//     'accounts/editAccounts',
//     async (account: TAccount, thunkAPI) => {
//         await axios.patch(`https://financas--api.herokuapp.com/api/v1/accounts/${account.id}`, account)
//         thunkAPI.dispatch(getAccounts())
//     }
// )

type State = {
    produtos: TProducts[],
    status: string | null
}

export const produtoSlice = createSlice({
    name: 'fornecedor',
    initialState: {
        produtos: [],
        status: null
    } as State,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getProdutos.pending, (state) => {
            state.status = 'loading'
        })
        builder.addCase(getProdutos.fulfilled, (state, action) => {
            state.status = 'success'
            state.produtos = action.payload
        })
        builder.addCase(getProdutos.rejected, (state) => {
            state.status = 'failed'
        })
        builder.addCase(deleteProductById.pending, (state) => {
            state.status = 'loading'
        })
        builder.addCase(deleteProductById.fulfilled, (state, action) => {
            state.status = 'success'
            state.produtos = state.produtos.filter((item) => item.id !== action.payload)
        })
        builder.addCase(deleteProductById.rejected, (state) => {
            state.status = 'failed'
        })
        builder.addCase(deleteSubProductById.pending, (state) => {
            state.status = 'loading'
        })
        builder.addCase(deleteSubProductById.fulfilled, (state, action) => {
            state.status = 'success'
            state.produtos = state.produtos.map((item) => item.subproducts
                ? { ...item, subproducts: item.subproducts.filter((subitem) => subitem.id !== action.payload) }
                : item
            )
        })
        builder.addCase(deleteSubProductById.rejected, (state) => {
            state.status = 'failed'
        })
    },
})

export default produtoSlice.reducer