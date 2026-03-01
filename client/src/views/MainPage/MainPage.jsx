import { useEffect, useState, useRef } from 'react'
import './MainPage.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import CardBox from '../../components/cardsComponents/CardBox/CardBox'

function MainPage(){

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [cards, setCards] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const req = async () => {
            try {
                const response = await axios.get("http://localhost:8000/card")
                console.log(response.data.cards)
                setCards(response.data.cards)
                setLoading(false)
            } catch (error){
                setLoading(false)
                setError(true)
            }
        }

    req()
    }, [])

    function navigateCreate(){
        navigate("/criar")
    }

    return (
        <div className='MainPage'>
            <button className='Button' onClick={navigateCreate}>Adicionar Material</button>
            {loading && (<div>Carregando...</div>)}
            {(error && !loading) && (<div>Algo deu de errado ao coletar informações, tente novamente mais tarde</div>)}
                {!error && !loading && (
                    cards.length > 0 ? (
                        <div className='ContentBox'>
                            {cards.map((card) => (
                                <CardBox key = {card.id} card = {card}/>
                            ))}
                        </div>
                    )
                    : (
                        <div>Nenhum material registrado</div>
                    )
                )}


        </div>
    )

}



export default MainPage