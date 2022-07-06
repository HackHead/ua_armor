export const generateCart = async(req, res, next) => {
    const session = req.session; // Отримуємо токен, який зберігається в кукі
    if(!session) {
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