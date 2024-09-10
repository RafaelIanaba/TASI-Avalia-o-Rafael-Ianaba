import * as React from 'react';
import Box from '@mui/material/Box';
import axios from 'axios'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

export default function App() {
  var [ lista, setLista ] = React.useState([])
  var [ episodios, setEpisodios ] = React.useState({})

  const buscarDados = async () => {
    var urlPersonagens = "https://rickandmortyapi.com/api/character"
    var urlEpisodios = "https://rickandmortyapi.com/api/episode"

    await axios.get(urlPersonagens).then( retorno => {
      var dadosPersonagens  = retorno.data.results 
      setLista(dadosPersonagens)
    })
    
    await axios.get(urlEpisodios).then( retorno => {
      var dadosEpisodios = retorno.data.results
      const episodiosMap = {};
        dadosEpisodios.forEach(episodio => {
        episodiosMap[episodio.url] = episodio.name;
      }) 
      setEpisodios(episodiosMap);
    })
  }

  const novo_html = lista.map( (item,key) => {
    const episodioNome = episodios[item.episode[0]]
    const corPonto = item.status === "Dead" ? "#ff0000" : item.status === "unknown" ? "#0000FF" : "#55d41d"
    const ponto = (
      <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(2.0)' }} style={{ color: corPonto }}>
        •
      </Box>
    );
    
    return (
      <Card key={ key } style={ { "width":"400px", "backgroundColor":"#4c4c4c", "borderRadius":"10px", "marginBottom":"10px", "marginTop":"10px" } }>
        <CardActionArea>
          <CardMedia component="img" src={ item.image } style={ { "height":"250px" } }/>

          <CardContent>
            <Typography  variant="h5" component="div" style={ { "color":"white", "padding":"0px" } }>
              { item.name }
            </Typography>

            <Typography variant="body2" style={ { "color":"white" } }>
              {ponto} {item.status} - {item.species}
            </Typography>
            <br/>

            <Typography variant="body2" style={ { "color":"#a1a1a1" } }>
              Last Known location:
            </Typography>

            <Typography variant="body2" style={ { "color":"white" } }>
              {item.location.name}
            </Typography>
            <br/>

            <Typography variant="body2" style={ { "color":"#a1a1a1" } }>
              First seen in:
            </Typography>

            <Typography variant="body2" style={ { "color":"white" } } >
              {episodioNome}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  })

  return(
    <div>
      <button onClick={ () => buscarDados() }>
        BUSCAR
      </button>
      { novo_html }
    </div>
  )
}
