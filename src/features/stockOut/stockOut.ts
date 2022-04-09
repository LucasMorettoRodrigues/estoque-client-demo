import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { TStockOut } from '../../types/TStockOut'

export const createStockOut = createAsyncThunk(
    'stockOuts/createStockOut',
    async (newStockOut: TStockOut, thunkAPI) => {
        const product = await axios.post('http://localhost:5000/api/v1/stockOuts', newStockOut)
        return product.data
    }
)

export const getAllStockOuts = createAsyncThunk(
    'stockOuts/getAllStockOuts',
    async (thunkAPI) => {
        const stockOuts = await axios.get('http://localhost:5000/api/v1/stockOuts')
        return stockOuts.data
    }
)

type State = {
    stockOuts: TStockOut[],
    status: string
}

export const stockOutSlice = createSlice({
    name: 'fornecedor',
    initialState: {
        stockOuts: [],
        status: 'success'
    } as State,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(createStockOut.pending, (state) => {
            state.status = 'loading'
        })
        builder.addCase(createStockOut.fulfilled, (state, action) => {
            state.status = 'success'
            state.stockOuts = [...state.stockOuts, action.payload]
        })
        builder.addCase(createStockOut.rejected, (state) => {
            state.status = 'failed'
        })
        builder.addCase(getAllStockOuts.pending, (state) => {
            state.status = 'loading'
        })
        builder.addCase(getAllStockOuts.fulfilled, (state, action) => {
            state.status = 'success'
            state.stockOuts = action.payload
        })
        builder.addCase(getAllStockOuts.rejected, (state) => {
            state.status = 'failed'
        })
    },
})

export default stockOutSlice.reducer