


function applyExtraSetup(sequelize) {
	const { User, Post, PostState } = sequelize.models;
	User.hasMany(Post)
	Post.belongsTo(User)

	Post.hasMany(PostState)
	PostState.belongsTo(Post)

	/* Example
		const { instrument, orchestra } = sequelize.models;
		orchestra.hasMany(instrument);
		instrument.belongsTo(orchestra);
	*/

}

module.exports = { applyExtraSetup };
