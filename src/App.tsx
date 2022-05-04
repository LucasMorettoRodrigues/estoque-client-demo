import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAppDispatch } from "./app/hooks";
import Container from "./components/Container";
import Loading from "./components/Loading";
import Navbar from "./components/Navbar";
import { getFornecedores } from "./features/fornecedor/fornecedorSlice";
import { getProdutos } from "./features/produtos/produtoSlice";
import { getAllStockIns } from "./features/stockIn/stockIn";
import { getAllStockOuts } from "./features/stockOut/stockOut";
import Comprar from "./pages/Comprar/Comprar";
import Detalhes from "./pages/Detalhes/Detalhes";
import ProdutosEscondidos from "./pages/ProdutosEscondidos";
import EditarFornecedor from "./pages/EditarFornecedor";
import EditarProduto from "./pages/EditarProduto";
import EditarSubProduto from "./pages/EditarSubProduto";
import Fornecedores from "./pages/Fornecedores";
import Historico from "./pages/Historico";
import NovoFornecedor from "./pages/NovoFornecedor";
import NovoProduto from "./pages/NovoProduto";
import Produtos from "./pages/Produtos/Produtos";
import Retirar from "./pages/Retirar";
import ProdutoHistorico from "./pages/ProdutoHistorico";
import Ajustar from "./pages/Ajustar";
import { getAllAdjustStock } from "./features/adjustStock/adjustStock";
import Login from "./pages/Login";
import { getUser } from "./services/auth.service";

function App() {

  const dispatch = useAppDispatch()

  const user = getUser()

  useEffect(() => {
    if (user) {
      dispatch(getFornecedores())
      dispatch(getProdutos())
      dispatch(getAllStockOuts())
      dispatch(getAllStockIns())
      dispatch(getAllAdjustStock())
    }
  }, [dispatch, user])

  const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    if (!getUser()) return <Navigate to="/login" />
    return children
  }

  return (
    <BrowserRouter>
      <Loading />
      <Navbar />
      <Container>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/produtos' element={<PrivateRoute><Produtos /></PrivateRoute>} />
          <Route path='/produtos/detalhes' element={<PrivateRoute><Detalhes /></PrivateRoute>} />
          <Route path='/produtos/escondidos' element={<PrivateRoute><ProdutosEscondidos /></PrivateRoute>} />
          <Route path='/produtos/:id' element={<PrivateRoute><EditarProduto /></PrivateRoute>} />
          <Route path='/produtos/:id_produto/subprodutos/:id_subproduto' element={<PrivateRoute><EditarSubProduto /></PrivateRoute>} />
          <Route path='/novoProduto' element={<PrivateRoute><NovoProduto /></PrivateRoute>} />
          <Route path='/fornecedores' element={<PrivateRoute><Fornecedores /></PrivateRoute>} />
          <Route path='/fornecedores/:id' element={<PrivateRoute><EditarFornecedor /></PrivateRoute>} />
          <Route path='/novoFornecedor' element={<PrivateRoute><NovoFornecedor /></PrivateRoute>} />
          <Route path='/comprar' element={<PrivateRoute><Comprar /></PrivateRoute>} />
          <Route path='/retirar' element={<PrivateRoute><Retirar /></PrivateRoute>} />
          <Route path='/ajustar' element={<PrivateRoute><Ajustar /></PrivateRoute>} />
          <Route path='/historico' element={<PrivateRoute><Historico /></PrivateRoute>} />
          <Route path='/produtos/:id/historico' element={<PrivateRoute><ProdutoHistorico /></PrivateRoute>} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
