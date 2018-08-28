var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

var Usuario = require('./modelos/usuario');

passport.use('local', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
},
    // Función que comprueba que si el login es correcto
    function (username, password, done) {
        Usuario.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Usuario incorrecto' });
            }
            if (!user.isValid(password)) {
                return done(null, false, { message: 'Password incorrecto' });
            }
            return done(null, user);
        });
    }
));

// Serialización del usuario
passport.serializeUser(function (user, done) {
    done(null, user._id);
});

// Deserialización del usuario
passport.deserializeUser(function (id, done) {
    Usuario.findById(id, function (err, user) {
        done(err, user);
    });
});