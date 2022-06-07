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
import Login from "./pages/Login";
import Users from "./pages/Users/Users";
import CreateUser from "./pages/Users/CreateUser";
import AdminPanel from "./pages/AdminPanel";
import EditUser from "./pages/Users/EditUser";
import RedefinePassword from "./pages/Users/RedefinePassword";

function App() {

  const dispatch = useAppDispatch()
  const authentication = useAppSelector(state => state.authentication)

  useEffect(() => {
    if (authentication.authenticated) {
      dispatch(getProdutos())
      dispatch(getFornecedores())

      if (authentication.role === 'admin') {
        dispatch(getAllStockOuts())
      }
    }
  }, [dispatch, authentication])


  const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    if (!authentication.authenticated) return <Navigate to="/login" />
    return children
  }

  const AdminRoute = ({ children }: { children: JSX.Element }) => {
    if (!authentication.authenticated) return <Navigate to="/login" />
    if (authentication.role !== 'admin') return <Navigate to="/retirar" />
    return children
  }

  return (
    <BrowserRouter>
      <Loading loading={false} />
      <Navbar />
      <Container>
        <Routes>
          <Route path='/' element={<Login />} />

          <Route path='/login' element={<Login />} />
          <Route path='/estoque-client' element={<Login />} />

          <Route path='/comprar' element={<PrivateRoute><Comprar /></PrivateRoute>} />
          <Route path='/retirar' element={<PrivateRoute><Retirar /></PrivateRoute>} />

          <Route path='/produtos' element={<AdminRoute><Produtos /></AdminRoute>} />
          <Route path='/produtos/detalhes' element={<AdminRoute><Detalhes /></AdminRoute>} />
          <Route path='/produtos/escondidos' element={<AdminRoute><ProdutosEscondidos /></AdminRoute>} />
          <Route path='/produtos/:id' element={<AdminRoute><EditarProduto /></AdminRoute>} />
          <Route path='/produtos/:id_produto/subprodutos/:id_subproduto' element={<AdminRoute><EditarSubProduto /></AdminRoute>} />
          <Route path='/novoProduto' element={<AdminRoute><NovoProduto /></AdminRoute>} />
          <Route path='/fornecedores' element={<AdminRoute><Fornecedores /></AdminRoute>} />
          <Route path='/fornecedores/:id' element={<AdminRoute><EditarFornecedor /></AdminRoute>} />
          <Route path='/novoFornecedor' element={<AdminRoute><NovoFornecedor /></AdminRoute>} />
          <Route path='/ajustar' element={<AdminRoute><Ajustar /></AdminRoute>} />
          <Route path='/historico' element={<AdminRoute><Historico /></AdminRoute>} />
          <Route path='/produtos/:id/historico' element={<AdminRoute><ProdutoHistorico /></AdminRoute>} />
          <Route path='/usuarios' element={<AdminRoute><Users /></AdminRoute>} />
          <Route path='/usuarios/novo' element={<AdminRoute><CreateUser /></AdminRoute>} />
          <Route path='/panel' element={<AdminRoute><AdminPanel /></AdminRoute>} />
          <Route path='/usuarios/:id' element={<AdminRoute><EditUser /></AdminRoute>} />
          <Route path='/usuarios/:id/redefinirSenha' element={<AdminRoute><RedefinePassword /></AdminRoute>} />
        </Routes>
      </Container>
    </BrowserRouter >
  );
}

export default App;
