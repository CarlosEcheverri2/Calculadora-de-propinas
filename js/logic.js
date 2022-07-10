
const values = {
    person:1,
    value:0,
    tip:0
}


class Sujeto{
    constructor(){
        this.observadores = []
    }

    suscribete (visor){
        this.observadores.push(visor)
    }

    dejarSuscripcion (visor){
        this.observadores = this.observadores.filter(e => e!=0)
        //retorna el array sin el valor resivido
    }

    notificar(modelo){ //Informa a cada uno de la lista
        this.observadores.forEach(visor =>{
            visor.notificar(modelo)
        })
    }
}

class TextSujeto extends Sujeto{ //receptor de informacion
    constructor () {
        super();//Ejecuta el constructor del padre
        this.values = "";
    }

    notificar(values){
        this.values = values;
        super.notificar(this.values); //Se envia el objeto creado  con la clase
    }
}

class ObservadorTipAmount

 {
    notificar(values){
        console.log(values)
       let tipAmount = (values.value/values.person)*(values.tip/100)
       document.querySelector('.amountResult').innerHTML = `$${tipAmount.toFixed(1)}`
    }
}

class ObservadorTotal {
    notificar(values){
        console.log(values)
        let total =  (values.value/values.person)+((values.value/values.person)*(values.tip/100))
        document.querySelector('.totalResultado').innerHTML = `$${total.toFixed(1)}`
    }
}

const colorOriginalInput = () => {
    let botones = document.querySelectorAll('.botonera__boton')
    botones.forEach(element => {
        element.classList.remove('.botonera__boton-active')
    });
}

const resetearValores = () =>{
    document.querySelector('.valor').value = 0
    document.querySelector('.personas').value = 0
    document.querySelector('.amountResult').innerHTML = '$0'
    document.querySelector('.totalResultado').innerHTML = '$0'

    values.person = 1
    values.tip = 0
    values.value = 0
}



let valueSujeto = new TextSujeto()

let obsTipAmount = new ObservadorTipAmount()
let obsTotal = new ObservadorTotal()

valueSujeto.suscribete(obsTipAmount)
valueSujeto.suscribete(obsTotal)



document.querySelector('.valor').addEventListener('input',(e) =>{
    values.value = parseInt(e.target.value)

    valueSujeto.notificar(values)

})

document.querySelector('.personas').addEventListener("input",(e) =>{
    if(e.target.value == 0){
        values.person = 1
    }else{
        values.person = parseInt(e.target.value)
    }
    
    valueSujeto.notificar(values)
})

document.querySelector('.botonera').addEventListener('click',(e)=>{
    if(e.target.tagName == 'SPAN'){
        colorOriginalInput()
        e.target.classList.add('.botonera__boton-active')
        values.tip = parseInt(e.target.dataset.tip)

        valueSujeto.notificar(values)
    }
})

document.querySelector('.resetear').addEventListener('click',(e)=>{
    resetearValores()
})
