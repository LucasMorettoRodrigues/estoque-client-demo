import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api } from '../../services/api.service'
import { TStockIn } from '../../types/TStockIn'
import { getProdutos } from '../produtos/produtoSlice'

export const createStockIn = createAsyncThunk(
    'stockIns/createStockIn',
    async (newStockIns: TStockIn[], thunkAPI) => {
        let res: TStockIn[] = []
        for (const stockIn of newStockIns) {
            const singleRes: any = await api.post('/stockIns', stockIn)
            res = [...res, singleRes.data]
        }
        thunkAPI.dispatch(getProdutos())
        thunkAPI.dispatch(getAllStockIns())
    }
)

export const getAllStockIns = createAsyncThunk(
    'stockIns/getAllStockIns',
    async (thunkAPI) => {
        const stockIns = await api.get('/stockIns')
        return stockIns.data
    }
)

type State = {
    stockIns: TStockIn[],
    status: string
}

export const stockInSlice = createSlice({
    name: 'fornecedor',
    initialState: {
        stockIns: [],
        status: 'success'
    } as State,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(createStockIn.pending, (state) => {
            state.status = 'loading'
        })
        builder.addCase(createStockIn.fulfilled, (state, action) => {
            state.status = 'success'
        })
        builder.addCase(createStockIn.rejected, (state) => {
            state.status = 'failed'
        })
        builder.addCase(getAllStockIns.pending, (state) => {
            state.status = 'loading'
        })
        builder.addCase(getAllStockIns.fulfilled, (state, action) => {
            state.status = 'success'
            state.stockIns = action.payload
        })
        builder.addCase(getAllStockIns.rejected, (state) => {
            state.status = 'failed'
        })
    },
})

export default stockInSlice.reducer