function comenzarJuego(popup, body){
popup.style.visibility = "hidden";
popup.style.opacity = "0";
popup.style.transition = "all 1s";
body.style.pointerEvents = "auto";
}

function nivelDificultad(botones,columnas,facil,intermedio,dificil){ 
  let visibilidad = (valorBoton,valorColumna) => {

    [...botones].forEach( (x) => x.style.display = valorBoton);
    [...columnas].forEach( (x) => x.style.display = valorColumna);
    }

  if (facil.checked){
    visibilidad("none","none");
  }
  else if (intermedio.checked){
    visibilidad("flex","none");
  }
  else if (dificil.checked){
    visibilidad("flex","block");
  }
}

function agregarContenidoCartas(numeros,cartas){ 
    const numerosRandom=numeros.sort(() => {
        return 0.5 - Math.random();
    })
    numerosRandom.forEach(function(numero,i){
        cartas[i].querySelector('.btn-content').textContent=[numero];
    }) 
}
 
function disposicionCartas(eleccion,e){ 
   if (eleccion.primerCarta==null){
         eleccion.primerCarta=e}
    else  if(eleccion.primerCarta!==null && e!==eleccion.primerCarta && eleccion.segundaCarta==null){
             eleccion.segundaCarta=e} 
    else if (eleccion.segundaCarta!==null && e!==eleccion.segundaCarta){ 
                  eleccion.exceso=1}; 

} 

function mostrarCartas(eleccion,e){
  if(eleccion.exceso==0){ 
    var numeroCarta=e.querySelector(".btn-content");  
    e.classList.add('btn__mostrar');
    numeroCarta.style.display= "block"; 
    e.style.transition = "all .3s";
    numeroCarta.style.transition = "all .3s";
    e.disabled=true;
  }  
} 
 
function initEleccion(eleccion){
  eleccion.primerCarta=null;
  eleccion.segundaCarta=null;
  eleccion.exceso=0;
        
}

function initJuego(visibles,h,m,s,popup,body){
  popup.style.visibility = "visible";
  popup.style.opacity = "1";
  popup.style.transition = "all 1s";
  body.style.pointerEvents = "none";
  [...visibles].forEach((e)=>{
    e.classList.remove('btn__mostrar');
    e.querySelector(".btn-content").style.display= "none"; 
    e.disabled = false;
    e.style.transition = "all .5s";
  })
  h.innerHTML = '00:';
  m.innerHTML = '00:';
  s.innerHTML = '00';
}

function comparacionCartas(eleccion){
  var contenidoPrimerCarta=eleccion.primerCarta.querySelector(".btn-content").innerText; 
  var contenidoSegundaCarta= eleccion.segundaCarta.querySelector(".btn-content").innerText; 
    setTimeout(function (){ 
      if(contenidoPrimerCarta!==contenidoSegundaCarta && eleccion.primerCarta!==null && eleccion.segundaCarta!==null){ 
             
        eleccion.primerCarta.classList.remove('btn__mostrar');
        eleccion.primerCarta.querySelector(".btn-content").style.display= "none"; 
        eleccion.primerCarta.disabled=false;
        eleccion.segundaCarta.classList.remove('btn__mostrar'); 
        eleccion.segundaCarta.querySelector(".btn-content").style.display= "none"; 
        eleccion.segundaCarta.disabled=false;
        initEleccion(eleccion); 
      }
    },500);  

  if(contenidoPrimerCarta===contenidoSegundaCarta){ 
    initEleccion(eleccion);  
    return true
  } 
} 

function timer(h,m,s,obj){ 
  let hh,mm,ss; 
  obj.s++; 
  if(obj.s>59){obj.m++;obj.s=0}; 
  if(obj.m>59){obj.h++;obj.m=0};
  if(obj.h>24){obj.h=0}; 
  
  
  if(obj.s<10){ss=('0'+obj.s)}
    else {ss=obj.s}; 
  if(obj.m<10){mm=('0'+obj.m)} 
    else {mm=obj.m}; 
  if(obj.h<10){hh=('0'+obj.h)}
    else {hh=obj.h};
  h.innerHTML=`${hh}:`; 
  m.innerHTML=`${mm}:`; 
  s.innerHTML=`${ss}`; 

} 

function cartasPorNivel (cartas){
  let cartasIniciales = [...cartas].filter(x => x.offsetParent !== null);
  let cantidadCartas = cartasIniciales.length;
  let numerosCartas = (cantidad)=> {let arr = []; for (i = 0; i < cantidad/2 ;i++){
  arr.push(i+1)} return arr};
  let contenidoCartas =  numerosCartas(cantidadCartas)
    .concat(numerosCartas(cantidadCartas));
  agregarContenidoCartas(contenidoCartas,cartasIniciales);
  return cantidadCartas
}

function win(hrs,min,seg,clicks,tiempoDisplay,win,avisoWin,tiempoWin,intentosWin){

  let tiempo = `tiempo: ${hrs.innerHTML}${min.innerHTML}${seg.innerHTML}`;
      let intentos = `intentos: ${Math.floor(clicks/2)}`;
        [...tiempoDisplay].forEach(t =>{t.style.visibility = "hidden";
                                         t.style.display = "none";
                                         t.style.opacity = 0;
                                         t.style.transition = "all 1s"});
        [...win].forEach(t =>{t.style.visibility = "visible";
                                    t.style.opacity = 1;
                                    t.style.transition = "all 1s"});
        avisoWin.innerHTML = '¡Ganaste!';
        tiempoWin.innerHTML = tiempo;
        intentosWin.innerHTML = intentos;
}

function resetViewer(tiempo,win){
  [...tiempo].forEach(t =>{t.style.visibility = "visible";
                              t.style.opacity = 1;
                              t.style.display = "flex"
                              t.style.transition = "all 1s"});
  [...win].forEach(t =>{t.style.visibility = "hidden";
                              t.style.opacity = 0;
                              t.style.transition = "all 1s";
                              t.innerHTML = ''});
}
 
function juegoMemotest(){

  const $cartasBotones=document.getElementsByClassName('carta-boton'); 
  const $botonesDisplay = document.getElementsByClassName('carta-boton__invisible');
  const $columnasDisplay = document.getElementsByClassName('columna-memotest__invisible');
  const $nivelFacil = document.getElementById("nivel-facil");
  const $nivelIntermedio = document.getElementById("nivel-intermedio");
  const $nivelDificil = document.getElementById("nivel-dificil");
  const $eleccionNivel = document.querySelectorAll('.eleccion__nivel');
  const $contenedorCartas= document.querySelector('#memotest'); 
  const $cartasVisibles=$contenedorCartas.getElementsByClassName('btn__mostrar');
  const $horas=document.getElementById("timer__h"); 
  const $minutos=document.getElementById("timer__m"); 
  const $segundos=document.getElementById("timer__s"); 
  const $tiempoDisplay = document.getElementsByClassName("timer__span");
  const $textoWin = document.getElementsByClassName("win__span");
  const $avisoWin = document.getElementById("final__aviso");
  const $tiempoWin = document.getElementById("final__tiempo");
  const $intentosWin = document.getElementById("final__intentos");
  const $reset=document.getElementById("reset");
  const $jugar = document.getElementById("jugar");
  const $popup = document.getElementById("popup-section");
  const $body = document.body;
  let eleccion_cartas={},
      timer_valores={s:0,m:0,h:0},
      run,
      clicks=0,
      aciertos=0,
      cantidadCartas = cartasPorNivel($cartasBotones);

  initEleccion(eleccion_cartas); 
  
  $eleccionNivel.forEach(eleccion => 
    eleccion.addEventListener('change', () =>{
      nivelDificultad($botonesDisplay, $columnasDisplay,
      $nivelFacil, $nivelIntermedio, $nivelDificil);
      cantidadCartas =  cartasPorNivel($cartasBotones);
  }));

  $jugar.addEventListener("click", ()=>{
    comenzarJuego($popup, $body);
    run=setInterval(timer,1000,$horas,$minutos,$segundos,timer_valores); 
  
  })

  $reset.addEventListener("click", ()=>{
    clearInterval(run);
    cartasPorNivel($cartasBotones);
    initJuego($cartasVisibles,$horas,$minutos,$segundos, $popup, $body);
    resetViewer($tiempoDisplay,$textoWin);
    clicks = 0;
    aciertos = 0;
    timer_valores={s:0,m:0,h:0};
  })

////////////////////////////////// IF-LAND ////////////////////////////////
  $contenedorCartas.onclick=function(e){ 
    var $elemento=e.target; 
    if ($elemento.classList.contains('carta-boton')){ 
      clicks++;
      disposicionCartas(eleccion_cartas,$elemento); 
      mostrarCartas(eleccion_cartas,$elemento);
    } 

    if (eleccion_cartas.primerCarta!==null && eleccion_cartas.segundaCarta!==null){ 
      if (comparacionCartas(eleccion_cartas)){
        aciertos++
      }
    }   
    if(aciertos ===(cantidadCartas/2)){
      clearInterval(run);
      win($horas, $minutos, $segundos, clicks, $tiempoDisplay,
         $textoWin, $avisoWin, $tiempoWin, $intentosWin);
      
    }
  } ////////////////////////////////////////////////////////////////////////
} 

juegoMemotest(); 

 