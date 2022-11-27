const express = require('express');
const bodyParser = require('body-parser');
const tracking = require('./service/tracking')

const routes = {
	users: require('./routes/users'),
	posts: require('./routes/posts'),
	states: require('./routes/states'),
	// tracking: require('./routes/tracking'),
	// Add more routes here...
	// items: require('./routes/items'),
};

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// We create a wrapper to workaround async errors not being transmitted correctly.
function makeHandlerAwareOfAsyncErrors(handler) {
	return async function(req, res, next) {
		try {
			await handler(req, res);
		} catch (error) {
			next(error);
		}
	};
}


app.get('/', (req, res) => {
	res.redirect('/api/users')
});

// We define the standard REST APIs for each route (if they exist).
function defineRoutes(routes){
	const defaultRoutes = () =>{
		for (const [routeName, routeController] of Object.entries(routes)) {
			if (routeController.getAll) {
				app.get(
					`/api/${routeName}`,
					makeHandlerAwareOfAsyncErrors(routeController.getAll)
				);
			}
			if (routeController.getById) {
				app.get(
					`/api/${routeName}/:id`,
					makeHandlerAwareOfAsyncErrors(routeController.getById)
				);
			}
			if (routeController.create) {
				app.post(
					`/api/${routeName}`,
					makeHandlerAwareOfAsyncErrors(routeController.create)
				);
			}
			if (routeController.update) {
				app.put(
					`/api/${routeName}/:id`,
					makeHandlerAwareOfAsyncErrors(routeController.update)
				);
			}
			if (routeController.remove) {
				app.delete(
					`/api/${routeName}/:id`,
					makeHandlerAwareOfAsyncErrors(routeController.remove)
				);
			}
		}
	}
	defaultRoutes()
}
defineRoutes(routes)
tracking() // Tracking Posts


module.exports = app;
