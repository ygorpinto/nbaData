import axios from 'axios'
import styles from '../styles/Home.module.css'
function App(props) {

  const first = props.percentOther
  const second = props.percentMenos1

  return (
    <div className={styles.main}>
    <header>
        <h1>NBA Analise</h1> 
    </header>
        <div>
            <div className="lessthen1"> Jogos com diferença maior que 1 : <strong>{first}</strong></div>
            <div className="greatherthen1">Jogos com diferença igual ou menos que 1 : <strong>{second}</strong></div>
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
      percentOther:percentOther,
      percentMenos1:percentMenos1
    }, // will be passed to the page component as props
  }
}

export default App;
