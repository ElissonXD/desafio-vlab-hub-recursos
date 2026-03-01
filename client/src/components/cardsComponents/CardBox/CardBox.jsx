import "./CardBox.css"
import { useNavigate } from "react-router-dom"


function CardBox({card}){

    const navigate = useNavigate()

    function handleNavigate(){
    navigate(`/editar/${card.id}`)
    }


    return (
        <div className="CardBox">
            <div className="TopBar">
                <h2>{card.title}</h2>
                <h2>ID do material: # {card.id}</h2>
            </div>
            <p>{card.description}</p>
            <div className="MiddleBar">
                <p><strong>Tipo:</strong> {card.type}</p>
                <p><strong>URL/Link:</strong> {card.url}</p>
                <p><strong>Tags:</strong> {card.tags}</p>
            </div>
            <button onClick={handleNavigate}>Editar</button>
        </div>
    )
}

export default CardBox