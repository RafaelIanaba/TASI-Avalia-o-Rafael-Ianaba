import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function LisProduto() {
    
    const [produtos, setProdutos] = useState([])
    const [pesquisa, setPesquisa] = useState('')

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

    const Pesquisar = async () => {
        if (pesquisa==='') {
            listarProduto()
        } else {
            try {
                const resposta = await axios.get(`https://backend-aula.vercel.app/app/produtos/${pesquisa}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                setProdutos(resposta.data)
            } catch (err) {
                console.error('Erro ao pesquisar o produto:', err)
                alert('Houve um erro na pesquisa de produtos.')
            }
        }
    }

    const listarProduto = async () => {
        try {
            const resposta = await axios.get('https://backend-aula.vercel.app/app/produtos', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            setProdutos(resposta.data)
        } catch (err) {
            console.error('Erro ao listar os produtos:', err)
            alert('Houve um erro na listagem de produtos.')
        }
    }
    
    useEffect(() => {
        listarProduto()
    }, [])
    

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', margin: '10px' }}>
                <input type='button' value='LISTAR PRODUTOS' style={{ fontSize: '15px', fontFamily: 'monospace', backgroundColor: '#35f736', width: '20%', padding: '5px', margin: '10px', borderRadius: '10px' }} onClick={navegarLista}/>
                <input type='button' value='ADICIONAR PRODUTOS' style={{ fontSize: '15px', fontFamily: 'monospace', backgroundColor: '#f07c46', width: '20%', padding: '5px', margin: '10px', borderRadius: '10px' }} onClick={navegarAdiciona}/>
                <input type='button' value='ALTERAR PRODUTOS' style={{ fontSize: '15px', fontFamily: 'monospace', backgroundColor: '#337dff', width: '20%', padding: '5px', margin: '10px', borderRadius: '10px' }} onClick={navegarAltera}/>
                <input type='button' value='EXCLUIR PRODUTO' style={{ fontSize: '15px', fontFamily: 'monospace', backgroundColor: '#e91e21', width: '20%', padding: '5px', margin: '10px', borderRadius: '10px' }} onClick={navegarDeleta}/>
                <input type='button' value='DESLOGAR' style={{ fontSize: '15px', fontFamily: 'monospace', backgroundColor: '#a7a5a5', width: '20%', padding: '5px', margin: '10px', borderRadius: '10px' }} onClick={Deslogar}/>
            </div>
    
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                <input type='text' placeholder='PESQUISAR PRODUTOS' value={pesquisa} style={{ width: '500px', height: '30px', borderRadius: '10px', fontSize: '15px', fontFamily: 'monospace'}} onChange={(e) => setPesquisa(e.target.value)} />
                <input type='button' value='PESQUISAR' style={{ width: '300px', height: '30px', borderRadius: '10px', fontSize: '15px', fontFamily: 'monospace', backgroundColor: '#fafa03', marginLeft: '10px'}} onClick={Pesquisar}/>
            </div>
    
            <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {produtos.map((produto) => (
                    <div key={produto._id} style={{ width: '25%', backgroundColor: '#35f736', borderRadius: '30px', borderStyle: 'solid', margin: '20px' }}>
                        <div style={{ height: '250px' }}>
                            <img src={produto.imagem} style={{ width: '100%', height: '100%', borderTopLeftRadius: '25px', borderTopRightRadius: '25px' }}/>
                        </div>
                        <div style={{ padding: '10px' }}>
                            <h6 style={{ fontSize: '15px', color: 'white', margin: '15px', wordWrap: 'break-word', whiteSpace: 'normal' }}>ID: {produto._id}.</h6>
                            <h6 style={{ fontSize: '15px', color: 'white', margin: '15px', wordWrap: 'break-word', whiteSpace: 'normal' }}>NOME: {produto.nome}.</h6>
                            <h6 style={{ fontSize: '15px', color: 'white', margin: '15px' }}>QUANTIDADE: {produto.quantidade}.</h6>
                            <h6 style={{ fontSize: '15px', color: 'white', margin: '15px' }}>PREÇO: R$ {produto.preco}</h6>
                            <h6 style={{ fontSize: '15px', color: 'white', margin: '15px', wordWrap: 'break-word', whiteSpace: 'normal' }}>DESCRIÇÃO: {produto.descricao}.</h6>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
