export const getAdminDashboardView = (req, res) => {
    const page = {
        lang: 'uk-UK',
        description: 'Система керування контентом Ейфорія від одноіменної веб-студії, створена з допомогою NodeJs',
        robots: 'index',
        keywords: 'CMS, Ейфорія, Система керуваня контентом, NodeJs CMS',
        title: 'UArmor | Система керування контентом',
        author: 'Euphoria digital agency',
        name: 'dashboard'
    };
    res.render('admin/route-pages/dashboard', {data: page})
}
export const getAdminLoginView = (req, res) => {
    res.render('admin/route-pages/dashboard', {data: page})
}