import { DataTypes } from 'sequelize';
import sequelize from '../utilities/db.js';

const WatchList = sequelize.define('watchlists', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    movieId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

WatchList.associate = (models) => {
    WatchList.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
    });

    WatchList.belongsTo(models.Movie, {
        foreignKey: 'movieId',
        as: 'movie'
    });
};

export { WatchList };
