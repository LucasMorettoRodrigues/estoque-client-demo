import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import Loading from "./components/Loading";
import Navbar from "./components/Navbar";
import { getFornecedores } from "./features/fornecedor/fornecedorSlice";
import { getProdutos } from "./features/produtos/produtoSlice";
import Compra from "./pages/Compra";
import Detalhes from "./pages/Detalhes";
import EditarFornecedor from "./pages/EditarFornecedor";
import EditarProduto from "./pages/EditarProduto";
import EditarSubProduto from "./pages/EditarSubProduto";
import Fornecedores from "./pages/Fornecedores";
import NovoFornecedor from "./pages/NovoFornecedor";
import NovoProduto from "./pages/NovoProduto";
import Produtos from "./pages/Produtos";

function App() {

  const dispatch = useAppDispatch()
  const statusProvider = useAppSelector(state => state.fornecedor.status)
  const statusProduct = useAppSelector(state => state.produto.status)


  useEffect(() => {
    dispatch(getFornecedores())
    dispatch(getProdutos())
  }, [dispatch])

  return (
    <BrowserRouter>
      {(statusProduct === 'loading' || statusProvider === 'loading') &&
        <Loading />
      }
      <Navbar />
      <Routes>
        <Route path='/produtos' element={<Produtos />} />
        <Route path='/produtos/detalhes' element={<Detalhes />} />
        <Route path='/produtos/:id' element={<EditarProduto />} />
        <Route path='/produtos/:id_produto/subprodutos/:id_subproduto' element={<EditarSubProduto />} />
        <Route path='/novoProduto' element={<NovoProduto />} />
        <Route path='/fornecedores' element={<Fornecedores />} />
        <Route path='/fornecedores/:id' element={<EditarFornecedor />} />
        <Route path='/novoFornecedor' element={<NovoFornecedor />} />
        <Route path='/compra' element={<Compra />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
