import React from 'react'
import './Selection.css'

const Selection = ({ genre, genreChange, genres }) => {
    return (
        <div className="selection">
            <label> Genre </label>
                <select value={genre} onChange={genreChange}>
                    {genres.map(genre => (
                        <option value={genre.name} key={genre.id}> {genre.name} </option>
                    ))}
            </select>
        </div>
    )
}

export default Selection