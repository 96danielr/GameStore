// Models
const { Games } = require('../models/games.model');
const { Reviews } = require('../models/reviews.model');
const { Consoles } = require('../models/consoles.model');
const { Users } = require('../models/users.model');
const { GamesInConsoles } = require('../models/gamesInConsoles.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');

const createGame = catchAsync(async (req, res, next) => {
	const { title, genre, consoleId } = req.body;

	const newGame = await Games.create({ title, genre });

	// Assign game to console
	await GamesInConsoles.create({ consoleId, gameId: newGame.id });

	res.status(201).json({
		status: 'success',
		data: { newGame },
	});
});

const getAllGames = catchAsync(async (req, res, next) => {
	const games = await Games.findAll({
		where: { status: 'active' },
		include: [
			{
				model: Reviews,
				include: { model: Users, attributes: { exclude: ['password'] } },
			},
			{ model: Consoles },
		],
	});

	res.status(200).json({
		status: 'success',
		data: { games },
	});
});

const updateGame = catchAsync(async (req, res, next) => {
	const { game } = req;
	const { title } = req.body;

	await game.update({ title });

	res.status(200).json({
		status: 'success',
		data: { game },
	});
});

const deleteGame = catchAsync(async (req, res, next) => {
	const { game } = req;

	await game.update({ status: 'deleted' });

	res.status(200).json({
		status: 'success',
	});
});

const createReview = catchAsync(async (req, res, next) => {
	const { gameId } = req.params;
	const { comment } = req.body;
	const { sessionUser } = req;

	const newReview = await Reviews.create({
		userId: sessionUser.id,
		gameId,
		comment,
	});

	res.status(201).json({
		status: 'success',
		data: { newReview },
	});
});

module.exports = {
	createGame,
	getAllGames,
	updateGame,
	deleteGame,
	createReview,
};