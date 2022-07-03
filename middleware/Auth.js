import User from "../models/User.js";
import jwt from "jsonwebtoken";
export const isAuth = async(req, res, next) => {
    const token = req.cookies?.auth_token; // Отримуємо токен, який зберігається в кукі
    if(!token) {
        res.status(403).send('У вас недостаточно прав для просмотра этой страницы')
    } else {
        try {
            const verified = jwt.verify(token, process.env.TOKEN_SECRET); // Верифікуємо токер
            req.user = await User.findOne({_id: verified._id}).populate('role');
            next();
        } catch (err) {
            res.cookie('auth_token', '', {maxAge: 0}); // Видаляємо кукі з токеном
            res.status(400).render('admin/status-pages/400');
        }
    }
}

export const isStaff = async(req, res, next) => {
    const token = req.cookies?.auth_token; // Отримуємо токен, який зберігається в кукі
    if(!token) {
        res.status(403).render('admin/status-pages/403');
    } else {
        try {
            const verified = jwt.verify(token, process.env.TOKEN_SECRET); // Верифікуємо токер
            req.user = await User.findOne({_id: verified._id}).populate('role');
            if(!req.user.role.isStaff) res.status(403).render('admin/status-pages/403');
            next();
        } catch (err) {
            res.cookie('auth_token', '', {maxAge: 0}); // Видаляємо кукі з токеном
            res.status(400).render('admin/status-pages/400');
        }
    }
}