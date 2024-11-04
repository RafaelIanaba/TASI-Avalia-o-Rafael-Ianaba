import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function DelProduto() {
    
    const [produtos, setProdutos] = useState([])
    const [idDigitado, setIdDigitado] = useState('')

    const token = localStorage.getItem('TOKEN')
    const navigate = useNavigate()

    const navegarLista = () => {
        navigate('/lisProduto')
    }

    const navegarAdiciona = () => {
        navigate('/adiProduto')
    }

    const navegarAltera = () => {
        navigate('/altProduto')
    }

    const navegarDeleta = () => {
        navigate('/delProduto')
    }

    const Deslogar = () => {
        localStorage.removeItem('TOKEN')
        navigate('/')
    }

    const deletarProduto = async () => {
        if (!idDigitado) {
            alert('É obrigatório colar o ID.')
            return
        }
    
        try {
            const resposta = await axios.delete('https://backend-aula.vercel.app/app/produtos', {
                data: { id: idDigitado },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
    
            if (resposta.data.deletedCount > 0) {
                alert('Produto deletado com sucesso!')
                setProdutos(produtos.filter(produto => produto._id !== idDigitado))
            } else {
                alert('O ID digitado não foi encontrado!')
            }
        } catch (err) {
            console.error('Erro ao deletar o produto:', err)
            alert('Houve um erro na remoção do produto.')
        }
    }
    

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', margin: '10px' }}>
                <input type='button' value='LISTAR PRODUTOS' style={{ fontSize: '15px', fontFamily: 'monospace', backgroundColor: '#35f736', width: '20%', padding: '5px', margin: '10px', borderRadius: '10px' }} onClick={navegarLista}/>
                <input type='button' value='ADICIONAR PRODUTOS' style={{ fontSize: '15px', fontFamily: 'monospace', backgroundColor: '#f07c46', width: '20%', padding: '5px', margin: '10px', borderRadius: '10px' }} onClick={navegarAdiciona}/>
                <input type='button' value='ALTERAR PRODUTOS' style={{ fontSize: '15px', fontFamily: 'monospace', backgroundColor: '#337dff', width: '20%', padding: '5px', margin: '10px', borderRadius: '10px' }} onClick={navegarAltera}/>
                <input type='button' value='EXCLUIR PRODUTO' style={{ fontSize: '15px', fontFamily: 'monospace', backgroundColor: '#e91e21', width: '20%', padding: '5px', margin: '10px', borderRadius: '10px' }} onClick={navegarDeleta}/>
                <input type='button' value='DESLOGAR' style={{ fontSize: '15px', fontFamily: 'monospace', backgroundColor: '#a7a5a5', width: '20%', padding: '5px', margin: '10px', borderRadius: '10px' }} onClick={Deslogar}/>
            </div>
            
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ width: '500px', height: '250px', backgroundColor: '#e91e21', borderRadius: '10px', padding: '20px', margin: '10px', textAlign: 'center' }}>
                    <div style={{ color: 'white', display: 'flex', justifyContent: 'center', margin: '20px' }}>
                        <span style={{ fontSize: '30px', fontFamily: 'monospace' }}>Deletar Produto:</span> 
                    </div>
                    <div style={{ color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px', padding: '10px' }}>
                        <span style={{ fontSize: '25px', fontFamily: 'monospace' }}>ID_busca:</span> 
                        <input type='text' style={{ fontSize: '25px', fontFamily: 'monospace', backgroundColor: '#d8a345', width: '270px', height: '25px', alignItems: 'end' }} onChange={(e) => setIdDigitado(e.target.value)} required/>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <input type='button' value='DELETAR' style={{ fontSize: '20px', fontFamily: 'monospace', backgroundColor: '#12f30e', width: '250px', padding: '10px', marginTop: '30px', borderRadius: '10px' }} onClick={deletarProduto}/>
                    </div>                    
                </div>
            </div>
        </div>
    )
}
