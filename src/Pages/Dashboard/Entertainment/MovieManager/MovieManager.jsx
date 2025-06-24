import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';

const MovieManager = () => {

    const [movies,setMovies]=useState([]);
    const axiosSecure= useAxiosSecure();


// console.log(movies);
    useEffect(()=>{
       axiosSecure.get('/allmovies')
       .then(res=>
        
        setMovies(res.data))
    },[axiosSecure])

    const handleDelete=(id)=>{  
        const confirmDelete = window.confirm("Are you sure you want to delete this movie?");
        if (confirmDelete) {
            axiosSecure.delete(`/allmovies/${id}`)
            .then(res=>{
                if(res.data.deletedCount>0){
                    setMovies(movies.filter(movie => movie._id !== id));
                }
            })
        }
    }

    return (
        <div
        className='h-[900px] md:h-[1100px] bg-cover bg-center'
        style={{ backgroundImage: "url('/addcine2.jpg')" }}
        >
                  <div className="absolute inset-0 bg-black/40 bg-opacity-50"></div>

       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-4">
        {movies.map((movie) => (
          <div
            key={movie._id}
            className="relative group overflow-hidden  hover:shadow-2xl transition-shadow duration-300"
          >
            <img
              src={movie.imageLink}
              alt={movie.name}
              className="w-60 h-80 object-cover"
            />
            {/* Hover Edit Button */}
            <div className="absolute bottom-0 bg-black/20 bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-5 justify-between">
             <Link to={`moviedetails/${movie._id}`}>
             <button className="px-4 py-2 bg-white text-black rounded-md font-semibold hover:bg-gray-200">
                Edit
              </button>
             </Link>
          
              <button
              
              onClick={()=>handleDelete(movie._id)}
              className="px-4 py-2 bg-white text-red-700 rounded-md font-semibold hover:bg-gray-200">
                Delete
              </button>

         </div>
          </div>
        ))}
      </div>
      
        </div>
 
    );
};

export default MovieManager;