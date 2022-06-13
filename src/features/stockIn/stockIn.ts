import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api } from '../../services/api.service'
import { TStockIn } from '../../types/TStockIn'
import moment from 'moment-timezone';

export const createStockIn = createAsyncThunk(
    'stockIns/createStockIn',
    async (newStockIn: TStockIn, thunkAPI) => {
        await api.post('/stockIns', newStockIn)
        return
    }
)

export const getAllStockIns = createAsyncThunk(
    'stockIns/getAllStockIns',
    async (thunkAPI) => {
        const stockIns = await api.get('/stockIns')
        const res = stockIns.data.map((item: any) => (
            {
                ...item,
                createdAt: moment.tz(item.createdAt, "America/Sao_Paulo").format()
            }
        ))
        return res
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
        builder.addCase(createStockIn.fulfilled, (state) => {
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