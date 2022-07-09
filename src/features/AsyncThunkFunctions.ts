import { createAsyncThunk } from "@reduxjs/toolkit"
import { api } from "../services/api.service"
import { TStockIn } from "../types/TStockIn"
import { TStockOut } from "../types/TStockOut"

export const createAdjustStock = createAsyncThunk(
    'adjustStock/createAdjustStock',
    async (newAdjustStock: TStockOut, thunkAPI) => {
        const product = await api.post('/adjustStock', newAdjustStock)
        return product.data
    }
)

export const createStockOut = createAsyncThunk(
    'stockOuts/createStockOut',
    async (newStockOut: TStockOut, thunkAPI) => {
        const product = await api.post('/stockOuts', newStockOut)
        return product.data
    }
)

export const createStockIn = createAsyncThunk(
    'stockIns/createStockIn',
    async (newStockIn: TStockIn, thunkAPI) => {
        await api.post('/stockIns', newStockIn)
    }
)