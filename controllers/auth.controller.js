import bcrypt from 'bcrypt';
import { User } from '../models/index.js';
import { generateToken } from '../utilities/helpers.js';

export async function register(req, res) {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (user) {
        res.status(400).json({ error: 'Email already in use' });
        return;
    };

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    const token = generateToken(newUser.id);

    res.status(201).json({
        token,
        message: 'Registering new user',
        user: {
            id: newUser.id,
            name: newUser.name
        }
    });
};

export async function login(req, res) {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
        res.status(404).json({ message: 'Invalid email or password' });
        return;
    }

    const isValidPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isValidPassword) {
        res.status(404).json({ message: 'Invalid email or password' });
        return;
    }

    const token = generateToken(user.id);
    res.json({ token });
};

export async function getCurrentUser(req, res) {
    const user = await User.findByPk(req.user.id);
    if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
    }

    res.json({
        id: user.id,
        name: user.name,
        email: user.email
    });
};