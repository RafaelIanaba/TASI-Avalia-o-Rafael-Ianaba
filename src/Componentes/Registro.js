import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Registro() {
    const [usuario, setUsuario] = useState('')
    const [senha, setSenha] = useState('')
    const [confirma, setConfirma] = useState('')

    const navigate = useNavigate()

    const navegarLogin = () => {
        navigate('/')
    }

    const realizarRegistro = async () => {
        if (!usuario || !senha || !confirma) {
            alert('Todos os campos são obrigatórios.')
            return
        }
        if (senha !== confirma) {
            alert('A senha não condiz com a confirmação.')
            return
        }

        try {
            const resposta = await axios.post('https://backend-aula.vercel.app/app/registrar', {
                usuario,
                senha,
                confirma
            })
            if (resposta.data.usuario) {
                alert('Usuário registrado com sucesso!')
                navigate('/')
            } else {
                alert('Falha no registro.')
            }
        } catch (err) {
            console.error('Erro ao realizar o registro:', err)
            alert('Ocorreu um erro no registro.')
        }
    }

    
    return (
        <div style={{ width: '100%', minHeight: '100vh', backgroundColor: '#33f9ff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ width: '550px', height: '400px', backgroundColor: '#f2df1a', borderRadius: '10px', padding: '20px', textAlign: 'center' }}>
                <div style={{ color: 'black', display: 'flex', justifyContent: 'center', margin: '20px' }}>
                    <span style={{ fontSize: '50px', fontFamily: 'monospace' }}>Registrar Usuário:</span> 
                </div>
                <div style={{ color: 'black', display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '30px' }}>
                    <span style={{ fontSize: '30px', fontFamily: 'monospace' }}>Usuário:</span> 
                    <input type='text' style={{ fontSize: '30px', fontFamily: 'monospace', backgroundColor: '#b0ea65', width: '300px', height: '30px', alignItems: 'end' }} onChange={(e) => setUsuario(e.target.value)} required />
                </div>
                <div style={{ color: 'black', display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '30px' }}>
                    <span style={{ fontSize: '30px', fontFamily: 'monospace' }}>Senha:</span>
                    <input type='password' style={{ fontSize: '30px', fontFamily: 'monospace', backgroundColor: '#b0ea65', width: '300px', height: '30px', alignItems: 'end' }} onChange={(e) => setSenha(e.target.value)} required />
                </div>
                <div style={{ color: 'black', display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '30px' }}>
                    <span style={{ fontSize: '30px', fontFamily: 'monospace' }}>Confirma:</span>
                    <input type='password' style={{ fontSize: '30px', fontFamily: 'monospace', backgroundColor: '#b0ea65', width: '300px', height: '30px', alignItems: 'end' }} onChange={(e) => setConfirma(e.target.value)} required />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <input type='button' value='REGISTRAR' style={{ fontSize: '20px', fontFamily: 'monospace', backgroundColor: '#35f736', width: '250px', padding: '10px', margin: '10px', borderRadius: '10px' }} onClick={realizarRegistro}/>
                    <input type='button' value='RETORNAR ' style={{ fontSize: '20px', fontFamily: 'monospace', backgroundColor: '#357dc0', width: '250px', padding: '10px', margin: '10px', borderRadius: '10px' }} onClick={navegarLogin}/>
                </div>
            </div>
        </div>
    )
}
