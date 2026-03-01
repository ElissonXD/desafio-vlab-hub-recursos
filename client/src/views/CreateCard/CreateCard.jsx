import { useEffect, useState } from 'react'
import './CreateCard.css'
import toast from "react-hot-toast"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function CreateCard(){

    const [data, setData] = useState({
        title: "",
        type: "Vídeo",
        description: "",
        url: "",
        tags: ""
    })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()


    function handleInputChange(e){
        if (loading) return
        const newData = {...data, [e.target.name]: e.target.value}
        setData(newData)
    }

    function handleIAcall(){
        if(data.type == "" || data.title == ""){
            toast.error("Para gerar a descrição, o título e o tipo do material devem ser preenchidos")
            return
        }
        const promise = axios.post("http://localhost:8000/gemini", {title: data.title, type: data.type})

        toast.promise(promise, {
            loading: "Gerando descrição e tags...",
            success: "Descrição e tags geradas com sucesso!",
            error: "Houve um erro por parte da IA, tente novamente mais tarde"
        })

        const req = async () => {
            setLoading(true)
            try {
                const response = await promise
                setData({...data, description: response.data.description, tags: response.data.tags.join(", ")})
            } catch (error) {
                toast.error("Erro ao gerar descrição e tags")
            }
            setLoading(false)
        } 
        req()
    }

    function handleSubmit(e){
        e.preventDefault()

        const promise = axios.post("http://localhost:8000/card", data)

        toast.promise(promise, {
            loading: "Criando material...",
            success: "Material criado com sucesso!",
            error: "Houve um erro ao criar o material, tente novamente mais tarde"
        })

        const req = async () => {
            setLoading(true)
            try {
                const response = await promise
                navigate("/")
            } catch (error) {
                toast.error("Erro ao criar material")
            }
            setLoading(false)
        } 
        req()
    }

    return (
        <div className='CreateCard'>
            <h2>Adicionar Material</h2>
            <form className='Createform' onSubmit={handleSubmit}>
                <label htmlFor='title'>Título</label>
                <input name = "title" value = {data.title} onChange={handleInputChange} required/>
                <label htmlFor='type' required>Tipo</label>
                <select name = "type" id = "type" value = {data.type} onChange={handleInputChange}>
                    <option value = "Vídeo">Vídeo</option>
                    <option value = "PDF">PDF</option>
                    <option value = "Link">Link</option>
                </select>
                <label htmlFor='url' >Link/URL</label>
                <input name = "url" id= "url" value = {data.url} onChange={handleInputChange} required/>
                <label htmlFor='description'>Descrição</label>
                <textarea name = "description" id="description" value = {data.description} onChange={handleInputChange} required></textarea>
                <label htmlFor='tags'>Tags</label>
                <input name = "tags" id="tags" value = {data.tags} onChange={handleInputChange} required></input>
                <button type = "submit" className={loading ? "disabled" : ""}>Criar</button>
            </form>
            <div className='ExtraButtons'>
                <button onClick = {loading ? null : handleIAcall} className={loading ? "disabled" : ""}>Gerar descrição por IA</button>
                <button className={loading ? "disabled" : ""} onClick={() => {navigate("/")}}>Voltar</button>
            </div>

        </div>
    )
}

export default CreateCard