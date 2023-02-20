import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaBeer } from 'react-icons/fa';
import { BsThermometerSun , BsWind} from 'react-icons/bs';
import { WiHumidity } from 'react-icons/wi';

export default function Weather() {



const [ locValue, setLocValue ] = useState('');
const [show, setShow ] = useState(false);
const [error, setError] = useState(false);
const url = `https://api.openweathermap.org/data/2.5/weather?q=${locValue}&appid=870c8ece2357ebb7e3f05fac0e3c31e9&units=metric`;
const [info, setInfo ] = useState({
    city:undefined,
    Temp:null,
    Feels:null,
    himidity:null,
    windSpeed:null,
    description:''
})

useEffect(() => {
    if (locValue === '') {
        setInfo({...info, 'city': undefined});
    }
  }, [locValue]);






let handleSubmit = (e)=>{
   
    e.preventDefault();

   

    
    axios.get(url)
     .then((Response)=>{
        console.log(Response.data)
        setInfo({...info, 'city': Response.data.name, 'Temp':Response.data.main.temp, 'himidity':Response.data.main.humidity, 'windSpeed': Response.data.wind.speed, 'Feels':Response.data.main.feels_like, 'description':Response.data.weather[0].description })
     })
     .catch(err=>{
        
        setError(true);
     })
}

  return (
    <>
            <div className='w-full  min-h-screen max-h-fit  flex flex-col border-4  place-items-center bg-blue-300 '>


                <form onSubmit={handleSubmit} className='m-24'> 

                    <input type='text'  value={locValue} onChange={(e)=>{setLocValue(e.target.value); setError(false); setShow(false)}} placeholder='Enter City'  className='enabled:hover:border-gray-400 disabled:opacity-75 placeholder-shown:border-gray-500 rounded-full mx-2'/>
                    <button type='submit' className='bg-green-900 p-2 rounded-full px-4'> Submit </button>
                </form>

                <div className='w-1/2 flex flex-col place-items-center '>

                         {  error && 
                         
                                    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
                                    <p className="font-bold">Warning</p>
                                    <p>Something went wrong. Please try again.</p>
                                    </div>
                         }
                            
                        {info.city !== undefined &&

                                        <div className=' border-4 space-y-4 border-b'>

                                                 <h1 className=' text-[35px] font-bold border-b-2 px-4'>  Weather Today in <span className='text-rose-700' > {info.city}   </span > </h1>

                                                    
                                                    <h2 className='text-[55px] px-4 ' > {info.Temp} °C </h2>
                                                    <h4 className='text-[55px] px-4 ' > {info.description}  </h4>


                                                    <div className='grid grid-cols-2 gap-4 content-between text-lg'>
                                                        <div     className='px-4'>                                                    
                                                            <p className=' border-b-2 pb-2 w-full flex text-center h-fit '> <BsThermometerSun className='my-[3px] mr-4 text-lg' /> Feels-Like:  </p>
                                                            <p className=' border-b-2 pb-2 w-full flex text-center h-fit'> <WiHumidity className='my-[3px] mr-4 text-2xl' /> Himidity:  </p>
                                                            <p className=' border-b-2 pb-2 w-full flex text-center h-fit'><BsWind className='my-[3px] mr-4 text-lg' /> Wind Speed:   </p>
                                                    
                                                    
                                                         </div>

                                                        <div className='text-end px-4 mb-12'>
                                                            <p className=' border-b-2 pb-2' > {info.Feels} °C  </p>
                                                            <p className=' border-b-2 pb-2' > {info.himidity} %  </p>
                                                            <p className=' border-b-2 pb-2'> {info.windSpeed} km/h  </p>

                                                        </div>
                                                    </div>


                                        </div> 
                                         } 
                </div>

                
      
       
            </div>
        
    </>
  )
}
