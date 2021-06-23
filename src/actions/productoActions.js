import {
    AGREGAR_PRODCUTO_ERROR,
    AGREGAR_PRODUCTO,
    AGREGAR_PRODCUTO_EXITO,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_ERROR,
    DESCARGA_PRODUCTOS_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    PRODUCTO_ELIMINADO_EXITO,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_EDITADO_EXITO,
    OBTENER_PRODUCTO_EDITAR,
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITADO_ERROR
} from '../types'

import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

//Crear nuevos productos
export function crearNuevoProductoAction(producto ){
    return async (dispatch) =>{
        dispatch(agregarProducto());
        try {
            //Insertar en la base de datos
            await clienteAxios.post('/productos', producto);

            //Actualizar el state si sale mal
            dispatch( agregarProductoExito(producto) )
            Swal.fire(
                'Correcto',
                'El producto se agregó correctamente',
                'success'
            )

        } catch (error) {
            console.log(error);
            dispatch(agregarProductoError(true))

            //Alerta de error
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intenta de nuevo'
            });
        }
    }
}

const agregarProducto =()=> ({
    type: AGREGAR_PRODUCTO
})

//Si el producto se guarda en la bd
const agregarProductoExito = producto =>({
    type: AGREGAR_PRODCUTO_EXITO,
    payload: producto
})

//Si hubo un error
const agregarProductoError= estado =>({
    type: AGREGAR_PRODCUTO_ERROR,
    payload: estado
});

//Función que descarg los propductos de la bd
export function obtenerProductosAction (){
    return async (dispatch)=>{
        dispatch(descargarProductos());
        try {
            const respuesta = await clienteAxios.get('/productos');
            dispatch(descargarProductosExitosa(respuesta.data));
        } catch (error) {
            console.log(error);
            dispatch(descargarProductosError())
        }

    }
}

const descargarProductos = () =>({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
});

const descargarProductosExitosa = productos =>({
    type:   DESCARGA_PRODUCTOS_EXITO,
    payload: productos
});

const descargarProductosError = () =>({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true 
});

//Selecciona y elimina el producto
export function borrarProductoAction (id) {
    return async (dispatch) =>{
        dispatch (obtenerProductoEliminar(id));
        try {
            await clienteAxios.delete(`/productos/${id}`);
            dispatch(eliminarProductoExito());

            Swal.fire(
                'Eliminado!',
                'El producto se eliminó correctamente.',
                'success'
              )
        } catch (error) {
            dispatch(eliminarProductoError());
        }
    }
}

const obtenerProductoEliminar = id =>({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
})

const eliminarProductoExito = ()=> ({
    type: PRODUCTO_ELIMINADO_EXITO
});

const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: true
});

//colocar producto en edición
export function obtenerProductoEditar (producto){
    return (dispatch) =>{
        dispatch(obtenerProductoEditarAction(producto))
    }
}

const obtenerProductoEditarAction = producto =>({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
})

//edita un registro en la api y state
export function editarProductoAction (producto) {
    return async (dispatch) =>{
        dispatch(editarProducto(producto));
        try {
            const resultado = await clienteAxios.put(`/productos/${producto.id}`, producto);
            dispatch(editarProductoExito(resultado));
        } catch (error) {
            dispatch(editarProductoError());
        }
    }
}

const editarProducto = () =>({
    type: COMENZAR_EDICION_PRODUCTO
})

const editarProductoExito = producto =>({
    type: PRODUCTO_EDITADO_EXITO,
    payload: producto
})

const editarProductoError = () =>({
    type: PRODUCTO_EDITADO_ERROR,
    payload: true
})