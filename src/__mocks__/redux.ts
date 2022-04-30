import * as reactRedux from 'react-redux'

export const useSelectorMock = reactRedux.useSelector as jest.MockedFunction<typeof reactRedux.useSelector>;
export const useDispatchMock = reactRedux.useDispatch as jest.MockedFunction<any>;

export const mockStore = {
    fornecedor: {
        fornecedores: [
            {
                id: 1,
                name: 'fornecedor_item'
            }
        ]
    },
    produto: {
        produtos: [
            {
                id: 1, name: 'Agulhas', code: '3', brand: 'BD', category: 'Descartáveis',
                unit: 'Caixa', stock: 2, min_stock: 1, max_stock: 6, observation: '',
                hide: false,
                subproducts: [
                    {
                        id: 2, product_id: 1, lote: '1234',
                        validade: '2022-04-06T00:00:00.000Z', quantity: 2,
                    }
                ]
            },
            {
                id: 2, name: 'Ampolas', code: '4', brand: 'AC', category: 'Descartáveis',
                unit: 'Lata', stock: 1, min_stock: 1, max_stock: 6, observation: '',
                hide: true,
                subproducts: [
                    {
                        id: 3, product_id: 2, lote: '1342',
                        validade: '2022-04-06T00:00:00.000Z', quantity: 1,
                    }
                ]
            },
        ]
    },
    stockOut: { stockOuts: [] },
    stockIn: { stockIns: [] },
}