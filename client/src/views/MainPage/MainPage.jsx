import { useEffect, useState, useRef } from 'react'
import './MainPage.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import CardBox from '../../components/cardsComponents/CardBox/CardBox'
import FilterBox from '../../components/searchComponents/FilterBox/FilterBox'

function MainPage(){

    // Estados de controle
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [cards, setCards] = useState([])
    const navigate = useNavigate()

    // Paginação
    const [itensperPage, setItensperPage] = useState(3)
    const [currentPage, setCurrentPage] = useState(0)
    const [pages, setPages] = useState(0)

    // Filtro
    const [filters, setFilters] = useState({title: "", type: "", tags: ""})

    function handleFilterChange(e){
        const newFilters = {...filters, [e.target.name]: e.target.value}
        setFilters(newFilters)
        setCurrentPage(0)
    }

    //API
    useEffect(() => {
        const req = async () => {
            setLoading(true)
            try {
                const response = await axios.get("http://localhost:8000/card", {params: {
                        limit: itensperPage,
                        offset: currentPage * itensperPage,
                        ...filters
                    }
                })
                setCards(response.data.cards)
                setPages(Math.ceil(response.data.count / itensperPage))
                setLoading(false)
            } catch (error){
                setLoading(false)
                setError(true)
            }
        }

    req()
    }, [currentPage, itensperPage, filters])



    function navigateCreate(){
        navigate("/criar")
    }

    return (
        <div className='MainPage'>
            <div className='LeftSide'>
            <button className='Button' onClick={navigateCreate}>Adicionar Material</button>
            <FilterBox onChange = {handleFilterChange} filters = {filters}/>
            </div>

            <div className='RightSide'>
                {loading && (<div>Carregando...</div>)}
                {(error && !loading) && (<div>Algo deu de errado ao coletar informações, tente novamente mais tarde</div>)}
                    {!error && !loading && (
                        cards.length > 0 ? (
                            <div className='ContentBox'>
                                <div className='Pagination'>
                                    {Array.from(Array(pages), (item, index) => {
                                        return <div className='PageNumber' key={index} onClick={() => setCurrentPage(index)}>{index + 1}</div>
                                    })}
                                </div>
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
        </div>
    )

}



export default MainPage