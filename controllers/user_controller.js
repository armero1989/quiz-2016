var models=require('../models/models.js');

//Comprueba si el usuario esta registrado en users
//Si autentificacion falla o hay errores se ejecuta calback(error).
exports.autenticar = function(login,password,callback){
	models.users.findOne({
		where: {username: login , password: password},
	}).then(function(user){
		if(user.username==login){
			if (password == user.password) {
			callback(null, user);
		} else {
			callback(new Error('Password erróneo'));
}
		}else{
			callback(new Error('No existe el usuario.'));
		}
	}).catch(function(error){
		callback(new Error('No existe el usuario y/o la contraseña.'));
	});
};
//Get /register -- formulario de registro
exports.new=function (req,res) {
;
	var user = models.users.build( //crea objeto quiz
		{
			username: "usuario",
			password: "password"
		}
	);

	res.render('users/create',{user:user,errors:[]});
}

exports.create = function(req, res) {

	var login = req.body.username;
	var password = req.body.password;
	var password2= req.body.password2;

	
		var user = models.users.build(req.body.user);
	user
		.validate()
		.then(
			function(err,password,password2) {
				if (err) {
					res.render('user/create', {
						user:user,
						errors: err.errors
					});
				} else if(password!=password2){
					res.render('user/create', {
						user:user,
						errors: err.errors
					});
				}else{

					//guarda en DB los campos pregunta y respuesrta de quiz
					user.save({
						fields: ["username", "password"]
					}).then(function() {
						res.redirect('/users');
					}); //Redirecion HTTP (url relativo) lista de usuario
				}
			});	

		
		//Crear req.session.user y guardar campos id y username
		//La session se define por la existencia de : req.session.user
};
exports.index = function(req, res) {
	models.users.findAll().then(function(users) {
		res.render('users/index', {
			users: users,
			errors: []
		});
	}).catch(function(error) {
		next(error);
	})

};