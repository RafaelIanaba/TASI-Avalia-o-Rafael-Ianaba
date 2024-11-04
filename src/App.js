import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Registro from './Componentes/Registro'
import Login from './Componentes/Login'
import AdiProduto from './Componentes/AdiProduto'
import AltProduto from './Componentes/AltProduto'
import DelProduto from './Componentes/DelProduto'
import LisProduto from './Componentes/LisProduto'

export default function App() {
  const RotasPrivadas = () => {
    const token = localStorage.getItem('TOKEN')
    return token ? <Outlet /> : <Navigate to='/' />
  }

  const NaoEncontrado = () => {
    return (
      <div>
        <h1>Página Não Encontrada</h1>
        <p>A página que você está procurando não existe.</p>
      </div>
    )
  }

  useEffect(() => {
    document.body.style.margin = '0'
    document.body.style.padding = '0'
    document.body.style.backgroundColor = '#88e251'
  }, [])

  
  return (
    <BrowserRouter>
      <div style={{ width: '100%', minHeight: '100vh', backgroundColor: '#88e251' }}>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/registro' element={<Registro />} />
          <Route element={<RotasPrivadas />}>
            <Route path='/adiProduto' element={<AdiProduto />} />
            <Route path='/altProduto' element={<AltProduto />} />
            <Route path='/delProduto' element={<DelProduto />} />
            <Route path='/lisProduto' element={<LisProduto />} />
          </Route>
          <Route path='*' element={<NaoEncontrado />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
