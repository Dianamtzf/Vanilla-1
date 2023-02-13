console.log('Conectado!!!')
let carrito = {}
const cards = document.getElementById('cards') //Busca id cards en index-productos
const items = document.getElementById('items')
const footer = document.getElementById('footer')
const templateCard = document.getElementById('template-card').content //Para acceder al contenido del id
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment()

document.addEventListener('DOMContentLoaded', e => {
    cargaDatosBD()
})
cards.addEventListener('click', e=>{
    //console.log('e', e) para comprobra que funcioa
    addCarrito(e)
})

const addCarrito = e =>{
    if(e.target.classList.contains('btn-dark')){
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
}

//Para recopilar los atributos del producto
const setCarrito = item =>{
    const producto = {
        id: item.querySelector('button').dataset.id,
        title: item.querySelector('h5').textContent,
        precio: item.querySelector('p').textContent,
        cantidad: 1
    }
    //hasOwnProperty para buscar la propiedad y si existe a la cantidad se le agrega +1
    if(carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito[producto.id].cantidad + 1
    }
    carrito[producto.id] = { ...producto } //Agrega todo el objeto producto (title, precio, cantidad..)
    pintarCarrito()
    //console.log('producto', producto, carrito)
}

const pintarCarrito = () => {
    items.innerHTML = '' //Para borrar el contenido
    //Object values te devuelve los atributos de carrito
    Object.values(carrito).forEach(producto =>{
        templateCarrito.querySelector('th').textContent = producto.id

        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)
}

const cargaDatosBD = async () => {
    const res = await fetch('../db/api.json') //Si la funcion es asincrona se pone await
    const data = await res.json()
    //console.log('respuesta', data) Para ver si cargaron los productos
    pintarCards(data)
}

const pintarCards = (data) => {
    data.forEach((item) => {
        console.log(item)
        templateCard.querySelector('h5').textContent = item.title
        templateCard.querySelector('p').textContent = item.precio
        templateCard.querySelector('button').dataset.id = item.id
        templateCard.querySelector('img').setAttribute("src", item.imageUrl) 
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })
    cards.appendChild(fragment)
}