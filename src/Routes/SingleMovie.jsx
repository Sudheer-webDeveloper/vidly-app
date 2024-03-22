import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const SingleMovie = () => {
    const {id} = useParams()
    console.log(id)
    const naviagte = useNavigate()
  return (
    <div>
     movie id : {id}
     <button onClick={()=>naviagte("/")}>save</button>
    </div>
  )
}

export default SingleMovie
