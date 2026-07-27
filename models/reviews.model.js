import { DataTypes } from 'sequelize';
import sequelize from '../utilities/db.js';

const Review = sequelize.define('reviews', {
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5,
        },
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    movieId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});


Review.associate = (models) => {
    Review.belongsTo(models.Movie, {
        foreignKey: 'movieId',
        as: 'movie',
    });
    
    Review.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
    });
};

export { Review };
