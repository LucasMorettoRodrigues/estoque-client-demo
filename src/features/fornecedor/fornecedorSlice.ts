import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { api } from '../../services/api.service'
import { TProvider } from '../../types/TProvider'

export const getFornecedores = createAsyncThunk(
    'providers/getProviders',
    async () => {
        try {
            const data = await api.get('/providers')
            return data.data
        } catch (error) {
            console.log(error);
        }
    }
)

export const createProvider = createAsyncThunk(
    'providers/createProvider',
    async (newProvider: TProvider, thunkAPI) => {
        const provider = await api.post('/providers', newProvider)
        return provider.data
    }
)

export const deleteProviderById = createAsyncThunk(
    'providers/deleteProvider',
    async (providerId: number, thunkAPI) => {
        await api.delete(`/providers/${providerId}`)
        return providerId
    }
)

export const editProvider = createAsyncThunk(
    'providers/editProvider',
    async (provider: TProvider, thunkAPI) => {
        const result = await api.patch(`/providers/${provider.id}`, provider)
        return result.data
    }
)

type State = {
    fornecedores: TProvider[],
    status: string
}

export const fornecedorSlice = createSlice({
    name: 'fornecedor',
    initialState: {
        fornecedores: [],
        status: 'success'
    } as State,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getFornecedores.pending, (state) => {
            state.status = 'loading'
        })
        builder.addCase(getFornecedores.fulfilled, (state, action) => {
            state.status = 'success'
            state.fornecedores = action.payload
        })
        builder.addCase(getFornecedores.rejected, (state) => {
            state.status = 'failed'
        })
        builder.addCase(createProvider.pending, (state) => {
            state.status = 'loading'
        })
        builder.addCase(createProvider.fulfilled, (state, action: PayloadAction<TProvider>) => {
            state.status = 'success'
            state.fornecedores.push(action.payload)
        })
        builder.addCase(createProvider.rejected, (state) => {
            state.status = 'failed'
        })
        builder.addCase(deleteProviderById.pending, (state) => {
            state.status = 'loading'
        })
        builder.addCase(deleteProviderById.fulfilled, (state, action: PayloadAction<number>) => {
            state.status = 'success'
            state.fornecedores = state.fornecedores.filter((item) => item.id !== action.payload)
        })
        builder.addCase(deleteProviderById.rejected, (state) => {
            state.status = 'failed'
        })
        builder.addCase(editProvider.pending, (state) => {
            state.status = 'loading'
        })
        builder.addCase(editProvider.fulfilled, (state, action: PayloadAction<TProvider>) => {
            state.status = 'success'
            state.fornecedores = state.fornecedores
                .map((item) => item.id === action.payload.id
                    ? action.payload
                    : item
                )
        })
        builder.addCase(editProvider.rejected, (state) => {
            state.status = 'failed'
        })
    },
})

export default fornecedorSlice.reducer