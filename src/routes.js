import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Estabelecimento from "./pages/estabelecimento/Estabelecimento";
import CadastroUsuario from "./pages/cadastro-usuario/CadastroUsuario";
import Dono from "./pages/dono/DonoDeslogado";
import LoginUsuario from "./pages/loginUsuario/LoginUsuario"
import LoginEmpresa from "./pages/loginEmpresa/LoginEmpresa"
import QuemSomos from  "./pages/quemSomos/quemSomos"
import CadastroEmpresa from "./pages/cadastroEmpresa/CadastroEmpresa"
import NotFound from "./pages/notfound/notfound";
import EstabelecimentoUsuario from "./pages/estabelecimento-usuario/estabelecimentoUsuario";
import UsuarioFinal from "./pages/usuario-final/UsuarioFinal"
import Dashboard from "./pages/dashboard/Dashboard"
import AdicionarUsuarios from './pages/formsDashboard/AdicionarUsuarios';
import EditarUsuarios from './pages/formsDashboard/EditarUsuarios';
import Listagem from './pages/listagemEstabelecimento/Listagem'
import CadastrarInformacoesEmpresa from "./pages/cadastrarInfoEmpresa/cadastrarInfoEmpresa";
import EstabelecimentoDono from "./pages/estabelecimento-dono/estabelecimentoDono";
import EditarEstabelecimento from "./pages/editarEstabelecimento/editarEstabelecimento";
import Favoritos from "./pages/favoritos/Favoritos";

function Rotas() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/estabelecimento" element={<Estabelecimento />} />{/*remover*/}
                    <Route path="/cadastro-usuario" element={<CadastroUsuario />} />{/*cadastro user*/}
                    <Route path="/home-estabelecimento" element={<Dono />} />{/*home do estabelecimento*/}
                    <Route path="/login" element={<LoginUsuario/>}/>
                    <Route path="/loginEmpresa" element={<LoginEmpresa/>}/>
                    <Route path="/cadastroEmpresa" element={<CadastroEmpresa/>}/>
                    <Route path="*" element={<NotFound />} />                    
                    <Route path="/" element={<UsuarioFinal/>}/>
                    <Route path="/quem-somos" element={<QuemSomos/>}/>
                    <Route path="/estabelecimento-usuario/:id" element={<EstabelecimentoUsuario/>}/>{/*erro no fetch*/}
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/usuarios/adicionarUsuarios" element={<AdicionarUsuarios />} />{/*finalizada?*/}
                    <Route path="/usuarios/editarUsuarios" element={<EditarUsuarios />} />{/*finalizada?*/}
                    <Route path="/listagem" element={<Listagem />} />{/*listagem*/}
                    <Route path="/estabelecimento-usuario" element={<EstabelecimentoUsuario/>}/>
                    <Route path="/cadastrar-info-empresa/:id" element={<CadastrarInformacoesEmpresa />}/>
                    <Route path="/estabelecimento-dono/:id" element={<EstabelecimentoDono />}/>
                    <Route path="/editar-estabelecimento/:id" element={<EditarEstabelecimento />}/>
                    <Route path="/favoritos" element={<Favoritos />}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default Rotas;