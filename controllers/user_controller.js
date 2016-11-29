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