const sequelize = require('../sequelize');

async function reset() {
	console.log('Will rewrite the SQLite example database, adding optionable some dummy data..');
	await sequelize.sync({ force: true });
	const defaultUsers = [
		{ username: 'luffy',password:'meat' },
		{ username: 'zoro', password: 'sword' },
		{ username: 'nami', password: 'belly' },
		{ username: 'ussop', password: 'kaya' },
	]
	await sequelize.models.User.bulkCreate(defaultUsers);
	console.log('Creating default users!',defaultUsers);
	/*
	const defaultPosts = [
		{ 
			autoTracking: false,
			comunityName: 'OnePiece',
			postId: 'z4bush',
		}
	]
	await sequelize.models.Post.bulkCreate(defaultPosts);
	console.log('Creating default posts!',defaultPosts);

	*/
}

reset();
