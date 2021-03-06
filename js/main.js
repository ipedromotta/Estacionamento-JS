document.querySelector('#form').addEventListener('submit', cadastrarVeiculo)

function cadastrarVeiculo(){
    let modelo = document.querySelector('#modelo').value
    let placa = document.querySelector('#placa').value
    let horario = new Date()

    if(!modelo || !placa){
        alert('Por favor, preencha os campos em branco!')
        return false
    }

    carro = {
        modelo: modelo,
        placa: placa,
        hora: horario.getHours(),
        minutos: horario.getMinutes()
    }

    if (localStorage.getItem('patio') === null){
        let carros = []
        carros.push(carro)
        localStorage.setItem('patio', JSON.stringify(carros))
    }else{
        let carros = JSON.parse(localStorage.getItem('patio'))
        carros.push(carro)
        localStorage.setItem('patio', JSON.stringify(carros))
    }
    document.querySelector('#form').reset()
    mostrarPatio()
}

function mostrarPatio(){
    let carros = JSON.parse(localStorage.getItem('patio'))
    let carrosResultado = document.querySelector('#resultados')

    carrosResultado.innerHTML = ''

    for ( let i = 0; i < carros.length; i++){
        let modelo = carros[i].modelo
        let placa = carros[i].placa
        let hora = carros[i].hora
        let minutos = carros[i].minutos
        carrosResultado.innerHTML += '<tr><td>' + modelo + '</td><td>' + placa + '</td><td>' + hora + ':' + minutos + '<td><button id="excluir" onclick="apagar(\''+ placa +'\')">Remover</button></td>' + '</td></tr>'

    }

}

function apagar(placa){
   let carros = JSON.parse(localStorage.getItem('patio'))

    for ( let i = 0; i < carros.length; i++){
        if (carros[i].placa == placa){
            carros.splice(i, 1)
        }
        localStorage.setItem('patio', JSON.stringify(carros))
    }
    mostrarPatio()
}


var MercoSulMaskBehavior = function (val) {
var myMask = 'SSS0A00';
var mercosul = /([A-Za-z]{3}[0-9]{1}[A-Za-z]{1})/;
var normal = /([A-Za-z]{3}[0-9]{2})/;
var replaced = val.replace(/[^\w]/g, '');
if (normal.exec(replaced)) {
    myMask = 'SSS-0000';
} else if (mercosul.exec(replaced)) {
    myMask = 'SSS0A00';
}
    return myMask;
},

mercoSulOptions = {
    onKeyPress: function(val, e, field, options) {
        field.mask(MercoSulMaskBehavior.apply({}, arguments), options);
    }
};

$(function() {
    $("body").delegate('input#placa','paste', function(e) {
        $(this).unmask();
    });
    $("body").delegate('input#placa','input', function(e) {
        $('input#placa').mask(MercoSulMaskBehavior, mercoSulOptions);
    });
});
