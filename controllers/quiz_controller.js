var models =require('../models/models.js');

//GET /quizes/new
exports.new=function (req,res) {
	var quiz=models.Quiz.build(//crea objeto quiz
		{pregunta:"Pregunta",respuesta:"Respuesta"}
		);
		res.render('quizes/new',{quiz:quiz});
};

//POST /quizes/create
exports.create=function (req,res) {
	var quiz=models.Quiz.build(req.body.quiz);
	//guarda en DB los campos pregunta y respuesrta de quiz
	quiz.save({fields:["pregunta","respuesta"]}).then(function() {
		res.redirect('/quizes');

	});  //Redirecion HTTP (url relativo) lista de preguntas
}
//Autoload -factoriza el codigo si la ruta incluye :quizId
exports.load=function (req,res,next,quizId) {
	models.Quiz.findById(quizId).then(
		function (quiz) {
		if(quiz){
			req.quiz=quiz;
			next();
		}else{
			next(new Error ('No existe quizId = '+quizId));}
	}
	).catch(function(error){
		next(error);
	});
};


//GET /quizes
exports.index=function(req,res){
	models.Quiz.findAll().then(function (quizes) {
		res.render('quizes/index',{quizes:quizes});
	}
	).catch(function(error){next(error);})

};
//GET /quizes/:id

exports.show=function (req,res) {

	res.render('quizes/show',{quiz: req.quiz});
};

//GET /quizes/answer

exports.answer=function (req,res) {
	var resultado="Incorrecto";
	if(req.query.respuesta===req.quiz.respuesta){
		resultado="Correcto";
	}
	res.render('quizes/answer',{quiz:req.quiz,respuesta:resultado});
};