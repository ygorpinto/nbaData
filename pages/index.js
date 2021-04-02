import axios from 'axios'
import styles from '../styles/Home.module.css'
function App(props) {

  const first = props.percentOther
  const second = props.percentMenos1
  const total = props.totalGames
  const totaljogos1 = props.totalmenos1
  const totalmais1 = props.gamesleft


  return (
    <div className={styles.main}>
    <header>
        <h1>NBA Analise</h1> 
    </header>
        <div>
          <div>Buscando todos os jogos de 2020 da NBA :</div>
            <br/>
            <div>Total de jogos : <strong>{total}</strong></div>
            <br/>
            <div className="lessthen1"> Jogos com diferença maior que 1 : <strong>{first}</strong></div>
            <div>Total : <strong>{totalmais1}</strong></div>
            <br/>
            <div className="greatherthen1">Jogos com diferença igual ou menor que 1 : <strong>{second}</strong></div>
            <div>Total : <strong>{totaljogos1}</strong></div>
        </div>
    </div>
  );
}

export async function getServerSideProps(context) {

        const response = await axios.get('https://fly.sportsdata.io/v3/nba/scores/json/Games/2020?key=79d2dd80e5c54406aafd10286dbb90ea')
        const data = await response.data;
    
        const pointSpread1 = data.filter(item => item.PointSpread <= 1 && item.PointSpread >= -1)
        
    
        const totalGames = data.length
        const totalMenos1 = pointSpread1.length
    
        const gamesLeft = (totalGames - totalMenos1)
    
        const percentMenos1 = `${Math.round((totalMenos1/totalGames)*100)}%`
        const percentOther = `${Math.round((gamesLeft/totalGames)*100)}%`

  return {
    props: {
      totalGames:totalGames,
      totalmenos1:totalMenos1,
      gamesleft:gamesLeft,
      percentOther:percentOther,
      percentMenos1:percentMenos1
    }, // will be passed to the page component as props
  }
}

export default App;
