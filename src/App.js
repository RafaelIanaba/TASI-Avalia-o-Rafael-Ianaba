import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet, useNavigate } from 'react-router-dom';
import Marvel from './Marvel';


const Login = ({ callback }) => {
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const navigate = useNavigate()

  const realizarLogin = async () => {
    const dados = {
      usuario: usuario,
      senha: senha,
    }
    callback(dados, navigate)
  }

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '300px', backgroundColor: '#4c4c4c', borderRadius: '10px', padding: '20px', margin: '10px', textAlign: 'center' }}>
        <div style={{ color: 'white', display: 'flex', justifyContent: 'center' }}>Digite o Usuário:</div>
        <input
          type="text"
          className="Usuario"
          name="usuario"
          style={{ backgroundColor: '#85b7b5', width: '80%', padding: '8px', marginBottom: '10px', alignItems: 'center' }}
          onChange={(e) => setUsuario(e.target.value)}
        />
        <br />
        <div style={{ color: 'white', display: 'flex', justifyContent: 'center' }}>Digite a Senha:</div>
        <input
          type="password"
          className="Senha"
          name="senha"
          style={{ backgroundColor: '#85b7b5', width: '80%', padding: '8px', marginBottom: '10px', alignItems: 'center' }}
          onChange={(e) => setSenha(e.target.value)}
        />
        <br />
        <input
          type="button"
          value="EFETUAR LOGIN"
          style={{ backgroundColor: 'gray', width: '50%', padding: '10px', justifyContent: 'center' }}
          onClick={realizarLogin}
        />
      </div>
    </div>
  )
}

const RotasPrivadas = () => {
  const auth = localStorage.getItem('MEU_TOKEN')
  return auth == 'true' ? <Outlet /> : <Navigate to="/" />
}

export default function App() {
  const [authentication, setAuthentication] = useState(false)

  const EfetuaLogin = (dados, navigate) => {
    if (dados.usuario == '010621016' && dados.senha == '010621016') {
      localStorage.setItem('MEU_TOKEN', 'true')
      setAuthentication(true)
      navigate('/marvel')
    } else {
      alert("USUARIO OU SENHA INVÁLIDOS")
    }
  }

  const Deslogar = () => {
    localStorage.removeItem('MEU_TOKEN')
    setAuthentication(false)
  }

  const VerificaLogin = () => {
    const auth = localStorage.getItem('MEU_TOKEN')
    setAuthentication(auth == 'true')
  }

  useEffect(() => {
    VerificaLogin()
  }, [])

  return (
    <BrowserRouter>
      <nav>
        {authentication && <button onClick={Deslogar}>Logout</button>}
      </nav>
      <Routes>
        <Route path="/" element={<Login callback={EfetuaLogin} />} />
        <Route element={<RotasPrivadas />}>
          <Route path="/marvel" element={<Marvel />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
