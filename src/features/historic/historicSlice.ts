import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api } from '../../services/api.service'
import { TStockIn } from '../../types/TStockIn'
import moment from 'moment-timezone';

export const getAllHistoric = createAsyncThunk(
    'historic/getAllHistoric',
    async (thunkAPI) => {
        const historic = await api.get('/historic')
        const res = historic.data.map((item: any) => (
            {
                ...item,
                createdAt: moment.tz(item.createdAt, "America/Sao_Paulo").format()
            }
        ))
        return res
    }
)

type State = {
    historic: TStockIn[],
    status: string
}

export const historicSlice = createSlice({
    name: 'historic',
    initialState: {
        historic: [],
        status: 'success'
    } as State,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getAllHistoric.pending, (state) => {
            state.status = 'loading'
        })
        builder.addCase(getAllHistoric.fulfilled, (state, action) => {
            state.status = 'success'
            state.historic = action.payload
        })
        builder.addCase(getAllHistoric.rejected, (state) => {
            state.status = 'failed'
        })
    },
})

export default historicSlice.reducer