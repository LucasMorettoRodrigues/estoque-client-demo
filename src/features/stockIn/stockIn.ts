import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { TStockIn } from '../../types/TStockIn'
import { getProdutos } from '../produtos/produtoSlice'

export const createStockIn = createAsyncThunk(
    'stockIns/createStockIn',
    async (newStockIns: TStockIn[], thunkAPI) => {
        let res: TStockIn[] = []
        for (const stockIn of newStockIns) {
            const singleRes: any = await axios.post('http://localhost:5000/api/v1/stockIns', stockIn)
            res = [...res, singleRes.data]
        }
        thunkAPI.dispatch(getProdutos())
        console.log(res)
        return res
    }
)

export const getAllStockIns = createAsyncThunk(
    'stockIns/getAllStockIns',
    async (thunkAPI) => {
        const stockIns = await axios.get('http://localhost:5000/api/v1/stockIns')
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
            state.stockIns = [...state.stockIns, ...action.payload]
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