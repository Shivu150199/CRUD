import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Home.css'

const Home = () => {
  const [data, setData] = useState([])

  const loadData = async () => {
    const response = await axios
      .get('http://localhost:5000/api/get')
      .catch((err) => console.log(err))
    
    setData(response.data)
  }
  useEffect(() => {
    loadData()
  }, [])
const deleteContact=(id)=>{
    if(window.confirm("are you sure that you want to delete contact?")) {
        axios.delete(`http://localhost:5000/api/remove/${id}`);
        toast.success(`contact deleted successfully`);
        setTimeout(()=>loadData(),500)
    }
}
  return (
    <div style={{ marginTop: '150px' }}>
        <Link to='/addContact'>
        <button className="btn btn-contact">Add Contact</button>
        </Link>
      <table className="styled-table">
        <thead>
            <tr>

          <th style={{ textAlign: 'center' }}>No</th>
          <th style={{ textAlign: 'center' }}>Name</th>
          <th style={{ textAlign: 'center' }}>Email</th>
          <th style={{ textAlign: 'center' }}>Contact</th>
          <th style={{ textAlign: 'center' }}>Action</th>
            </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            const { id, name, email, contact } = item;
            return (
              <tr key={id}>
                <th scope="row">{index + 1}</th>
                <td>{name}</td>
                <td>{email}</td>
                <td>{contact}</td>
                <td>
                  <Link to={`/update/${id}`}>
                    <button className="btn btn-edit">Edit</button>
                  </Link>
                  <button className="btn btn-delete" onClick={()=>deleteContact(item.id)}>Delete</button>

                  <Link to={`/view/${id}`}>
                    <button className="btn btn-view">view</button>
                  </Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Home
