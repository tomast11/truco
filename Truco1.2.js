// <meta charset="utf-8" />



//array de cartas que compone el mazo
var cartas=new Array();
var jugadaNum=0;
var envidoCantado=false;
// array clave valor con los palos
var palos={"b":"bastos", "e":"espadas", "o":"oros", "c":"copas"}
//xx
var jugadasPosibles = new Array();
jugadasPosibles = ['Inicio', 'Truco', 'Envido', '2Envido', 'RealEnvido', 'FaltaEnvido', 'NoquieroEnvido', 'Retruco', 'Vale4', 'QuieroEnvido', 'QuieroTruco','QuieroRetruco', 'QuieroVale4'];
var cartasTiradasJ1=new Array();
var cartasTiradasJ2=new Array();
//Creo Matriz Y
var Matriz = [	['Inicio', 'Truco', 'Envido', '2Envido', 'RealEnvido', 'FaltaEnvido', 'NoquieroEnvido', 'Retruco', 'Vale4', 'QuieroEnvido', 'QuieroTruco','QuieroRetruco', 'QuieroVale4'],
				[false,  true,  true,  false,  true,  true,  false,  false,  false,  false,  false,  false,  false],//1
				[false,  false, true,  false,  true,  true,  false,  true,  false,  false,  true,  false,  false ],//2
				[false,  false,  false,  true,  true,  true,  true,  false,  false,  true,  false,  false,  false],//3
				[false,  false,  false,  false,  true,  true,  true,  false,  false,  true,  false,  false,  false],//4
				[false,  false,  false,  false,  false,  true,  true,  false,  false,  true,  false,  false,  false],//5
				[false,  false,  false,  false,  false,  false,  true,  false,  false,  true,  false,  false,  false],//6
				[false,  true,  false,  false,  false,  false,  false,  false,  false,  false,  false,  false,  false],//7
				[false,  false,  false,  false,  false,  false,  false,  false,  true,  false,  false, true, false],//8
				[false,  false,  false,  false,  false,  false,  false,  false,  false,  false,  false,  false,  true],//9
				[false,  true,  false,  false,  false,  false,  false,  false,  false,  false,  false,  false,  false],//10
				[false,  false,  false,  false,  false,  false,  false,  true,  false,  false,  false,  false,  false],//11
				[false, false, false, false, false, false, false, false, true, false, false, false, false],//12
				[false, false, false, false, false, false, false, false, false, false, false, false, false]//13
			]

// objeto jugador
var Jugador = (function() {
	function Jugador(name) {
		this.cartas = [];
		this.name = name;
		this.envido = 0;
		this.esMano=false;
		this.turnoJugar=false;
		this.turnoCantar=false;
		this.quiero=true;
		this.puntos=0;
		this.manosGanadas=0;
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
	
		sortearInicio();
		armarMazo();
		mezclarMazo();
		repartirManos();
		onClicksJugadas()
		onClickCartas()
		turnodeCantar(this.jugadaActual);
	}
	return init;
})();

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

//funcion para leer matriz desde json
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

function compararCartas(cartaA, cartaB) {
	
	
		if(cartaA.numero==cartaB.numero){
			
			return 'parda';
		}
	
		if(cartaA.numero == 1 && cartaA.palo == "espada") {
			return true;
		} else if(cartaA.numero == 1 && cartaA.palo == "basto") {
			if(cartaB.numero == 1 && cartaB.palo == "espada") {
				return false;
			}
			return true;
		} else if(cartaB.numero == 1 && cartaB.palo == "espada") {
			return false;
		} else if(cartaB.numero == 1 && cartaB.palo == "basto") {
			if(cartaA.numero == 1 && cartaA.palo == "espada") {
				return true;
			} else {
				return false;
			}
		} else if(cartaA.numero == 7 && cartaA.palo == "oro") {
			if(cartaB.numero == 7 && cartaB.palo == "espada") {
				return false;
			}
			return true;
		} else if(cartaA.numero == 7 && cartaA.palo == "espada") {
			return true;
		} else if(cartaB.numero == 7 && cartaB.palo == "espada") {
			return false;
		} else if(cartaB.numero == 7 && cartaB.palo == "oro") { 
			if(cartaA.numero == 7 && cartaA.palo == "espada") {
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
		} else if(cartaB.numero == 1 && cartaB.palo == "copa" || cartaB.palo == "oro") {
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
				for (e=1;e<=jugadasPosibles.length;e++){
					console.log('entro ' + e)
					if ((jugadasPosibles[e]=='Truco' || jugadasPosibles[e]=='Retruco'||jugadasPosibles[e]=='Vale4') && !Jugador1.quiero){
						console.log('entro1 ' + e)
						continue;}
					if (((jugadasPosibles[e]=='Envido' || jugadasPosibles[e]=='RealEnvido' || jugadasPosibles[e]=='FaltaEnvido') && jugadaNum>=2) || envidoCantado){continue;}
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
				for (e=1;e<=jugadasPosibles.length;e++){
					
					if ((jugadasPosibles[e]=='Truco' || jugadasPosibles[e]=='Retruco'||jugadasPosibles[e]=='Vale4') && !Jugador2.quiero){ 
					console.log('entro1 ' + e) 
					continue;}
					if (((jugadasPosibles[e]=='Envido' || jugadasPosibles[e]=='RealEnvido' || jugadasPosibles[e]=='FaltaEnvido') && jugadaNum>=2) || envidoCantado){continue;}
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
	document.getElementById('QuieroRetrucoJ1').style.display = 'none';
	document.getElementById('QuieroVale4J1').style.display = 'none';
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
	document.getElementById('QuieroRetrucoJ2').style.display = 'none';
	document.getElementById('QuieroVale4J2').style.display = 'none';
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

function tirarCarta(jugador, carta){
	if (jugador=='J1'){
		var elemento = 'Cartas'+jugador;
		var cartaTablero=document.getElementById(elemento);

		for (i=0;i<3;i++){
			if (carta==Jugador1.cartas[i].cartaNumero){
				cartaTablero.innerHTML += "<div id='Cartas"+jugador+i+"'>"+Jugador1.cartas[i].numero + " de " + Jugador1.cartas[i].palo + "</div>";
				cartasTiradasJ1.push(Jugador1.cartas[i]);
				
				if (jugadaNum==2 || jugadaNum==4 || jugadaNum==6){
					if(ganadorMano()){
						Jugador1.manosGanadas++;
						console.log('jugador1 uno gano la mano')
						Jugador1.turnoJugar=true;
						Jugador1.turnoCantar=true;
						Jugador2.turnoJugar=false;
						Jugador2.turnoCantar=false;
						
					}else if (!ganadorMano()){
						Jugador2.manosGanadas++;
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

		for (i=0;i<3;i++){
			if (carta==Jugador2.cartas[i].cartaNumero){
				cartaTablero.innerHTML += "<div id='Cartas"+jugador+i+"'>"+Jugador2.cartas[i].numero + " de " + Jugador2.cartas[i].palo + "</div>";
				cartasTiradasJ2.push(Jugador2.cartas[i]);
				
				if (jugadaNum==2 || jugadaNum==4 || jugadaNum==6){
					if(ganadorMano()){
						Jugador1.manosGanadas++;
						console.log('jugador1 uno gano la mano')
						Jugador1.turnoJugar=true;
						Jugador1.turnoCantar=true;
						Jugador2.turnoJugar=false;
						Jugador2.turnoCantar=false;						
					}else if (!ganadorMano()){
						Jugador2.manosGanadas++;
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
}
document.getElementById("EnvidoJ2").onclick = function(){	
	var	jugada='Envido';
	cambiarTurnoCantar();
	turnodeCantar(jugada);	
	envidoCantado=true;
}
document.getElementById("2EnvidoJ2").onclick = function(){	
	var	jugada='2Envido';
	cambiarTurnoCantar();
	turnodeCantar(jugada);
}
document.getElementById("2EnvidoJ1").onclick = function(){	
	var	jugada='2Envido';
	cambiarTurnoCantar();
	turnodeCantar(jugada);
}
document.getElementById("RealEnvidoJ1").onclick = function(){	
	var	jugada='RealEnvido';
	cambiarTurnoCantar();
	turnodeCantar(jugada);
	envidoCantado=true;	
}
document.getElementById("RealEnvidoJ2").onclick = function(){	
	var	jugada='RealEnvido';
	cambiarTurnoCantar();
	turnodeCantar(jugada);
	envidoCantado=true;
}
document.getElementById("FaltaEnvidoJ1").onclick = function(){	
	var	jugada='FaltaEnvido';
	cambiarTurnoCantar();
	turnodeCantar(jugada);
	envidoCantado=true;
}
document.getElementById("FaltaEnvidoJ2").onclick = function(){	
	var	jugada='FaltaEnvido';
	cambiarTurnoCantar();
	turnodeCantar(jugada);
	envidoCantado=true;
}
document.getElementById("NoquieroEnvidoJ1").onclick = function(){	
	var	jugada='NoquieroEnvido';
	cambiarTurnoCantar();
	turnodeCantar(jugada);
}
document.getElementById("NoquieroEnvidoJ2").onclick = function(){	
	var	jugada='NoquieroEnvido';
	cambiarTurnoCantar();
	turnodeCantar(jugada);	
}
document.getElementById("RetrucoJ1").onclick = function(){	
	var	jugada='Retruco';
	cambiarTurnoCantar();
	turnodeCantar(jugada);	
}
document.getElementById("RetrucoJ2").onclick = function(){	
	var	jugada='Retruco';
	cambiarTurnoCantar();
	turnodeCantar(jugada);	
}
document.getElementById("Vale4J1").onclick = function(){	
	var	jugada='Vale4';
	cambiarTurnoCantar();
	turnodeCantar(jugada);	
}
document.getElementById("Vale4J2").onclick = function(){	
	var	jugada='Vale4';
	cambiarTurnoCantar();
	turnodeCantar(jugada);	
}
document.getElementById("QuieroEnvidoJ1").onclick = function(){	
	var	jugada='QuieroEnvido';
	cambiarTurnoCantar();
	turnodeCantar(jugada);	
}
document.getElementById("QuieroEnvidoJ2").onclick = function(){	
	var	jugada='QuieroEnvido';
	cambiarTurnoCantar();
	turnodeCantar(jugada);	
}
document.getElementById("QuieroTrucoJ1").onclick = function(){	
	var	jugada='QuieroTruco';
	var jugador='J1'
	asignarQuiero(jugador);
	cambiarTurnoCantar();
	turnodeCantar(jugada);
	
}
document.getElementById("QuieroTrucoJ2").onclick = function(){	
	var	jugada='QuieroTruco';
	var jugador='J2'
	asignarQuiero(jugador);
	cambiarTurnoCantar();
	turnodeCantar(jugada);	
}
document.getElementById("QuieroRetrucoJ1").onclick = function(){	
	var	jugada='QuieroRetruco';
	var jugador='J1'
	asignarQuiero(jugador);
	cambiarTurnoCantar();
	turnodeCantar(jugada);
	
}
document.getElementById("QuieroRetrucoJ2").onclick = function(){	
	var	jugada='QuieroRetruco';
	var jugador='J2'
	asignarQuiero(jugador);
	cambiarTurnoCantar();
	turnodeCantar(jugada);	
}
document.getElementById("QuieroVale4J1").onclick = function(){	
	var	jugada='QuieroVale4';
	var jugador='J1'
	asignarQuiero(jugador);
	cambiarTurnoCantar();
	turnodeCantar(jugada);
	
}
document.getElementById("QuieroVale4J2").onclick = function(){	
	var	jugada='QuieroVale4';
	var jugador='J2'
	asignarQuiero(jugador);
	cambiarTurnoCantar();
	turnodeCantar(jugada);	
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
	
}
document.getElementById("Carta2").onclick = function(){
	console.log(Jugador1.turnoJugar)
	console.log(Jugador2.turnoJugar)
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
}
}


//function para inciar juego
document.getElementById("Empezar").onclick = function(){
	
	init();
	//oculto boton para empezar
	document.getElementById('Empezar').style.display = 'none';	
}
