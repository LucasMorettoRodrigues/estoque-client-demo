import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import { TAccount } from '../Types/taccount'
import axios from 'axios'
import { TProduct } from '../../types/TProduct'
import { TSubProduct } from '../../types/TSubProduct'

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

export const createProduct = createAsyncThunk(
    'products/createProduct',
    async (newProduct: TProduct, thunkAPI) => {
        const product = await axios.post('http://localhost:5000/api/v1/products', newProduct)
        return product.data
    }
)

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

export const editProduct = createAsyncThunk(
    'products/editProduct',
    async (product: TProduct, thunkAPI) => {
        const result = await axios.patch(`http://localhost:5000/api/v1/products/${product.id}`, product)
        return result.data
    }
)

export const editSubProduct = createAsyncThunk(
    'products/editSubProduct',
    async (subProduct: TSubProduct, thunkAPI) => {
        const result = await axios.patch(`http://localhost:5000/api/v1/subProducts/${subProduct.id}`, subProduct)
        return result.data
    }
)

type State = {
    produtos: TProduct[],
    status: string
}

export const produtoSlice = createSlice({
    name: 'fornecedor',
    initialState: {
        produtos: [],
        status: 'success'
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
        builder.addCase(createProduct.pending, (state) => {
            state.status = 'loading'
        })
        builder.addCase(createProduct.fulfilled, (state, action) => {
            state.status = 'success'
            state.produtos.push(action.payload)
        })
        builder.addCase(createProduct.rejected, (state) => {
            state.status = 'failed'
        })
        builder.addCase(editProduct.pending, (state) => {
            state.status = 'loading'
        })
        builder.addCase(editProduct.fulfilled, (state, action) => {
            state.status = 'success'
            state.produtos = state.produtos
                .map((item) => item.id === action.payload.id
                    ? action.payload
                    : item
                )
        })
        builder.addCase(editProduct.rejected, (state) => {
            state.status = 'failed'
        })
        builder.addCase(editSubProduct.pending, (state) => {
            state.status = 'loading'
        })
        builder.addCase(editSubProduct.fulfilled, (state, action) => {
            state.status = 'success'
            console.log(action.payload);

            state.produtos = state.produtos
                .map((item) => item.id === action.payload.product_id
                    ? {
                        ...item,
                        subproducts: [
                            ...item.subproducts!.filter(item => item.id !== action.payload.id),
                            action.payload
                        ]
                    }
                    : item
                )
        })
        builder.addCase(editSubProduct.rejected, (state) => {
            state.status = 'failed'
        })
    },
})

export default produtoSlice.reducer