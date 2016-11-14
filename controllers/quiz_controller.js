var models =require('../models/models.js');

//GET /quizes/new
exports.new=function (req,res) {
	var quiz=models.Quiz.build(//crea objeto quiz
		{pregunta:"Pregunta",respuesta:"Respuesta"}
		);
		res.render('quizes/new',{quiz:quiz,errors:[]});
};

//POST /quizes/create
exports.create=function (req,res) {
	var quiz=models.Quiz.build(req.body.quiz);
	quiz
	.validate()
	.then(
		function (err) {
			if(err){
				res.render('quizes/new',{quiz:quiz,errors:err.errors});
			}else{
		
	//guarda en DB los campos pregunta y respuesrta de quiz
	quiz.save({fields:["pregunta","respuesta"]}).then(function() {
		res.redirect('/quizes');});  //Redirecion HTTP (url relativo) lista de preguntas
}
});

};

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
		res.render('quizes/index',{quizes:quizes,errors:[]});
	}
	).catch(function(error){next(error);})

};
//GET /quizes/:id

exports.show=function (req,res) {
	var fallos=req.query.fallos;
	res.render('quizes/show',{quiz: req.quiz,fallos:fallos,errors:[]});
};

//GET /quizes/answer

exports.answer=function (req,res) {
	var fallos=req.query.fallos;
	var array=req.quiz.respuesta.split("");
	var palabra="";
	var resultado="Incorrecto";

	if(req.query.respuesta===req.quiz.respuesta){
		resultado="Correcto";
		fallos=0;
	}else{
		
		fallos++;
		if(fallos>req.quiz.respuesta.length){
         palabra="No hay mas Pistas."
		}else{
		palabra=array[fallos-1];
	}

	}
	res.render('quizes/answer',{quiz:req.quiz,respuesta:resultado,errors:[],palabra:palabra,fallos:fallos});
};