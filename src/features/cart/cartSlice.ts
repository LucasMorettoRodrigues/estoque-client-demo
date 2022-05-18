import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api } from '../../services/api.service'
import { TStockIn } from '../../types/TStockIn'

type cartRequest = {
    cart: TStockIn[],
    username: string,
    password: string
}

export const createCart = createAsyncThunk(
    'carts/createCart',
    async ({ cart, username, password }: cartRequest, thunkAPI) => {
        await api.post('/carts', { cart, username, password })
    }
)

export const getAllCarts = createAsyncThunk(
    'carts/getAllCarts',
    async (thunkAPI) => {
        const carts = await api.get('/carts')
        return carts.data
    }
)

export const deleteCart = createAsyncThunk(
    'carts/deleteCart',
    async (cartId: number, thunkAPI) => {
        await api.delete(`/carts/${cartId}`)
        return cartId
    }
)

type State = {
    carts: TStockIn[],
    status: string
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        carts: [],
        status: 'success'
    } as State,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(createCart.pending, (state) => {
            state.status = 'loading'
        })
        builder.addCase(createCart.fulfilled, (state, action) => {
            state.status = 'success'
        })
        builder.addCase(createCart.rejected, (state) => {
            state.status = 'failed'
        })
        builder.addCase(getAllCarts.pending, (state) => {
            state.status = 'loading'
        })
        builder.addCase(getAllCarts.fulfilled, (state, action) => {
            state.status = 'success'
            state.carts = action.payload
        })
        builder.addCase(getAllCarts.rejected, (state) => {
            state.status = 'failed'
        })
        builder.addCase(deleteCart.pending, (state) => {
            state.status = 'loading'
        })
        builder.addCase(deleteCart.fulfilled, (state, action) => {
            state.status = 'success'
            state.carts = state.carts.filter(i => i.id !== action.payload)
        })
        builder.addCase(deleteCart.rejected, (state) => {
            state.status = 'failed'
        })
    },
})

export default cartSlice.reducer