import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import Container from "./components/Container";
import Loading from "./components/Loading";
import Navbar from "./components/Navbar";
import { getFornecedores } from "./features/fornecedor/fornecedorSlice";
import { getProdutos } from "./features/produtos/produtoSlice";
import { getAllStockIns } from "./features/stockIn/stockIn";
import { getAllStockOuts } from "./features/stockOut/stockOut";
import Comprar from "./pages/Actions/Comprar";
import Detalhes from "./pages/Produtos/Detalhes";
import ProdutosEscondidos from "./pages/Produtos/ProdutosEscondidos";
import EditarFornecedor from "./pages/Providers/EditarFornecedor";
import EditarProduto from "./pages/Produtos/EditarProduto";
import EditarSubProduto from "./pages/EditarSubProduto";
import Fornecedores from "./pages/Providers/Fornecedores";
import Historico from "./pages/Historico";
import NovoFornecedor from "./pages/Providers/NovoFornecedor";
import NovoProduto from "./pages/Produtos/NovoProduto";
import Produtos from "./pages/Produtos/Produtos";
import Retirar from "./pages/Actions/Retirar";
import ProdutoHistorico from "./pages/ProdutoHistorico";
import Ajustar from "./pages/Actions/Ajustar";
import { getAllAdjustStock } from "./features/adjustStock/adjustStock";
import Login from "./pages/Login";
import Users from "./pages/Users/Users";
import CreateUser from "./pages/Users/CreateUser";
import { getAllCarts } from "./features/cart/cartSlice";
import AdminPanel from "./pages/AdminPanel";

function App() {

  const dispatch = useAppDispatch()
  const authentication = useAppSelector(state => state.authentication)

  useEffect(() => {
    if (authentication.authenticated) {
      dispatch(getProdutos())
      dispatch(getFornecedores())

      if (authentication.role === 'admin') {
        dispatch(getAllStockOuts())
        dispatch(getAllStockIns())
        dispatch(getAllAdjustStock())
        dispatch(getAllCarts())
      }
    }
  }, [dispatch, authentication])


  const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    if (!authentication.authenticated) return <Navigate to="/login" />
    return children
  }

  return (
    <BrowserRouter>
      <Loading />
      <Navbar />
      <Container>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/estoque-client' element={<Login />} />
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
          <Route path='/usuarios' element={<PrivateRoute><Users /></PrivateRoute>} />
          <Route path='/usuarios/novo' element={<PrivateRoute><CreateUser /></PrivateRoute>} />
          <Route path='/panel' element={<PrivateRoute><AdminPanel /></PrivateRoute>} />
        </Routes>
      </Container>
    </BrowserRouter >
  );
}

export default App;
