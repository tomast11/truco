// <meta charset="utf-8" />


//array de cartas que compone el mazo
var cartas=new Array();
//variables globales
var maxPuntos = 15;
var jugadaNum=0;
var envidoCantado=false;
var vale4Cantado=false;
var retrucoCantado=false;
var cantoEN=false;
var ganadorEnvido='';
var cantoRE=false;
var cantoEE=false;
var cantoFE=false;
var puntosEnJuego=1;
var puntosEnvido=0;
var puntosJ1=0;
var puntosJ2=0;
var manosGanadasJ1=0;
var manosGanadasJ2=0;
var ultimoGanador='';
var ultimoMano='';
var seFueAlMazoJ1=false
var seFueAlMazoJ2=false
var parda= new Array();
parda = [false, false, false];
// array clave valor con los palos
var palos={"b":"bastos", "e":"espadas", "o":"oros", "c":"copas"}
//array de jugadas posibles
var jugadasPosibles = new Array();
jugadasPosibles = ['Inicio', 'Truco', 'Envido', '2Envido', 'RealEnvido', 'FaltaEnvido', 'NoquieroEnvido', 'Retruco', 'Vale4', 'QuieroEnvido', 'QuieroTruco'];
//array de cartas tiradas x jugador
var cartasTiradasJ1=new Array();
var cartasTiradasJ2=new Array();
//Mazo ordenado por valor para recomendaciones de jugadas
var mazoOrdenado=new Array();																																																																																																																		
mazoOrdenado= ['1espadas','1bastos','7espadas','7oros','3espadas','3oros','3bastos','3copas','2espadas','2oros','2bastos','2copas','1copas','1oros','12espadas','12oros','12bastos','12copas','11espadas','11oros','11bastos','11copas','10espadas','10oros','10bastos','10copas','7bastos','7copas','6espadas','6oros','6bastos','6copas','5espadas','5oros','5bastos','5copas','4espadas','4oros','4bastos','4copas']
//Puntos Envido para recomendar jugadas
var escalaPuntosEnvido=new Array();
escalaPuntosEnvido=[33,32,31,30,29,28,27,26,25,24,23,22,21,20,7,6,5,4,3,2,1]																																																																																																															
//Creo Matriz Y
var Matriz = [	['Inicio', 'Truco', 'Envido', '2Envido', 'RealEnvido', 'FaltaEnvido', 'NoquieroEnvido', 'Retruco', 'Vale4', 'QuieroEnvido', 'QuieroTruco'],
				[false,  true,  true,  false,  true,  true,  false,  false,  false,  false,  false],
				[false,  false, true,  false,  true,  true,  false,  true,  false,  false,  true ],
				[false,  false,  false,  true,  true,  true,  true,  false,  false,  true,  false],
				[false,  false,  false,  false,  true,  true,  true,  false,  false,  true,  false],
				[false,  false,  false,  false,  false,  true,  true,  false,  false,  true,  false],
				[false,  false,  false,  false,  false,  false,  true,  false,  false,  true,  false],
				[false,  true,  false,  false,  false,  false,  false,  false,  false,  false,  false],
				[false,  false,  false,  false,  false,  false,  false,  false,  true,  false,  true],
				[false,  false,  false,  false,  false,  false,  false,  false,  false,  false,  true],
				[false,  true,  false,  false,  false,  false,  false,  false,  false,  false,  false],
				[false,  false,  false,  false,  false,  false,  false,  true,true,  false,  false]
			]
			
// objeto jugador
var Jugador = (function() {
	function Jugador(name) {
		this.cartas = [];
		this.name = name;
		this.esMano=false;
		this.turnoJugar=false;
		this.turnoCantar=false;
		this.quiero=true;
	}
	return Jugador;
})();
//objeto carta
var Carta = (function() {
	function Carta(numero, palo) {
		this.palo = palo;
		this.numero = numero;
		this.cartaNumero='';
	}
	return Carta;
})();

//objeto init
var init = (function(){
	function init (){
		this.Jugador1 = new Jugador("Jugador 1");		
		this.Jugador2 = new Jugador("Jugador 2");
		this.jugadaActual='Inicio';	
		
		reiniciarValoresYLimpiarTablero()
		console.log('Mano: ' + ultimoMano)
		if(puntosJ1==0 && puntosJ2==0){
			sortearInicio();
		}else if(ultimoMano=='J2'){
			Jugador1.turnoCantar=true;
			Jugador1.turnoJugar=true;
			Jugador2.turnoCantar=false;
			Jugador2.turnoJugar=false;
		}else{
			Jugador2.turnoCantar=true;
			Jugador2.turnoJugar=true;
			Jugador1.turnoCantar=false;
			Jugador1.turnoJugar=false;
		}
		armarMazo();
		mezclarMazo();
		repartirManos();
		onClicksJugadas();
		onClickCartas();
		turnodeCantar(this.jugadaActual);
		ganador();
	}
	return init;
})();

//funcion para reiniciar mano
function reiniciarValoresYLimpiarTablero(){
	
jugadaNum=0;
puntosEnJuego=1;
puntosEnvido=0;
envidoCantado=false;
vale4Cantado=false;
retrucoCantado=false;
seFueAlMazoJ1=false;
seFueAlMazoJ2=false;
parda[0]=false;
parda[1]=false;
parda[2]=false;
manosGanadasJ1=0;
manosGanadasJ2=0;
cartasTiradasJ2=[];
cartasTiradasJ1=[];
Jugador1.cartas=[];
Jugador2.cartas=[];

document.getElementById("CartasJ2").innerHTML='';
document.getElementById("CartasJ1").innerHTML='';

document.getElementById("MJ1").innerHTML='';
document.getElementById("MJ2").innerHTML='';
}
//function para armar el mazo
function armarMazo(){	
	for (var PaloI in palos){
		var palo = palos[PaloI];
		
		for(var i = 1; i <= 12; i++) {
				if(i == 8 || i == 9) continue;
				cartas.push(new Carta(i, palo));
			}
	}
}

//funcion para mezclar el mazo recursivamente(no esta en uso)
function mezclarMazoRecursiva(){
/*	
	var mazoMezclado=[];
	if (mazoMezclado.length==39){
		return mazoMezclado;
	}else{
		random=parseInt(Math.random()*40);
		var tmp=cartas[random]
		cartas.splice(random-1, 1);
		mazoMezclado.push(tmp)
}
	return mezclarMazo();*/
}

//function para mezclar el mazo
function mezclarMazo () {
	for (i=0;i<40;i++){
		posicion1=parseInt(Math.random()*40);
		tmp=cartas[i];
		cartas[i]=cartas[posicion1];
		cartas[posicion1]=tmp;
	}	
}

//function para repartir manos
function repartirManos(){	
		var i=0;	
		//compruebo si el jugador 2 es mano
		if(Jugador2.turnoJugar){i=1;}
	for (j=1;j<=6;j++){
			
		var carta = cartas[j-1];
		carta.cartaNumero='Carta'+j;
		if(i++ % 2 == 0){
			//asigno carta al jugador y la saco del mazo
			Jugador1.cartas.push(carta);
			cartas.splice(j-1, 1);			
			//renderizo cartas
			var MJ1=document.getElementById("MJ1");
			MJ1.innerHTML += "<button id='Carta"+j+"'>"+carta.numero + " de " + carta.palo + "</button>";			
			console.log("Carta"+j+":"+carta.numero + " de " + carta.palo+Jugador1.name);			
			//seteo que es mano
			if (j==1){Jugador1.esMano=true;}
		}
		else{
			//asigno carta al jugador y la saco del mazo
			Jugador2.cartas.push(carta);
			cartas.splice(j-1, 1);
			//renderizo cartas
			var MJ2=document.getElementById("MJ2");
			MJ2.innerHTML += "<button id='Carta"+j+"'>"+carta.numero + " de " + carta.palo + "</button>";
			console.log("Carta"+j+":"+carta.numero + " de " + carta.palo+Jugador2.name);
			//seteo que es mano
			if (j==1){Jugador2.esMano=true;}
		}
	}

	if (Jugador1.esMano){
		ultimoMano='J1';
	}else {ultimoMano='J2'}
}

//sorteo el que comienza
function sortearInicio() {  
	var num = Math.random() * (2 - 0) + 0;
	
	if (num<1){
		Jugador1.turnoJugar=true;
		Jugador1.turnoCantar=true;
	}else{
		Jugador2.turnoJugar=true;
		Jugador2.turnoCantar=true;
	}
  
  console.log(num);
  console.log(Jugador1.turnoJugar);
  console.log(Jugador1.turnoCantar);
  console.log(Jugador2.turnoJugar);
  console.log(Jugador2.turnoCantar);
}

//funcion para leer matriz desde json(no esta en uso)
function armarMatriz(){			

	//TODO: Leer matriz desde JSON	
	
	/* var xmlhttp = new XMLHttpRequest();
	
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {					
			Matriz = JSON.parse(this.responseText);					
			
		}
	};
			
	xmlhttp.open("GET", "Jugadas.txt", true);
	xmlhttp.send(); */
		
	for (i=0; i<jugadasPosibles.length; i++){
		for (j=0 ; j<jugadasPosibles.length; j++){
			// Matriz[i]=new Array();
			// Matriz[0][j] = jugadasPosibles[j];
			console.log(Matriz[i][j]);
		}			 
	}		
}

function esParda(){
	if (jugadaNum == 2){		
		if (cartasTiradasJ1[0].numero==cartasTiradasJ2[0].numero){
			parda[0]=true;
		}
	}else if (jugadaNum == 4){
			if (cartasTiradasJ1[1].numero==cartasTiradasJ2[1].numero){
				parda[1]=true;
			}
		}else if (jugadaNum == 6){
				if (cartasTiradasJ1[1].numero==cartasTiradasJ2[1].numero){
					parda[2]=true;
				}
			}
}

//funcion para comprar los valores de las cartas
function compararCartas(cartaA, cartaB) {
	
	if(cartaA.numero==cartaB.numero){
		return
	}
			
		if(cartaA.numero == 1 && cartaA.palo == "espadas") {
			return true;
		} else if(cartaA.numero == 1 && cartaA.palo == "bastos") {
			if(cartaB.numero == 1 && cartaB.palo == "espadas") {
				return false;
			}
			return true;
		} else if(cartaB.numero == 1 && cartaB.palo == "espadas") {
			return false;
		} else if(cartaB.numero == 1 && cartaB.palo == "bastos") {
			if(cartaA.numero == 1 && cartaA.palo == "espadas") {
				return true;
			} else {
				return false;
			}
		} else if(cartaA.numero == 7 && cartaA.palo == "oros") {
			if(cartaB.numero == 7 && cartaB.palo == "espadas") {
				return false;
			}
			return true;
		} else if(cartaA.numero == 7 && cartaA.palo == "espadas") {
			return true;
		} else if(cartaB.numero == 7 && cartaB.palo == "espadas") {
			return false;
		} else if(cartaB.numero == 7 && cartaB.palo == "oros") { 
			if(cartaA.numero == 7 && cartaA.palo == "espadas") {
				return true;
			}
			return false;
		} else if(cartaB.numero == 2) {
			if(cartaA.numero == 3) {
				return true;
			} else {
				return false;
			}
		} else if(cartaB.numero == 3) {
			return false;
		} else if(cartaB.numero >= 4 && cartaB.numero <= 12) {
			if(cartaA.numero <= 3 ||cartaA.numero > cartaB.numero) {
				return true;
			}
			return false;
		} else if(cartaB.numero == 1 && cartaB.palo == "copas" || cartaB.palo == "oros") {
			if(cartaA.numero <= 3) {
				return true;
			}
			return false;
		}
	}

//mostrar jugadas segun matriz para el jugador 1
function mostrarJugadasJ1(jugadaActual){

console.log(jugadaActual + 'mostrar');	
	for (i=0; i<jugadasPosibles.length; i++){			
		for (j=0; j<jugadasPosibles.length;j++){
			if(jugadaActual==Matriz[i][j]){	
				j++
				var jugadasLegales = Matriz[j]
				console.log(Matriz[j]);
				console.log(j);
				console.log(Jugador1.quiero+ 'J1');				
				for (e=1;e<jugadasPosibles.length;e++){
					
					if ((jugadasPosibles[e]=='Truco' || jugadasPosibles[e]=='Retruco'||jugadasPosibles[e]=='Vale4') && !Jugador1.quiero){continue;}
					if ((jugadasPosibles[e]=='Truco' || jugadasPosibles[e]=='Retruco') && retrucoCantado){continue;}
					if ((jugadasPosibles[e]=='Truco' || jugadasPosibles[e]=='Retruco'||jugadasPosibles[e]=='Vale4') && vale4Cantado){continue;}
					if(jugadasPosibles[e]=='Vale4' && !retrucoCantado){continue;}
					if ((jugadasPosibles[e]=='Envido' || jugadasPosibles[e]=='RealEnvido' || jugadasPosibles[e]=='FaltaEnvido') && jugadaNum>=2){continue;}
					if ((jugadasPosibles[e]=='Envido' || jugadasPosibles[e]=='RealEnvido' || jugadasPosibles[e]=='FaltaEnvido') && envidoCantado){continue;}
					if (jugadasLegales[e]){	
						console.log(Jugador1.quiero+ 'J1 | ' + jugadasPosibles[e] + ' | ' + Jugador1.turnoCantar);
						var jugada = jugadasPosibles[e];
						jugada +='J1'
						document.getElementById(jugada).style.display = 'block';
					}					
				}
			}
		}		
	}
}

//mostrar jugadas segun matriz para el jugador 2
function mostrarJugadasJ2(jugadaActual){	
console.log(jugadaActual + 'mostrar');	
	for (i=0; i<jugadasPosibles.length; i++){			
		for (j=0; j<jugadasPosibles.length;j++){			
			if(jugadaActual==Matriz[i][j]){
				j++
				jugadasLegales = Matriz[j];
				console.log(Matriz[j]);
				console.log(j);
				console.log(Jugador2.quiero+ 'J2');
				for (e=1;e<jugadasPosibles.length;e++){
					
					if ((jugadasPosibles[e]=='Truco' || jugadasPosibles[e]=='Retruco'||jugadasPosibles[e]=='Vale4') && !Jugador2.quiero){continue;}
					if ((jugadasPosibles[e]=='Truco' || jugadasPosibles[e]=='Retruco') && retrucoCantado){continue;}
					if ((jugadasPosibles[e]=='Truco' || jugadasPosibles[e]=='Retruco'||jugadasPosibles[e]=='Vale4') && vale4Cantado){continue;}
					if ((jugadasPosibles[e]=='Envido' || jugadasPosibles[e]=='RealEnvido' || jugadasPosibles[e]=='FaltaEnvido') && jugadaNum>=2){continue;}
					if ((jugadasPosibles[e]=='Envido' || jugadasPosibles[e]=='RealEnvido' || jugadasPosibles[e]=='FaltaEnvido') && envidoCantado){continue;}
					if (jugadasLegales[e]){
						console.log(Jugador2.quiero+ 'J2 | ' + jugadasPosibles[e] + ' | ' + Jugador2.turnoCantar);
						var jugada = jugadasPosibles[e];
						jugada +='J2';
						document.getElementById(jugada).style.display = 'block';
					}
				}
			}
		}
	}
}

//funcion para ocultar todas las jugadas
function ocultarJugadas(){
	document.getElementById('TrucoJ1').style.display = 'none';
	document.getElementById('EnvidoJ1').style.display = 'none';
	document.getElementById('2EnvidoJ1').style.display = 'none';
	document.getElementById('RealEnvidoJ1').style.display = 'none';
	document.getElementById('FaltaEnvidoJ1').style.display = 'none';
	document.getElementById('NoquieroEnvidoJ1').style.display = 'none';
	document.getElementById('RetrucoJ1').style.display = 'none';
	document.getElementById('Vale4J1').style.display = 'none';
	document.getElementById('QuieroEnvidoJ1').style.display = 'none';
	document.getElementById('QuieroTrucoJ1').style.display = 'none';
	document.getElementById('TrucoJ2').style.display = 'none';
	document.getElementById('EnvidoJ2').style.display = 'none';
	document.getElementById('2EnvidoJ2').style.display = 'none';
	document.getElementById('RealEnvidoJ2').style.display = 'none';
	document.getElementById('FaltaEnvidoJ2').style.display = 'none';
	document.getElementById('NoquieroEnvidoJ2').style.display = 'none';
	document.getElementById('RetrucoJ2').style.display = 'none';
	document.getElementById('Vale4J2').style.display = 'none';
	document.getElementById('QuieroEnvidoJ2').style.display = 'none';
	document.getElementById('QuieroTrucoJ2').style.display = 'none';
}

//funcion para sumar puntos (no esta en uso)
function sumarPuntos(puntos){
	//PORQUE EXISTE?
	jugador.puntos+=puntos;
}

//funcion para comprobar quien fue el ganador de la mano
function comprobarGanadorMano(){
	
	console.log('manos ganas J1 ' + manosGanadasJ1)
	console.log('manos ganadas J2' + manosGanadasJ2)
	console.log('parda mano 1 ' + parda[0])
	console.log('parda mano 1 ' + parda[1])
	console.log('parda mano 1 ' + parda[2])
	console.log('J1' + seFueAlMazoJ2)
	console.log('J2' + seFueAlMazoJ1)
	
	
	if (manosGanadasJ1==2 || ((manosGanadasJ1==1 ||manosGanadasJ1==2) && (parda[0]|| parda[1]|| parda[2])) || seFueAlMazoJ2){
		//Jugador1.puntos+=puntosEnJuego;
		puntosJ1+=puntosEnJuego
		if(ganadorEnvido=='J1'){
			puntosJ1+=puntosEnvido
			console.log('puntos envido j1'+puntosEnvido);
		}else if (ganadorEnvido=='J2'){
			puntosJ2+=puntosEnvido
			console.log('puntos envido j2'+puntosEnvido);
		}
		document.getElementById('PuntosJ1').innerText='Puntos J1:'+puntosJ1;
		document.getElementById('PuntosJ2').innerText='Puntos J2:'+puntosJ2;
		console.log('puntos j1'+puntosJ1);
		ultimoGanador='J1'
		init();
	}else if (manosGanadasJ2==2 || ((manosGanadasJ2==1 || manosGanadasJ2==2) && (parda[0]|| parda[1]|| parda[2])) || seFueAlMazoJ1){
		//Jugador2.puntos+=puntosEnJuego;
		puntosJ2+=puntosEnJuego;
		if(ganadorEnvido=='J1'){
			puntosJ1+=puntosEnvido
			console.log('puntos envido j1'+puntosEnvido);
		}else if (ganadorEnvido=='J2'){
			puntosJ2+=puntosEnvido
			console.log('puntos envido j2'+puntosEnvido);
		}
		document.getElementById('PuntosJ1').innerText='Puntos J1:'+puntosJ1;
		document.getElementById('PuntosJ2').innerText='Puntos J2:'+puntosJ2;
		console.log('puntos j2'+puntosJ2);
		ultimoGanador='J2'
		init();		
	}
}

//funcion para mostrar jugadas segun turno de cantar
function turnodeCantar(jugadaActual){
	init.jugadaActual=jugadaActual;
	if (Jugador1.turnoCantar){	
		ocultarJugadas()
		mostrarJugadasJ1(jugadaActual);	
		
	}else{
		ocultarJugadas()		
		mostrarJugadasJ2(jugadaActual);		
	}
}

//funcion para asignar el quiero el jugador correspondiente
function asignarQuiero(jugador){
	
	if (jugador=='J1'){
		Jugador1.quiero=true;
		Jugador2.quiero=false;
	}else{
		Jugador1.quiero=false;
		Jugador2.quiero=true;
	}
}

//cambio de turno de cantar
function cambiarTurnoCantar(){

	if (Jugador1.turnoCantar){
		Jugador1.turnoCantar=false;
		Jugador2.turnoCantar=true;
	}else{
		Jugador1.turnoCantar=true;
		Jugador2.turnoCantar=false;
	}	
}

//funcion para cambiar el turno de jugar carta
function cambiarTurnoJugar(){
	
	if (Jugador1.turnoJugar){
		Jugador1.turnoJugar=false;
		Jugador2.turnoJugar=true;
	}else{
		Jugador1.turnoJugar=true;
		Jugador2.turnoJugar=false;
	}
	jugadaNum++;
	console.log('num' + jugadaNum);
}

//funcion para determinar el ganador de la ronda de la mano
function ganadorMano(){

	if (jugadaNum == 2){		
		return compararCartas(cartasTiradasJ1[0], cartasTiradasJ2[0]);
	}else if (jugadaNum == 4){
			return compararCartas(cartasTiradasJ1[1], cartasTiradasJ2[1]);
		}else if (jugadaNum == 6){
				return compararCartas(cartasTiradasJ1[2], cartasTiradasJ2[2]);
			}
	
	return false;
}

//tirar la carta seleccionada x el jugador
function tirarCarta(jugador, carta){
	if (jugador=='J1'){
		var elemento = 'Cartas'+jugador;
		var cartaTablero=document.getElementById(elemento);

		
		console.log('2 manos ganas J1 ' + manosGanadasJ1)
				console.log('2 manos ganadas J2' + manosGanadasJ2)
				console.log('2 parda mano 1 ' + parda[0])
				console.log('2 parda mano 1 ' + parda[1])
				console.log('2 parda mano 1 ' + parda[2])
		
		for (i=0;i<3;i++){
			if (carta==Jugador1.cartas[i].cartaNumero){
				cartaTablero.innerHTML += "<div id='Cartas"+jugador+i+"'>"+Jugador1.cartas[i].numero + " de " + Jugador1.cartas[i].palo + "</div>";
				cartasTiradasJ1.push(Jugador1.cartas[i]);
				
				
				
				
				
				if (jugadaNum==2 || jugadaNum==4 || jugadaNum==6){
					esParda();
					if (parda[i]){
					console.log('parda la mejor')
					Jugador1.turnoJugar=false;
					Jugador1.turnoCantar=false;
					Jugador2.turnoJugar=true;
					Jugador2.turnoCantar=true;
					
					}else if(ganadorMano()){
						manosGanadasJ1++;
						console.log('jugador1 uno gano la mano')
						Jugador1.turnoJugar=true;
						Jugador1.turnoCantar=true;
						Jugador2.turnoJugar=false;
						Jugador2.turnoCantar=false;
						
					}else if (!ganadorMano()){
						manosGanadasJ2++;
						console.log('jugador2 uno gano la mano')						
						Jugador1.turnoJugar=false;
						Jugador1.turnoCantar=false;
						Jugador2.turnoJugar=true;
						Jugador2.turnoCantar=true;
					}
				}				
			}
		}
		turnodeCantar(init.jugadaActual);
	}else{
		var elemento = 'Cartas'+jugador;
		var cartaTablero=document.getElementById(elemento);		

		console.log('2 manos ganas J1 ' + manosGanadasJ1)
				console.log('2 manos ganadas J2' + manosGanadasJ2)
				console.log('2 parda mano 1 ' + parda[0])
				console.log('2 parda mano 1 ' + parda[1])
				console.log('2 parda mano 1 ' + parda[2])		
		
		for (i=0;i<3;i++){
			if (carta==Jugador2.cartas[i].cartaNumero){
				cartaTablero.innerHTML += "<div id='Cartas"+jugador+i+"'>"+Jugador2.cartas[i].numero + " de " + Jugador2.cartas[i].palo + "</div>";
				cartasTiradasJ2.push(Jugador2.cartas[i]);
				
				
				
				if (jugadaNum==2 || jugadaNum==4 || jugadaNum==6){
					esParda();
					if (parda[i]){
					console.log('parda la mejor')
					Jugador1.turnoJugar=true;
					Jugador1.turnoCantar=true;
					Jugador2.turnoJugar=false;
					Jugador2.turnoCantar=false;
					
				}else if(ganadorMano()){
						manosGanadasJ1++;
						console.log('jugador1 uno gano la mano')
						Jugador1.turnoJugar=true;
						Jugador1.turnoCantar=true;
						Jugador2.turnoJugar=false;
						Jugador2.turnoCantar=false;
					}else if (!ganadorMano()){
						manosGanadasJ2++;
						console.log('jugador2 uno gano la mano')
						Jugador1.turnoJugar=false;
						Jugador1.turnoCantar=false;
						Jugador2.turnoJugar=true;
						Jugador2.turnoCantar=true;
					}
				}
			}
		}
		turnodeCantar(init.jugadaActual);
	}
}

//funcion para comprobar ganador
function ganador(){
	if(puntosJ1>=maxPuntos){
		alert('Ganador Jugador1');
	}else if(puntosJ2>=maxPuntos){
		alert('Ganador Jugador2');
	}	
}

//funcion para calcular el envido
function calcularEnvido(carta1, carta2, carta3){

		var envido = 0;
		var c1 = 0;
		var c2 = 0;
		var c3 = 0;

		if(carta1.palo == carta2.palo) {
			var e = 20;
			if(carta1.numero <= 7) e += carta1.numero;
			if(carta2.numero <= 7) e += carta2.numero;
			if(e > envido) envido = e;
		}

		if(carta1.palo == carta3.palo) {
			var e = 20;
			if(carta1.numero <= 7) e += carta1.numero;
			if(carta3.numero <= 7) e += carta3.numero;
			if(e > envido) envido = e;
		}

		if(carta2.palo == carta3.palo) {
			var e = 20;
			if(carta2.numero <= 7) e += carta2.numero;
			if(carta3.numero <= 7) e += carta3.numero;
			if(e > envido) envido = e;
		}
		
		
		if ((carta1.numero<=7 || carta2.numero<=7|| carta3.numero<=7) && (carta1.palo != carta2.palo && carta1.palo != carta3.palo && carta2.palo != carta3.palo)){
			
			if (carta1.numero<=7){
				c1 = carta1.numero;
				console.log('carta envido 1: ' + c1)
			}
				
			if (carta2.numero<=7){
				c2 = carta2.numero
				console.log('carta envido 2: ' + c2)
			}
			
			if (carta3.numero <= 7){
				c3 = carta3.numero
				console.log('carta envido 3: ' + c3)
			}
					
		
			
			// if (c1>=c2){
				// envido = c1;
			// }else if (c3>=c1){
				// envido = c3;
			// }else if (c2>=c3){
				// envido=c2;
			// }
			
			if (c1 > c2){
				if (c1 > c3){
					envido = c1;
				}else{
					envido = c3;
				}
			}else{
				envido=c2;
			}
		}
		
		return envido;
}

//funcion para calcular el falta envido
function calcularFaltaEnvido(){
	
		var envidoJ1 = calcularEnvido(Jugador1.cartas[0], Jugador1.cartas[1], Jugador1.cartas[2]);
		var envidoJ2 = calcularEnvido(Jugador2.cartas[0], Jugador2.cartas[1], Jugador2.cartas[2]);
		var faltaEnvidoJ1 = maxPuntos - puntosJ1;
		var faltaEnvidoJ2 = maxPuntos - puntosJ2;


		if(Jugador1.esMano){
			alert("Jugador 1: Tengo " + envidoJ1);
			
			if(envidoJ1 >= envidoJ2 ) {
			alert("Jugador 2: Son Buenas");
			puntosEnvido += faltaEnvidoJ2;
			ganadorEnvido='J1';
			
		} else{
			alert("Jugador 2: "+envidoJ2+" son mejores");
			puntosEnvido += faltaEnvidoJ1;
			ganadorEnvido='J2';
		}
			
		}else{
			alert("Jugador 2: Tengo " + envidoJ2);
			
			if(envidoJ2 >= envidoJ1 ) {
			alert("Jugador 1: Son Buenas");
			puntosEnvido += faltaEnvidoJ1;
			ganadorEnvido='J2';
			
			} else{
			alert("Jugador 1: "+envidoJ1+" son mejores");
			puntosEnvido += faltaEnvidoJ2;
			ganadorEnvido='J1';
		}
		}
	
}

//funcion para mostrar el envio
function envido(r){
	if(r == undefined) { r = 0; };
	console.log('cartas J1: ' + Jugador1.cartas[0].numero + Jugador1.cartas[1].numero+ Jugador1.cartas[2].numero)
	console.log('cartas J2: ' + Jugador2.cartas[0].numero + Jugador2.cartas[1].numero+ Jugador2.cartas[2].numero)
	var envidoJ1 = calcularEnvido(Jugador1.cartas[0], Jugador1.cartas[1], Jugador1.cartas[2]);
	var envidoJ2 = calcularEnvido(Jugador2.cartas[0], Jugador2.cartas[1], Jugador2.cartas[2]);

	console.log('envido j1: ' + envidoJ1)
	console.log('envido j2: ' + envidoJ2)


		

		if(Jugador1.esMano){
			alert("Jugador 1: Tengo " + envidoJ1);
			
			if(envidoJ1 >= envidoJ2 ) {
			alert("Jugador 2: Son Buenas");
			puntosEnvido += 2 + r;
			ganadorEnvido='J1';
			
		} else{
			alert("Jugador 2: "+envidoJ2+" son mejores");
			puntosEnvido += 2 + r;
			ganadorEnvido='J2';
		}
			
		}else{
			alert("Jugador 2: Tengo " + envidoJ2);
			
			if(envidoJ2 >= envidoJ1 ) {
			alert("Jugador 1: Son Buenas");
			puntosEnvido += 2 + r;
			ganadorEnvido='J2';
			
			} else{
			alert("Jugador 1: "+envidoJ1+" son mejores");
			puntosEnvido += 2 + r;
			ganadorEnvido='J1';
		}
		}
		

		
}

//funcion para inciar los .onclick de las Jugadas
function onClicksJugadas(){	
document.getElementById("TrucoJ1").onclick = function(){
	var	jugada='Truco';
	cambiarTurnoCantar();
	turnodeCantar(jugada);
}
document.getElementById("TrucoJ2").onclick = function(){
	
	var	jugada='Truco';
	cambiarTurnoCantar();
	turnodeCantar(jugada);	
}
document.getElementById("EnvidoJ1").onclick = function(){	
	var	jugada='Envido';
	cambiarTurnoCantar();
	turnodeCantar(jugada);	
	envidoCantado=true;
	cantoEN=true;
}
document.getElementById("EnvidoJ2").onclick = function(){	
	var	jugada='Envido';
	cambiarTurnoCantar();
	turnodeCantar(jugada);	
	envidoCantado=true;
	cantoEN=true;
}
document.getElementById("2EnvidoJ2").onclick = function(){	
	var	jugada='2Envido';
	cambiarTurnoCantar();
	turnodeCantar(jugada);
	envidoCantado=true;
	cantoEE=true;
}
document.getElementById("2EnvidoJ1").onclick = function(){	
	var	jugada='2Envido';
	cambiarTurnoCantar();
	turnodeCantar(jugada);
	envidoCantado=true;
	cantoEE=true;
}
document.getElementById("RealEnvidoJ1").onclick = function(){	
	var	jugada='RealEnvido';
	cambiarTurnoCantar();
	turnodeCantar(jugada);
	envidoCantado=true;
	cantoRE=true;
}
document.getElementById("RealEnvidoJ2").onclick = function(){	
	var	jugada='RealEnvido';
	cambiarTurnoCantar();
	turnodeCantar(jugada);
	envidoCantado=true;
	cantoRE=true;
}
document.getElementById("FaltaEnvidoJ1").onclick = function(){	
	var	jugada='FaltaEnvido';
	cambiarTurnoCantar();
	turnodeCantar(jugada);
	envidoCantado=true;
	cantoFE=true;
}
document.getElementById("FaltaEnvidoJ2").onclick = function(){	
	var	jugada='FaltaEnvido';
	cambiarTurnoCantar();
	turnodeCantar(jugada);
	envidoCantado=true;
	cantoFE=true;
}
document.getElementById("NoquieroEnvidoJ1").onclick = function(){	
	var	jugada='NoquieroEnvido';
	cambiarTurnoCantar();
	turnodeCantar(jugada);
	if(cantoEE){
		puntosEnvido+=2;
	}else if (cantoRE && cantoEN){
		puntosEnvido+=2;
	}else if(cantoFE	&&	cantoEN){
		puntosEnvido+=2;
	}else {
	puntosEnvido+=1;
	}
	ganadorEnvido='J2';
}
document.getElementById("NoquieroEnvidoJ2").onclick = function(){	
	var	jugada='NoquieroEnvido';
	cambiarTurnoCantar();
	turnodeCantar(jugada);
	if(cantoEE){
		puntosEnvido+=2;
	}else if (cantoRE && cantoEN){
		puntosEnvido+=2;
	}else if(cantoFE	&&	cantoEN){
		puntosEnvido+=2;
	}else {
	puntosEnvido+=1;
	}
	ganadorEnvido='J1';
}
document.getElementById("RetrucoJ1").onclick = function(){	
	var	jugada='Retruco';
	asignarQuiero('J2');
	cambiarTurnoCantar();
	turnodeCantar(jugada);	
	retrucoCantado=true;
	puntosEnJuego=2;
}
document.getElementById("RetrucoJ2").onclick = function(){	
	var	jugada='Retruco';
	asignarQuiero('J1');
	cambiarTurnoCantar();
	turnodeCantar(jugada);	
	retrucoCantado=true;
	puntosEnJuego=2;
}
document.getElementById("Vale4J1").onclick = function(){	
	var	jugada='Vale4';
	cambiarTurnoCantar();
	turnodeCantar(jugada);	
	vale4Cantado=true;
	puntosEnJuego=3;
}
document.getElementById("Vale4J2").onclick = function(){	
	var	jugada='Vale4';
	cambiarTurnoCantar();
	turnodeCantar(jugada);	
	vale4Cantado=true;
	puntosEnJuego=3;
}
document.getElementById("QuieroEnvidoJ1").onclick = function(){	
	var	jugada='QuieroEnvido';
	cambiarTurnoCantar();
	turnodeCantar(jugada);
	if(cantoEN && cantoRE){
		envido(3);
	}else if(cantoFE){
		console.log('entro a FE')
		calcularFaltaEnvido();
		ganador();
	}else if(cantoRE){
		envido(1);		
	}else if(cantoEE){
		envido(2);
	}else {
		envido(0);
	}
}
document.getElementById("QuieroEnvidoJ2").onclick = function(){	
	var	jugada='QuieroEnvido';
	cambiarTurnoCantar();
	turnodeCantar(jugada);
	if(cantoEN && cantoRE){
		envido(3);
	}else if(cantoFE){
		console.log('entro a FE')
		calcularFaltaEnvido();
		ganador();
	}else if(cantoRE){
		envido(1);		
	}else if(cantoEE){
		envido(2);
	}else {
		envido(0);
	}
}
document.getElementById("QuieroTrucoJ1").onclick = function(){	
	var	jugada='QuieroTruco';
	var jugador='J1'
	asignarQuiero(jugador);
	cambiarTurnoCantar();
	turnodeCantar(jugada);
	puntosEnJuego++;
	
}
document.getElementById("QuieroTrucoJ2").onclick = function(){	
	var	jugada='QuieroTruco';
	var jugador='J2'
	asignarQuiero(jugador);
	cambiarTurnoCantar();
	turnodeCantar(jugada);
	puntosEnJuego++;
}
}

//funcion para inciar los .onclick de las Cartas
function onClickCartas(){
document.getElementById("Carta1").onclick = function(){
	console.log(Jugador1.turnoJugar)
	console.log(Jugador2.turnoJugar)
	var carta='Carta1'
	if(Jugador1.cartas[0].cartaNumero==carta){
		var jugador='J1';
		if(Jugador1.turnoJugar){			
			cambiarTurnoJugar();
			cambiarTurnoCantar();
			tirarCarta(jugador, carta);
			document.getElementById('Carta1').style.display = 'none';
		}
	}else{
		var jugador='J2'
		if(Jugador2.turnoJugar){
				cambiarTurnoJugar();
				cambiarTurnoCantar();
			tirarCarta(jugador, carta);
			document.getElementById('Carta1').style.display = 'none';
		}
	}
	comprobarGanadorMano();
}
document.getElementById("Carta2").onclick = function(){
	console.log('Turno Jugado1'+Jugador1.turnoJugar)
	console.log('Turno Jugado2'+Jugador2.turnoJugar)
	var carta='Carta2'
	if(Jugador1.cartas[0].cartaNumero==carta){
		var jugador='J1'
		if(Jugador1.turnoJugar){
				cambiarTurnoJugar();
				cambiarTurnoCantar();		
			tirarCarta(jugador, carta);			
			document.getElementById('Carta2').style.display = 'none';
		}		
	}else{
		var jugador='J2'
		if(Jugador2.turnoJugar){
				cambiarTurnoJugar();
				cambiarTurnoCantar();
			tirarCarta(jugador, carta);			
			document.getElementById('Carta2').style.display = 'none';
		}		
	}
	comprobarGanadorMano()
}
document.getElementById("Carta3").onclick = function(){
	var carta='Carta3'
	if(Jugador1.cartas[1].cartaNumero==carta){
		var jugador='J1'
		if(Jugador1.turnoJugar){
				cambiarTurnoJugar();
				cambiarTurnoCantar();
			tirarCarta(jugador, carta);			
			document.getElementById('Carta3').style.display = 'none';
		}		
	}else{
		var jugador='J2'
		if(Jugador2.turnoJugar){
				cambiarTurnoJugar();
				cambiarTurnoCantar();
			tirarCarta(jugador, carta);			
			document.getElementById('Carta3').style.display = 'none';
		}	
	}
	comprobarGanadorMano()
}
document.getElementById("Carta4").onclick = function(){
	var carta='Carta4'
	if(Jugador1.cartas[1].cartaNumero==carta){
		var jugador='J1'
		if(Jugador1.turnoJugar){
				cambiarTurnoJugar();
				cambiarTurnoCantar();
			tirarCarta(jugador, carta);			
			document.getElementById('Carta4').style.display = 'none';
		}		
	}else{
		var jugador='J2'
		if(Jugador2.turnoJugar){
				cambiarTurnoJugar();
				cambiarTurnoCantar();
			tirarCarta(jugador, carta);			
			document.getElementById('Carta4').style.display = 'none';
		}	
	}
	comprobarGanadorMano()
}
document.getElementById("Carta5").onclick = function(){
	var carta='Carta5'
	if(Jugador1.cartas[2].cartaNumero==carta){
		var jugador='J1'
		if(Jugador1.turnoJugar){
				cambiarTurnoJugar();
				cambiarTurnoCantar();
			tirarCarta(jugador, carta);			
			document.getElementById('Carta5').style.display = 'none';
		}		
	}else{
		var jugador='J2'
		if(Jugador2.turnoJugar){
				cambiarTurnoJugar();
				cambiarTurnoCantar();
			tirarCarta(jugador, carta);			
			document.getElementById('Carta5').style.display = 'none';
		}	
	}
	comprobarGanadorMano()
}
document.getElementById("Carta6").onclick = function(){
	var carta='Carta6'
	if(Jugador1.cartas[2].cartaNumero==carta){
		var jugador='J1'
		if(Jugador1.turnoJugar){
				cambiarTurnoJugar();
				cambiarTurnoCantar();
			tirarCarta(jugador, carta);
			document.getElementById('Carta6').style.display = 'none';
		}
	}else{
		var jugador='J2'
		if(Jugador2.turnoJugar){
			cambiarTurnoJugar();
			cambiarTurnoCantar();
			tirarCarta(jugador, carta);
			document.getElementById('Carta6').style.display = 'none';
		}
	}
	comprobarGanadorMano()
}
}

//Recomendaciones1
function recomendar1(carta1, carta2, carta3, carta4, cartaMano){
	
	var nominador=40;
	var prob=0;
	
	console.log(carta1)
	console.log(carta2)
	console.log(carta3)
	console.log(carta4)
	console.log(cartaMano)
	
	for (i=0; i<mazoOrdenado.length; i++){
		if(mazoOrdenado[i]==cartaMano){break;}
		if (mazoOrdenado[i]!=cartaMano){
			if (mazoOrdenado[i]!=carta1&&mazoOrdenado[i]!=carta2&&mazoOrdenado[i]!=carta3&&mazoOrdenado[i]!=carta4){
				nominador--;
			}
		}
	}
	console.log(nominador)
	prob=nominador/40;
	
	if(prob>0.8){
		
		alert('Tus probabilidades de ganar la mano son: ' + prob + '. Se recomienda cantar truco')
		
	}
	
	return prob

}

//Recomendaciones2
function recomendar2 (puntosJugador, mano){
	var nominador=21;
	var prob=0;
	
	
	for(i=0;escalaPuntosEnvido.length;i++){
		console.log(escalaPuntosEnvido[i])
		console.log(puntosJugador)
		
		if ((escalaPuntosEnvido[i]==puntosJugador) && !mano){
			nominador--;
			}
		
		if(escalaPuntosEnvido[i]==puntosJugador){break;}
		if(puntosJugador!=escalaPuntosEnvido[i]){
			
				nominador--;
		}
	}
	
	prob=nominador/21;
	
	console
	
	if(prob>=0.6){
		alert('Canta Envido!');
	}
	
	return prob
}

//Recomendacion3
function recomendar3(carta1, carta2, carta3){
	
	var denominador=40;
	var nominador1=40;
	var nominador2=39;
	var prob1=0;
	var prob2=0;
	var prob=0;
	
	for (i=0; i<mazoOrdenado.length; i++){
		if(mazoOrdenado[i]==carta1){
			prob1=nominador1/denominador;
			denominador--;
			mazoOrdenado.splice(i,1);
			console.log(mazoOrdenado.length);
			break;
		}
		if (mazoOrdenado[i]!=carta1){
			if (mazoOrdenado[i]!=carta2&&mazoOrdenado[i]!=carta3){
				nominador1--;
			}
		}
	}
	
	for (i=0; i<mazoOrdenado.length; i++){
		if(mazoOrdenado[i]==carta2){break;}
		if (mazoOrdenado[i]!=carta2){
			if (mazoOrdenado[i]!=carta1&&mazoOrdenado[i]!=carta3){
				nominador2--;
			}
		}
	}
	
	
	prob2=nominador2/denominador;
	
	console.log('prob1' + prob1)
	console.log('prob2' + prob2)
	
	prob=prob1*prob2;
	
	if (prob>0.8){
		
		alert('Tus probabilidades de ganar el truco son: ' + prob + '. Se recomienda perder la primer mano');
		
	}
	
	return prob
	
	
}

document.getElementById("Mazo").onclick = function(){
	
	if ((Jugador1.turnoJugar && Jugador1.turnoCantar) || Jugador1.turnoCantar){
		seFueAlMazoJ1=true;
		
	}else if ((Jugador2.turnoJugar && Jugador2.turnoCantar) || Jugador2.turnoCantar){
		seFueAlMazoJ2=true
		}
	
	comprobarGanadorMano()
	
	
}

//function para inciar juego
document.getElementById("Empezar").onclick = function(){
	
	init();
	//oculto boton para empezar
	document.getElementById('Empezar').style.display = 'none';	
}






