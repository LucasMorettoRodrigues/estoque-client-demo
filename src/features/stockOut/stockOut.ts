import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import moment from 'moment-timezone'
import { api } from '../../services/api.service'
import { TStockOut } from '../../types/TStockOut'

export const createStockOut = createAsyncThunk(
    'stockOuts/createStockOut',
    async (newStockOut: TStockOut, thunkAPI) => {
        const product = await api.post('/stockOuts', newStockOut)
        thunkAPI.dispatch(getAllStockOuts())
        return product.data
    }
)

export const getAllStockOuts = createAsyncThunk(
    'stockOuts/getAllStockOuts',
    async (thunkAPI) => {
        const stockOuts = await api.get('/stockOuts')
        const res = stockOuts.data.map((item: any) => (
            {
                ...item,
                createdAt: moment.tz(item.createdAt, "America/Sao_Paulo").format()
            }
        ))
        return res
    }
)

type State = {
    stockOuts: TStockOut[],
    status: string
}

export const stockOutSlice = createSlice({
    name: 'stockOut',
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