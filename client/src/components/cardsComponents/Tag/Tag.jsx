import "./Tag.css"
import tag from "../../../assets/tag.png"


function Tag({name, onClick}){

    return (
        <div className="Tag">
            <img src={tag}></img>
            <button onClick={onClick} value={name}>{name}</button>
        </div>
    )
}




export default Tag