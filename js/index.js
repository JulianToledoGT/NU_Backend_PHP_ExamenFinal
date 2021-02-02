//Almacenarán los valores de la barra del rango de precios para poder enviarlos posteriormente.
var priceRangeStart = 200
var priceRangeEnd = 80000

/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};

/*
  Función que inicializa el elemento Slider
*/
function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "$",
    //Registro los valores del control para poder enviarlos posteriormente
    onFinish: function (data) {
      priceRangeStart = data.from;
      priceRangeEnd = data.to;
    }
  });
}

//La comento poque no hay video para usarla.
/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
/*
function playVideoOnScroll(){
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
       video.play();
     } else {
        //this.rewind(1.0, video, intervalRewind);
        video.play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
      video.pause();
    }, 10)
}
*/

//Enviamos a solicitar el listado de ciudades y tipos y llenamos los controles correspondientes
function loadObjects(attName, objID){
  $.ajax(
    {
      url: './php/get_catalog.php',
      type: 'POST',
      data: {catalog: attName}
    }
  ).done(function(data){
    myData = JSON.parse(data);
    combo = $(objID);
    Object.entries(myData).forEach(([key, value]) => {
      combo.append(`<option value="${value}">${value}</option>`);
    });
    $(objID).formSelect();  //Lo inicializo para ser usado como combo de selección.
  });
}

//Enviamos a solicitar los resultados de la búsqueda
$('#formulario').submit(function(event){
  var ciudad = $("#selectCiudad").val();
  var tipo = $("#selectTipo").val();
  event.preventDefault();
  $.ajax(
    {
      url: './php/get_data.php',
      type: 'POST',
      data: {
              ciudad: ciudad,
              tipo: tipo,
              priceRangeStart: priceRangeStart,
              priceRangeEnd: priceRangeEnd
            }
    }
  ).done(function(data){
    $('.record').remove();
    let myData = JSON.parse(data);
    let content = "";
    contenedor = $(".colContenido")
    Object.entries(myData).forEach(([key1, value1]) => {
      let myValue = value1;
      content = "";
      Object.entries(myValue).forEach(([key2, value2]) => {
        let title = key2;
        switch(key2){
          case "Direccion": title = "Dirección"; break;
          case "Telefono": title = "Teléfono"; break;
          case "Codigo_Postal": title = "Código postal"; break;
        };
        if (key2 == "Precio"){
          content += `<b>${title}: </b><b class="orange-text">${value2}</b><br>`;
        } else if (key2 != "Id"){
          content += `<b>${title}:</b> ${value2}<br>`;
        };
      });
      content = '<div class="card record"><img src="img/home.jpg" style="width : 40%; float: left"><div class="card-content"><p>'+content+'</p></div><div class="card-action"><a href="#">VER MAS</a></div></div>'
      contenedor.append(content);
    });
  });
})

loadObjects("Ciudad", "#selectCiudad");
loadObjects("Tipo", "#selectTipo");
inicializarSlider();
//playVideoOnScroll();  //La comento poque no hay video para usarla.

//Inicializo el uso los combos de selección.
$(document).ready(function(){
  $('select').formSelect();
});
