
import { useEffect, useState, useRef} from 'react'

export const Users = () => {
    const ENDPOINT = "http://localhost:4000/users";

  const [users, setUsers] = useState([])
  const dialogRef = useRef(null)
  const dialogDeleteRef = useRef(null)
  const [currentUser, setCurrentUser] = useState({
    id: 0,
    email: '',
    name: '',
    pass: '',
    })

  const getAll =async ()=>{
    let fetchResp = await fetch(ENDPOINT)
    let dataJson = await fetchResp.json()
    setUsers(dataJson)
  }
  useEffect(() => {
    //useEffect vacio, significa que lo va ejecutar cuando se cargue el componente en memoria.
    ;(async () => {
        await getAll()
    })()
  }, [])
     ///METODOS PARA CREAR 
  const formSubmit = async (e) =>{
    e.preventDefault()
    if (currentUser.id <= 0){
      //Create
      await postData(currentUser)
    }
    else{
      await updateData(currentUser)
     
    }
    setCurrentUser({
      id: 0,
      email: '',
      name: '',
      pass: '',
    })
    dialogRef.current.close()
  }

  const postData = async (data)=>{
    let fetchResp = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
      })
      let json = await fetchResp.json()
      await getAll()
  }
 ///////////////////METODO PARA ACUTUALIZAR
  const updateData = async (data)=>{
    let fetchResp = await fetch(ENDPOINT + "/" + data.id, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
      })
      let json = await fetchResp.json()
      await getAll()
  }
  const showEdit = (row)=>{
    setCurrentUser(row)
    dialogRef.current.showModal()
  }

 


   //////////METODO PARA ELIMINAR 

   const deleteRow = async (row)=>{
    setCurrentUser(row)
    dialogDeleteRef.current.showModal()
  }

  const deleteData = async (row) =>{
    let fetchResp = await fetch(ENDPOINT + "/" + row.id, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json"
      }
      })
      let json = await fetchResp.json()
      await getAll()
  }

  const confirmDelete = async(e)=>{
    e.preventDefault();
    await deleteData(currentUser)
    dialogDeleteRef.current.close()
  }
      //////////METODO DE FUNCIONES ////
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


   
  return(
     <>  
          <h1> me queres Manubrio    </h1>
           
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
           <div className="w3-row">
            <div className="w3-col m4">
              <button type="submit" className="w3-button w3-green">Guardar</button>         
              </div>
              </div>
           

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
                <th>pass</th>
            </tr>
            </thead>
            <tbody>
            {users.map((row) => (
           
                <tr key ={"users"+row.id }>
                <td>{row.id}</td>
                <td>{row.email}</td>
                <td>{row.name}</td>
                <td>{row.pass}</td>

                <button className="w3-button w3-yellow" onClick={(e)=> { showEdit(row) }}>Editar</button>
                 <button className="w3-button w3-red" onClick={(e)=> {deleteRow(row)}}>Borrar</button>
                
             </tr>
                ))}
               </tbody>
            </table>

            <dialog ref={dialogDeleteRef}>
        <h4>Confirmación de borrado</h4>
        <form onSubmit={confirmDelete} className="w3-container">
           
            Esta seguro que desea eliminar a {currentUser.name}
            <div className='w3-row'>
              <div className='w3-col m6'>
                <button className="w3-button w3-red" type="submit">Confirmar</button>
              </div>
              <div className='w3-col m6'>
                  <button className="w3-button w3-blue" onClick={(e)=>{
                  e.preventDefault()
                  dialogDeleteRef.current.close()
                }} >Cancelar</button>
              </div>
            </div>
        </form>
      </dialog>
         
            
        </>
    )
}
