import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function AdiProduto() {
    const [produtos, setProdutos] = useState([])
    const [nome, setNome] = useState('')
    const [quantidade, setQuantidade] = useState('')
    const [preco, setPreco] = useState('')
    const [descricao, setDescricao] = useState('')
    const [imagem, setImagem] = useState('')

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

    const adicionarProduto = async () => {
        if (!nome || !quantidade || !preco || !descricao || !imagem) {
            alert('Todos os campos são obrigatórios.')
            return
        }
    
        const produto = { nome, quantidade: Number(quantidade), preco: Number(preco), descricao, imagem, }
    
        try {
            const pesquisa = await axios.get(`https://backend-aula.vercel.app/app/produtos/${nome}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if (pesquisa.data.length === 0) {
                const resposta = await axios.post('https://backend-aula.vercel.app/app/produtos', produto, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                setProdutos([...produtos, resposta.data])
                alert('Produto adicionado com sucesso!')
            } else {
                alert('Produto referenciado já existe.')
            }
        } catch (err) {
            console.error('Erro ao adicionar o produto:', err)
            alert('Houve um erro ao adicionar o produto.')
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
                <div style={{ width: '500px', height: '480px', backgroundColor: '#f07c46', borderRadius: '10px', padding: '20px', margin: '10px', textAlign: 'center' }}>
                    <div style={{ color: 'white', display: 'flex', justifyContent: 'center', margin: '20px' }}>
                        <span style={{ fontSize: '30px', fontFamily: 'monospace' }}>Adicionar Produto:</span> 
                    </div>
                    <div style={{ color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px', padding: '10px' }}>
                        <span style={{ fontSize: '25px', fontFamily: 'monospace' }}>Nome:</span> 
                        <input type='text' style={{ fontSize: '25px', fontFamily: 'monospace', backgroundColor: '#f9f458', width: '270px', height: '25px', alignItems: 'end' }} onChange={(e) => setNome(e.target.value)}/>
                    </div>
                    <div style={{ color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px', padding: '10px' }}>
                        <span style={{ fontSize: '25px', fontFamily: 'monospace' }}>Quantidade:</span>
                        <input type='number' style={{ fontSize: '25px', fontFamily: 'monospace', backgroundColor: '#f9f458', width: '270px', height: '25px', alignItems: 'end' }} onChange={(e) => setQuantidade(e.target.value)}/>
                    </div>
                    <div style={{ color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px', padding: '10px' }}>
                        <span style={{ fontSize: '25px', fontFamily: 'monospace' }}>Preço:</span>
                        <input type='number' style={{ fontSize: '25px', fontFamily: 'monospace', backgroundColor: '#f9f458', width: '270px', height: '25px', alignItems: 'end' }} onChange={(e) => setPreco(e.target.value)}/>
                    </div>
                    <div style={{ color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px', padding: '10px' }}>
                        <span style={{ fontSize: '25px', fontFamily: 'monospace' }}>Descrição:</span>
                        <input type='text' style={{ fontSize: '25px', fontFamily: 'monospace', backgroundColor: '#f9f458', width: '270px', height: '25px', alignItems: 'end' }} onChange={(e) => setDescricao(e.target.value)}/>
                    </div>
                    <div style={{ color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px', padding: '10px' }}>
                        <span style={{ fontSize: '25px', fontFamily: 'monospace' }}>Imagem:</span>
                        <input type='text' style={{ fontSize: '25px', fontFamily: 'monospace', backgroundColor: '#f9f458', width: '270px', height: '25px', alignItems: 'end' }} onChange={(e) => setImagem(e.target.value)}/>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <input type='button' value='ADICIONAR' style={{ fontSize: '20px', fontFamily: 'monospace', backgroundColor: '#12f30e', width: '250px', padding: '10px', margin: '10px', borderRadius: '10px' }} onClick={adicionarProduto}/>
                    </div>                    
                </div>
            </div>
        </div>      
    )
}
