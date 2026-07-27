import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DB_FILE_NAME || 'database.sqlite'
});

export async function initDB(options = {}) {
  try {
    await sequelize.sync(options);
    console.log('Database is running.');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
    throw err;
  }
}

export default sequelize;
