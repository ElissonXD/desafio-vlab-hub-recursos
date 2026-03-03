import "./Header.css"
import { useNavigate } from "react-router"

function Header(){

    const navigate = useNavigate()

    return (
        <div className="Header">
            <h2 onClick={() => navigate("/")}>Hub Recursos Educacionais</h2>
        </div>
    )

}



export default Header