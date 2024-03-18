import React, { useEffect, useState } from 'react';
import styles from './filter.module.css';
import { Product } from '../../Interfaces';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface FilterInterface {
  setProducts: (products: Product[]) => void;
  active: string,
  setActive: (type: string) => void;
}

const Filter: React.FC<FilterInterface> = ({setProducts, active, setActive}) => {

  const [types, setTypes] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchTypes = async () => {
      try{
        const res = await axios.get('https://typescript-with-backend.onrender.com/api/product/get-types')
        setTypes(res.data.types);
      }catch(err){
        console.log(err);
        toast.error("Error Fatching Collections");
        setTypes(['shirt', 'tshirt', 'saree', 'kurti', 'couple dress']);
      }
    }
    fetchTypes();
  },[]);

  const changeCollection = (type:string) => {
    setActive(type);
    navigate('/');
  }

  return (
    <div className={styles.filterCont}>
      <ul className={styles.navMenu}>
        {types && types.map((type,index) => <li key={index} className={type===active? styles.active: ''} onClick={() => changeCollection(type)} >{type}</li>)}
      </ul>
    </div>
  )
}

export default Filter
