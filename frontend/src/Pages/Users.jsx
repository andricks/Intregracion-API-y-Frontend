
import { useEffect, useState, useRef} from 'react'
export const Users = () => {
const [users, setUsers] = useState([])
const dialogRef = useRef(null)  
const ENDPOINT = "http://localhost:4000/users";
const[currentUser , setCurrentUser ] = useState({

    id:0,
    name:"",
    email:"",
    pass:""

})
const getAll = async  ()=> {

    let fetchResp = await fetch(ENDPOINT)
    let dataJson = await fetchResp.json()
    setUsers(dataJson)
}

  useEffect(() => {
    //useEffect vacio, significa que lo va ejecutar cuando se cargue el componente en memoria.
    (async () => {
           await getAll()
    })()
  }, [])


   const newUserClick = (e) =>{
    e.preventDefault()
    dialogRef.current.showModal()
   }

const closeUserClick = (e) =>{
    e.preventDefault() 
    dialogRef.current.close()
}
const valueHasChanged = (e) =>{
    setCurrentUser({
        ...currentUser,
        [e.target.name]: e.target.value
    })
} 

const formSubmit = async (e) => {
    e.preventDefault()
    let fetchResp = await fetch(ENDPOINT,{
        method:"POST",
        header : {
            "Content-Type": "application/Json"
        },
        body:JSON.stringify(currentUser)
    })
    let json = await fetchResp.json()
    console.log(json)
    await getAll()
}
  return(
     <>  
     
        <dialog  ref={dialogRef}>  
    <h2> Nuevo   </h2>   
    <form onSubmit={formSubmit} className="w3-container">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            className="w3-input"
            value={currentUser.name}
            onChange={valueHasChanged}
          />
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            className="w3-input"
            value={currentUser.email}
            onChange={valueHasChanged}
          />
          <label htmlFor="pass">Contrasenia</label>
          <input
            type="password"
            id="pass"
            name="pass"
            className="w3-input"
            value={currentUser.pass}
            onChange={valueHasChanged}
          />
    <button type="submit" className="w3-button w3-green">Guardar</button>   

    </form>
        <button  onClick={ closeUserClick}  >  cerrar </button>
        </dialog>
        <button onClick={newUserClick}>  nuevo usuario  </button>
    <h1>Users</h1>
    <table className="w3-table w3-striped w3-bordered w3-border">
        <thead>
            <tr>
                <th>Id</th>
                <th>Email</th>
                <th>name</th>
            </tr>
        </thead>
        <tbody>
            {users.map((row) => (
           
                <tr key ={"users"+row.id }>
                <td>{row.id}</td>
                <td>{row.email}</td>
                <td>{row.name}</td>
             </tr>
            ))}
        </tbody>
    </table>
  
    </>
  )
}