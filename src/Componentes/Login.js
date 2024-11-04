import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Login() {
    const [usuario, setUsuario] = useState('')
    const [senha, setSenha] = useState('')

    const navigate = useNavigate()

    const navegarRegistro = () => {
        navigate('/registro')
    }

    const realizarLogin = async () => {
      if (!usuario || !senha) {
        alert('Todos os campos são obrigatórios.')
        return
      }

      try {
        const resposta = await axios.post('https://backend-aula.vercel.app/app/login', {
          usuario, 
          senha
        })

        if (resposta.data.token) {
          localStorage.setItem('TOKEN', resposta.data.token)
          navigate('/lisProduto')
        } else {
          alert('O Login não funcionou.')
        }
      } catch (err) {
        console.error('Erro ao realizar Login:', err)
        alert('Ocorreu um erro no Login.')
      }
    }

    
    return (
      <div style={{ width: '100%', minHeight: '100vh', backgroundColor: '#33f9ff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: '500px', height: '300px', backgroundColor: '#357dc0', borderRadius: '10px', padding: '20px', textAlign: 'center' }}>
          <div style={{ color: 'white', display: 'flex', justifyContent: 'center', margin: '20px' }}>
            <span style={{ fontSize: '50px', fontFamily: 'monospace' }}>Realizar Login:</span> 
          </div>
          <div style={{ color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '30px' }}>
            <span style={{ fontSize: '30px', fontFamily: 'monospace' }}>Usuário:</span> 
            <input type='text' style={{ fontSize: '20px', fontFamily: 'monospace', backgroundColor: '#85b7b5', width: '300px', height: '30px' }} onChange={(e) => setUsuario(e.target.value)} required />
          </div>
          <div style={{ color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '30px' }}>
            <span style={{ fontSize: '30px', fontFamily: 'monospace' }}>Senha:</span>
            <input type='password' style={{ fontSize: '20px', fontFamily: 'monospace', backgroundColor: '#85b7b5', width: '300px', height: '30px' }} onChange={(e) => setSenha(e.target.value)} required />
          </div>
          <div style={{ color: 'white', display: 'flex', justifyContent: 'center' }}>
            <input type='button' value='LOGIN' style={{ fontSize: '20px', fontFamily: 'monospace', backgroundColor: '#35f736', width: '250px', padding: '10px', margin: '10px', borderRadius: '10px' }} onClick={realizarLogin}/>
            <input type='button' value='REGISTAR USUÁRIO' style={{ fontSize: '20px', fontFamily: 'monospace', backgroundColor: '#f2df1a', width: '250px', padding: '10px', margin: '10px', borderRadius: '10px' }} onClick={navegarRegistro}/>
          </div>
        </div>
      </div>
    )
}
