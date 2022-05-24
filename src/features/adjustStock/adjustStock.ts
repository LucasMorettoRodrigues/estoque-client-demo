import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import moment from 'moment-timezone'
import { api } from '../../services/api.service'
import { TStockOut } from '../../types/TStockOut'

export const createAdjustStock = createAsyncThunk(
    'adjustStock/createAdjustStock',
    async (newAdjustStock: TStockOut, thunkAPI) => {
        const product = await api.post('/adjustStock', newAdjustStock)
        thunkAPI.dispatch(getAllAdjustStock())
        return product.data
    }
)

export const getAllAdjustStock = createAsyncThunk(
    'adjustStock/getAllAdjustStock',
    async (thunkAPI) => {
        const adjustStock = await api.get('/adjustStock')
        const res = adjustStock.data.map((item: any) => (
            {
                ...item,
                createdAt: moment.tz(item.createdAt, "America/Sao_Paulo").format()
            }
        ))
        return res
    }
)

type State = {
    adjustStock: TStockOut[],
    status: string
}

export const adjustStockSlice = createSlice({
    name: 'fornecedor',
    initialState: {
        adjustStock: [],
        status: 'success'
    } as State,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(createAdjustStock.pending, (state) => {
            state.status = 'loading'
        })
        builder.addCase(createAdjustStock.fulfilled, (state, action) => {
            state.status = 'success'
        })
        builder.addCase(createAdjustStock.rejected, (state) => {
            state.status = 'failed'
        })
        builder.addCase(getAllAdjustStock.pending, (state) => {
            state.status = 'loading'
        })
        builder.addCase(getAllAdjustStock.fulfilled, (state, action) => {
            state.status = 'success'
            state.adjustStock = action.payload
        })
        builder.addCase(getAllAdjustStock.rejected, (state) => {
            state.status = 'failed'
        })
    },
})

export default adjustStockSlice.reducer