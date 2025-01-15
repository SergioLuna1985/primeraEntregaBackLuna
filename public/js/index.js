const socket = io()

const title = document.getElementById('title')
const description = document.getElementById('description')
const code = document.getElementById('code')
const price = document.getElementById('price')
const stock = document.getElementById('stock')
const category = document.getElementById('category')
const thumbnails = document.getElementById('thumbnails')
const button = document.getElementById('button')

const outputProducts = document.getElementById('outputProducts')

button.addEventListener('click', event =>{

    console.log(thumbnails.value)

    const product = {
        title: title.value,
        description: description.value,
        code: code.value,
        price: price.value,
        stock: stock.value,
        category: category.value,
        thumbnails: thumbnails.value

    }

    socket.emit('newProduct', product)  

    title.value = ''
    description.value = ''
    code.value = ''
    price.value = ''
    stock.value = ''
    category.value = ''
    thumbnails.value = ''

})

socket.on('products', products =>{

    outputProducts.innerHTML = `
        <ul>
            ${products.map(product=>    `<h2>${product.title}</h2>
                                        <p>Descripción: ${product.description}</p>
                                        <p>Código: ${product.code}</p>
                                        <p>Categoria: ${product.category}</p>
                                        <p>Stock: ${product.stock}</p>
                                        <p>Precio: ${product.price}</p>
                                        `).join("")}
        </ul>
    `
})  



/* title.addEventListener('keyup', (event) =>{
    if (event.key === 'Enter') {

        const product = {
            title: title.value,
            description: description.value,
            code: code.value,
            price: price.value,
            stock: stock.value,
            category: category.value,
        }

        socket.emit('newProduct', product)   
        
    }
}) */


/* let userName */
/* 
Swal.fire({

    title: "Ingrese su nombre",
    input: 'text',
    inputValidator: (value) => {
        if (!value) {
            return 'Tiene que ingresar su nombre'
        }
    }
    
}).then( data =>{
    userName = data.value
    socket.emit('newUser', userName)
})

inputChat.addEventListener('keyup', (event) =>{
    if (event.key === 'Enter') {

        if (inputChat.value.trim() != '') {
            socket.emit('message', {user: userName, data: inputChat.value})   
        }
    }
}) */

/* socket.on('newUserNotification', user =>{
    Swal.fire({
        title: `${user} se conectó`,
        toast: true,
        positio: 'top-right'
    })
})
 */
/* 
socket.on('messagesLogs', data =>{
    messagesLogs.innerHTML = `
        <ul>
            ${data.map(p=> `<li>${p.user}: ${p.data} </li>`).join("")}
        </ul>
    `
}) */



/* socket.on('products', products =>{

    outputProducts.innerHTML = `
        <ul>
            ${products.map(p=> `<li>${p.title}</li>`).join("")}
        </ul>
    `
})   */

/* button.addEventListener('click', event =>{
    socket.emit('message', input.value)
}) */


/* socket.emit('message', 'hola desde el cliente')

socket.on('mensaje_individual', data =>{
    console.log("lectura desde el cliente: "+data)
})

socket.on('mensaje_masivo', data =>{
    console.log('lectura desde el cliente :' +data)
})

socket.on('mensaje_para_todos', data=>{
    console.log('lectura desde el cliente: '+data)
}) */