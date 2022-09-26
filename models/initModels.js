// Models
const { Users } = require('./users.model');
const { Reviews } = require('./reviews.model');
const { Games } = require('./games.model');
const { Consoles } = require('./consoles.model');

const initModels = () => {
    // 1 User <----> M Review
    Users.hasMany(Reviews, { foreignKey: 'userId' });
    Reviews.belongsTo(Users);

    // 1 Game <----> M Review
    Games.hasMany(Reviews, { foreignKey: 'gameId' });
    Reviews.belongsTo(Games);

    // M Game <----> M Console
    Games.belongsToMany(Consoles, {
        through: 'gameInConsole',
        foreignKey: 'gameId',
    });
    Consoles.belongsToMany(Games, {
        through: 'gameInConsole',
        foreignKey: 'consoleId',
    });
};

module.exports = { initModels };
