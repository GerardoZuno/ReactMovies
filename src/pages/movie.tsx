import React, { useEffect, useState } from 'react'
import { Movie } from '../interfaces'

import "./movie.css"

import {useParams} from 'react-router-dom'
import { api } from '../utils/api'


const MovieDetails = () => {

    const [movie, setMovie] = useState<Movie | undefined>(undefined)

    const [loading, setLoading] = useState<boolean>(false)


    const params = useParams()


  useEffect(() => {
   fetchMovie()
  }, [])


  console.log(movie)

  



   const fetchMovie = async () => {

        try {
            setLoading(true)
         const response = await fetch(`https://api.themoviedb.org/3/movie/${params.id}?api_key=${api}`)
         const data = await response.json();
         setMovie(data)
    
        }catch(e) {
          console.log(e);
    
        }finally{
            setLoading(false)

    
       }   
    }



    

       if(loading) {
        <h1>Loading....</h1>
       }
 


  return (
    <>
         <img className="image" src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`} alt={movie?.title} />
         <p>{movie?.title}</p>
         <p>Fecha de Estreno: {movie?.release_date.toString()}</p>



    </>
  )
}

export default MovieDetails