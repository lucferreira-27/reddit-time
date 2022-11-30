const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../express/.env') })
const { Sequelize } = require('sequelize');
const { applyExtraSetup } = require('./extra-setup');



/*
 #Datavase for tests
{
	dialect: 'sqlite',
	storage: 'sqlite-example-database/example-db.sqlite',
	logQueryParameters: true,
	benchmark: true
}
*/
const DB_PASS = process.env.DB_PASS
const DB_CONNECTION_URL = process.env.DB_CONNECTION_URL.replace('YOUR-PASSWORD', DB_PASS)

const sequelize = new Sequelize(DB_CONNECTION_URL);

const modelDefiners = [
	require('./models/user.model'),
	require('./models/post.model'),
	require('./models/postState.model'),
	// Add more models here...
	// require('./models/[model-name]'),
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

// We execute any extra setup after the models are defined, such as adding associations.
applyExtraSetup(sequelize);

// We export the sequelize connection instance to be used around our app.
module.exports = sequelize;
