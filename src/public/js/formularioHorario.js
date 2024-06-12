const input = document.getElementById('selectModo')

const inputEncendido = document.getElementById('encendido')
const inputApagado = document.getElementById('apagado')

const selectDiario = document.getElementById('selectDiario')

const diaInput = document.getElementById('diaInput')

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

selectDiario.addEventListener('change', elem => {
    elem.preventDefault()

    if(selectDiario.value == 'true') {
        diaInput.className = 'hidden'
    } else {
        diaInput.className = 'show'
    }
})