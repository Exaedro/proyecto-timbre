const input = document.getElementById('selectModo')

const inputEncendido = document.getElementById('encendido')
const inputApagado = document.getElementById('apagado')

input.addEventListener('change', elem => {
    elem.preventDefault()

    if(input.value == 'false') {
        inputEncendido.className = 'hidden'
        inputApagado.className = 'block'
    } else {
        inputEncendido.className = 'block'
        inputApagado.className = 'hidden'
    }
})