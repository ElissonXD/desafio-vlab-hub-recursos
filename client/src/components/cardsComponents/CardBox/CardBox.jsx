import "./CardBox.css"
import Tag from "../Tag/Tag"
import { useNavigate } from "react-router-dom"


function CardBox({card, handleClick}){

    const navigate = useNavigate()

    function handleNavigate(){
    navigate(`/editar/${card.id}`)
    }

    const tags = card.tags.split(",")


    return (
        <div className="CardBox">
            <div className="TopBar">
                <h2>Título: {card.title}</h2>
            </div>
            <p>{card.description}</p>
            <div className="MiddleBar">
                <p><strong>Tipo:</strong> {card.type}</p>
                <p><strong>URL/Link:</strong> <a target="blank" href={card.url}>{card.url}</a></p>
                <div className="TagSection">
                    <strong>Tags:</strong>
                    {tags.map((tag) => (
                        <Tag key={tag} name={tag} onClick={handleClick} />
                    ))}
                </div>
            </div>
            <button onClick={handleNavigate}>Editar</button>
        </div>
    )
}

export default CardBox