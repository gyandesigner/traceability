const getLoginPage = async (req,res) => {
    console.log("--------------Login Page--------------");
    res.clearCookie('jwt');
    
    if (req.cookies.jwt) { 
        return res.redirect('/dashboard');
    }
    const model = {
        title: '',
        layout: 'layouts/layout'
    }
    model.title = 'Login | Tracibility';
    model.layout = 'layouts/login-layout';
    res.render('login', model);
}

const getRegisterPage = async (req, res) => {
    console.log("--------------Register Page--------------");
    const model = {
        title: '',
        layout: 'layouts/layout'
    }
    
    model.title = 'Login | Tracibility';
    model.layout = 'layouts/login-layout';

    res.render('register', model);
}

const getLogoutPage = async (req, res) => {
    console.log("--------------User Logout --------------");
    res.clearCookie('jwt');
    res.redirect('/'); 
}



export default { getLoginPage, getRegisterPage, getLogoutPage };