import React, { useEffect, useState } from 'react'
import Fields from './InputsTags'
import axios from 'axios'
const Currency = () => {
  const initialData = {
    amount : 1,
    from : 'USD',
    to : 'EUR'
  }
  const [state, setState] = useState(initialData);
  const [converted, setConverted] = useState('');
  const [isLoading, setLoading] = useState(false);
 
  const handleChange=(e)=>{
    const{name,value} = e.target;
    setState({
      ...state,
      [name] : value
    })
    console.log(state);
  };
 
  useEffect(()=>{
    const CurrencyConverter = async()=>{
      try{
        setLoading(true);
        const res  =  await axios.get(`https://api.frankfurter.app/latest?amount=${state.amount}&from=${state.from}&to=${state.to}`)
        console.log('data', res.data.rates[state.to]);
        setConverted(res.data.rates[state.to]);
        setLoading(false);
      }catch(error){
        console.log('fetching error', error);
      }
      
    };
    if(state.from === state.to) return setConverted(state.amount);
    CurrencyConverter();
  },
  
  [state]
  )
  return (
    <div>
        <input
            name='amount'
            type='text'
            value={state.amount}
            onChange={handleChange}
            disabled={isLoading}
        />
      {
        Fields.map((field)=>{
         
               if(field.name === 'from' || field.name === 'to')
               {
                    return(
                        <label key={field.name}>
                            <select
                            type={field.type}
                            name={field.name}
                            value={state[field.name]}
                            onChange={handleChange}
                            disabled={isLoading}
                            >
                                {
                                    field.options.map((option)=>(
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))
                                }
                            </select>
                        </label>
                    )
               }
               else{
                return null;
               }
            
        })
      }
     <p> <span>
      {converted} {state.to}
      </span></p>
    </div>
  )
}

export default Currency
