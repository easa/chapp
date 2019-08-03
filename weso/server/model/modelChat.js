var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var Mes = new Schema({
    content    : String
});

mongoose.model( 'Mes', Mes );
mongoose.connect( 'mongodb://localhost/chat' );