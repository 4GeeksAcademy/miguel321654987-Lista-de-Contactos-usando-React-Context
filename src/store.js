export const initialStore=()=>{
  return{
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ],
    contactos:[]
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
     case 'set_contacts':
      // Guarda la lista completa que viene de la API
      return {
        ...store,
        contactos: action.payload // action.payload es el array de contactos
      };

    case 'add_contact':
      // Añade un nuevo contacto al array existente
      return {
        ...store,
        contactos: [...store.contactos, action.payload]
      };

    case 'update_contact':
      // Busca el contacto por ID y lo reemplaza con los nuevos datos
      return {
        ...store,
        contactos: store.contactos.map(contacto =>
          contacto.id === action.payload.id ? action.payload : contacto
        )
      };

    case 'delete_contact':
      // Filtra el array para quitar el contacto con el ID recibido
      return {
        ...store,
        contactos: store.contactos.filter(contacto => contacto.id !== action.payload)
      };

    case 'add_task':

      const { id,  color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };
    default:
      throw Error('Unknown action.');
  }    
}
