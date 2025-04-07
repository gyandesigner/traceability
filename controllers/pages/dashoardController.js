const getDashboardPage = async (req,res) => {
    console.log("--------------Dashboard Page--------------");
    
    const model = {
        title: '',
        layout: 'layouts/layout'
    }
    model.title = 'Dashboard | Tracibility';
    model.layout = 'layouts/dashboard-layout';
    res.render('dashboard/dashboard', model);
}

export default { getDashboardPage };