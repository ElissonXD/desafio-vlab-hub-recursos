import "./FilterBox.css"

function FilterBox({ onChange, filters}){
    
    return (
        <div className="FilterBox">
            <h2>Filtros</h2>
                <form>
                    <div className='InputLabel'>
                        <label htmlFor='title'>Título:</label>
                        <input name = "title" value = {filters.title} onChange={onChange}></input>
                    </div>

                    <div className='InputLabel'>
                        <label htmlFor='type'>Tipo:</label>
                        <select name = "type" value = {filters.type} onChange={onChange}>
                            <option value="">Todos</option>
                            <option value="Vídeo">Vídeo</option>
                            <option value="PDF">PDF</option>
                            <option value= "Link">Link</option>
                        </select>
                    </div>

                    <div className='InputLabel'>
                        <label htmlFor='tags'>Tags:</label>
                        <input name = "tags" value = {filters.tags} onChange={onChange} placeholder="Separe as tags por vírgula!"></input>
                    </div>
                </form>

        </div>
    )
}

export default FilterBox