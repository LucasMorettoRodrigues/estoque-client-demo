import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
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
import { Home } from "./pages/Home";

function App() {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getFornecedores())
    dispatch(getProdutos())
    dispatch(getAllStockOuts())
    dispatch(getAllStockIns())
    dispatch(getAllAdjustStock())
  }, [dispatch])

  return (
    <BrowserRouter>
      <Loading />
      <Navbar />
      <Container>
        <Routes>
          <Route path='/' element={<Home />} />
          {/* <Route path='/estoque-client' element={<Home />} /> */}
          <Route path='/produtos' element={<Produtos />} />
          <Route path='/produtos/detalhes' element={<Detalhes />} />
          <Route path='/produtos/escondidos' element={<ProdutosEscondidos />} />
          <Route path='/produtos/:id' element={<EditarProduto />} />
          <Route path='/produtos/:id_produto/subprodutos/:id_subproduto' element={<EditarSubProduto />} />
          <Route path='/novoProduto' element={<NovoProduto />} />
          <Route path='/fornecedores' element={<Fornecedores />} />
          <Route path='/fornecedores/:id' element={<EditarFornecedor />} />
          <Route path='/novoFornecedor' element={<NovoFornecedor />} />
          <Route path='/comprar' element={<Comprar />} />
          <Route path='/retirar' element={<Retirar />} />
          <Route path='/ajustar' element={<Ajustar />} />
          <Route path='/historico' element={<Historico />} />
          <Route path='/produtos/:id/historico' element={<ProdutoHistorico />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
