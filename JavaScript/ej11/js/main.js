var Persona = function(nombre,edad){
	this.nombre = nombre || "Iraitz"; //Con esto si el parametro nombre está vacío, se pondrá Iraitz
	this.edad = edad || 31;
}

Persona.prototype.obtDetalles = function(){
	console.log("Nombre : " + this.nombre + ", Edad: " + this.edad);
}

var Estudiante = function(nombre,edad,curso,grupo){
	Persona.call(this,nombre,edad);
	this.curso = curso;
	this.grupo = grupo;
	this.registrar = function(){
		console.log("Curso: " + this.curso + ", Grupo: " + this.grupo);
	}
}

Estudiante.prototype = new Persona;

var Profesor = function(nombre,edad,asignatura,nivel){
	Persona.call(this,nombre,edad);
	this.asignatura=asignatura;
	this.nivel=nivel;
	this.asignar = function(){
		console.log("Asignatura: " + this.asignatura + ", Nivel: " + this.nivel);
	}
}

Profesor.prototype = new Persona;

var est = new Estudiante("Iraitz","31",1,"B");
est.registrar();
est.obtDetalles();
