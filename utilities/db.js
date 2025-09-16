import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DB_FILE_NAME || 'database.sqlite'
});

export async function initDB() {
  try {
    await sequelize.sync();
    console.log('Database is running.');
  } catch (err) {
    console.log('Unable to connect to the database:', err);
  }
}

export default sequelize;
