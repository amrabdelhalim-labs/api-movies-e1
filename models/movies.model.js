import sequelize from "../utilities/db.js";
import { DataTypes } from "sequelize";

const Movie = sequelize.define("movies", {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    releaseYear: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false
    }
});


Movie.associate = (models) => {
    Movie.hasMany(models.Review, {
        foreignKey: 'movieId',
        as: 'reviews'
    });

    Movie.hasMany(models.WatchList, {
        foreignKey: 'movieId',
        as: 'watchlists'
    });
};

export { Movie };
