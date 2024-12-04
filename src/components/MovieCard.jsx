import React from 'react'

function MovieCard({ movieObj,poster_path,name,handleAddtoWatchlist,handleRemoveFromWatchlist,watchList}) {
  function doescontain(movieobj){
    for(let i=0;i<watchList.length;i++){
      if(watchList[i].id== movieObj.id){
        return true
      }
    }
    return false
  }
  return (
    <div className='h-[40vh] w-[200px] bg-center bg-cover rounded-xl hover:scale-110 duration-300 hover:cursor-pointer flex flex-col justify-between  items-end' style={{backgroundImage:`url(https://image.tmdb.org/t/p/original/${poster_path})` }}>
      {doescontain(movieObj)?
      <div onClick={()=>(handleRemoveFromWatchlist(movieObj))} className='m-4 flex justify-center h-8 w-8 items-center rounded-lg' >	&#10060;</div>:(
      <div onClick={()=>(handleAddtoWatchlist(movieObj))} className='m-4 flex justify-center h-8 w-8 items-center rounded-lg'>
      &#128525;
      </div>
      )}
     <div className='text-white text-xl w-full p-2 text-center bg-gray-900/60'>
        {name}
      </div>
    </div>
  )
}

export default MovieCard
