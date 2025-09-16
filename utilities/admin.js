import bcrypt from 'bcrypt';
import { User } from '../models/index.js';

export async function createDefaultAdmin() {
    const admin = await User.findOne({ where: { email: 'admin@movies.com' } });

    if (!admin) {
        const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

        await User.create({
            name: 'Admin',
            email: 'admin@movies.com',
            password: hashedPassword,
            isAdmin: true
        });
    }
};