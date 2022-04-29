import { render } from '@testing-library/react';
import NovoFornecedor from '../NovoFornecedor'
import { Provider } from 'react-redux';
import { store } from '../../../app/store';
import { BrowserRouter } from 'react-router-dom';

const MockNovoFornecedor = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <NovoFornecedor />
            </BrowserRouter>
        </Provider>
    )
}

describe('Verify Elements in Page', () => {
    it('should contain button element', () => {
        const { getByRole } = render(
            <MockNovoFornecedor />
        );

        const buttonElement = getByRole('button')
        expect(buttonElement).toBeInTheDocument()
    })
})
