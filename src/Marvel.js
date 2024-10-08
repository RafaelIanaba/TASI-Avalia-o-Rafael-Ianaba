import React, { useState } from 'react';
import axios from 'axios';
import MD5 from 'md5';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';


export default function Marvel() {

    const [personagem, setPersonagem] = useState('')
    const [dados, setDados] = useState(null)

    const buscarPersonagem = async () => {
        const publicKey = '21076f12635a23daf113c87742e0c834'
        const privateKey = '1b414ac49de4167fa9e04164575b72471bb8d791'
        const ts = Date.now()
        const hash = MD5(ts + privateKey + publicKey)
        const url = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${personagem}&ts=${ts}&apikey=${publicKey}&hash=${hash}`

        await axios.get(url).then( retorno => {
            setDados(retorno.data.data.results)
            console.log(dados)
        })
    }
  

    return (
        <div>
        <h2>Informações de heróis da Marvel</h2>
        <input type="text" placeholder="Digite o nome do personagem" value={personagem} onChange={(e) => setPersonagem(e.target.value)}
        />
        <button onClick={buscarPersonagem}>Buscar</button>
        {dados && (
            <div>
            {dados.map((personagem) => (
                <div key={personagem.id}>
                <div>
                    <Card style={ { "width":"500px", "backgroundColor":"#4c4c4c", "borderRadius":"10px", "marginBottom":"10px", "marginTop":"10px" } }>
                        <CardActionArea>
                            <CardMedia component="img" src={`${personagem.thumbnail.path}.${personagem.thumbnail.extension}`} style={ { "height":"250px" } }/>
                            <CardContent>
                            <Typography variant="h6" style={{ "color":"white" }}>
                                NOME: {personagem.name}
                            </Typography>
                            <br/>
                            <Typography variant="body2" style={{ "color":"#a1a1a1" }}>
                                DESCRIÇÃO: {personagem.description || 'Sem descrição disponível'}
                            </Typography>
                            <br/>
                            <Typography variant="body2" style={{ "color":"white" }}>
                                QUADRINHOS: {personagem.comics.available} disponíveis
                            </Typography>
                            <br/>
                            <Typography variant="body2" style={{ "color":"#a1a1a1" }}>
                                SÉRIES: {personagem.series.available} disponíveis
                            </Typography>
                            <br/>
                            <Typography variant="body2" style={{ "color":"white" }}>
                                EVENTOS: {personagem.events.available} disponíveis
                            </Typography>
                            <br/>
                            <Typography variant="body2" style={{ "color":"#a1a1a1" }}>
                                HISTÒRIAS: {personagem.stories.available} disponíveis
                            </Typography>
                            <br/>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    </div>
                </div>
            ))}
            </div>
        )}
        </div>
    )
}
