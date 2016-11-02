var models = require('../models/models.js');

//GET /quizes/question

exports.question = function(req, res) {
	models.Quiz.findAll().then(function(quiz) {

		res.render('quizes/question', {
			pregunta: quiz[0].pregunta
		});
	});
};

//GET /quizes/answer

exports.answer = function(req, res) {
models.Quiz.findAll().then(function(quiz) {

		if (req.query.respuesta === quiz[0].respuesta) {
			quiz[0].aciertos = quiz[0].aciertos + 1;
			quiz[0].save().then(function(quiz) {

			});
			res.render('quizes/answer', {
				respuesta: 'Correcto  aciertos: ' + quiz[0].aciertos + 'Fallos :' + quiz[0].fallos
			});

		} else {
			quiz[0].fallos = quiz[0].fallos + 1;
			quiz[0].save().then(function(quiz) {

			});
			res.render('quizes/answer', {
				respuesta: 'Incorrecto ' + ' Upss Game Over Aciertos: ' + quiz[0].aciertos + ' Fallos : ' + quiz[0].fallos
			});


}
});
};

exports.estadisticas = function(req, res) {
		models.Quiz.findAll().then(function(quiz) {
				res.render('quizes/estadisticas', {
					aciertos: 'Los Aciertos : ' + quiz[0].aciertos,
					fallos: ' Los Fallos : ' + quiz[0].fallos
				});
			});
		}