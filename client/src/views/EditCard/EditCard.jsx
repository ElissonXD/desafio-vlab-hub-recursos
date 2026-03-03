import "./EditCard.css"
import toast from "react-hot-toast"
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from "react"

function EditCard(){
    const navigate = useNavigate()
    const {id} = useParams()

    const [card, setCard] = useState({id: id, title: "", type: "Vídeo", description: "", url: "", tags: ""})
    const [loading, setLoading] = useState(true)
    const [submit, setSubmit] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        const req = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/edit/${id}`)
                if (response.data.card.length == 0){
                    toast.error("Material não encontrado ou não existe")
                    navigate("/")
                }
                setCard(response.data.card)
                setLoading(false)
            } catch (error){
                setError(true)
                setLoading(false)

            }
        }
        req()
    }, [])

    function handleInputChange(e){
        if (submit) return
        const newCard = {...card, [e.target.name]: e.target.value}
        console.log(newCard)
        setCard(newCard)
    }

    function handleSubmit(e){
        e.preventDefault()

        const promise = axios.put(`http://localhost:8000/edit/${id}`, card)

        toast.promise(promise, {
            loading: "Editando material...",
            success: "Material editado com sucesso!",
            error: "Houve um erro ao editar o material, tente novamente mais tarde"
        })

        const req = async () => {
            setSubmit(true)
            try {
                const response = await promise
                navigate("/")
            } catch (error) {
                toast.error("Erro ao editar material")
            }
            setSubmit(false)
        } 
        req()
    }

    function handleDelete(){

        const promise = axios.delete(`http://localhost:8000/edit/${id}`)

        toast.promise(promise, {
            loading: "Deletando material...",
            success: "Material deletado com sucesso!",
            error: "Houve um erro ao deletar o material, tente novamente mais tarde"
        })

        const req = async () => {
            setSubmit(true)
            try {
                const response = await promise
                navigate("/")
            } catch (error) {
                toast.error("Erro ao deletar material")
            }
            setSubmit(false)
        } 
        req()
    }

    return (
        <div className="EditCard">
            <h2>Editar material</h2>
            {loading && (<div>Carregando...</div>)}
            {(error && !loading) && (<div>Algo deu de errado ao coletar informações, tente novamente mais tarde</div>)}
            {(!error && !loading) && (
                <>
                    <form className='Createform' onSubmit={handleSubmit}>
                        <label htmlFor='title'>Título</label>
                        <input name = "title" value = {card.title} onChange={handleInputChange} required/>
                        <label htmlFor='type' required>Tipo</label>
                        <select name = "type" id = "type" value = {card.type} onChange={handleInputChange}>
                            <option value = "Vídeo">Vídeo</option>
                            <option value = "PDF">PDF</option>
                            <option value = "Link">Link</option>
                        </select>
                        <label htmlFor='url' >Link/URL</label>
                        <input name = "url" id= "url" value = {card.url} onChange={handleInputChange} required/>
                        <label htmlFor='description'>Descrição</label>
                        <textarea name = "description" id="description" value = {card.description} onChange={handleInputChange} required></textarea>
                        <label htmlFor='tags'>Tags</label>
                        <input name = "tags" id="tags" value = {card.tags} placeholder="Separe as tags por vírgula e um espaço!" onChange={handleInputChange} required></input>
                        <button type = "submit" className={submit ? "disabled" : ""}>Confirmar alterações</button>
                    </form>
                    <button className = "ReturnButton" onClick={() => {navigate("/")}}>Voltar</button>
                    <h2>Zona de perigo</h2>
                    <button className={"DeleteButton" + (submit ? " disabled" : "")} onClick={!submit ? handleDelete : null}>Deletar material</button>
                </>
            )}

        </div>
    )
}


export default EditCard