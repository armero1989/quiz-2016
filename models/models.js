var path = require('path');

//Cargar Modelo ORM
var Sequelize = require('sequelize');

//Usar BBDD SQLite:
var sequelize = new Sequelize(null, null, null, {
	dialect: "sqlite",
	storage: "quiz.sqlite"
});

//Importar la definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

exports.Quiz = Quiz; // exportar definicion de tabla Quiz
//Importar definicion tabla Comment
var Comment=sequelize.import(path.join(__dirname,'comment'));

exports.Comment=Comment;//exportar definicion de tabla Comment
//Relaciones
Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);
//sequelize.sync() crea e inicializa tabla de preguntas en DB
sequelize.sync().then(function() {
	//then(..) ejecuta el manejador una vez creada la tabla
	Quiz.count().then(function(count) {
		if (count === 0) { // la tabla se inicializa solo si esta vacia
			Quiz.create({
					pregunta: 'Capital de Italia',
					respuesta: 'Roma'
				})
			Quiz.create({
					pregunta: 'Capital de Portugal',
					respuesta: 'Lisboa'
				})
				.then(function() {
					console.log('Base de Datos inicializada');
				});

		}
	});
});