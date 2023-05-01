// render de rutas
export const renderIndexPage = (req, res) => res.render("index", );
export const renderBandaPage = (req, res) => res.render("banda", );
export const renderDiscografiaPage = (req, res) => res.render("discografia", );
export const renderMerchPage = (req, res) => res.render("merch", );
export const renderContactoPage = (req, res) => res.render("contacto", );

export const renderDashboard = (req, res) => res.render("dashboard");
export const renderLogin = (req, res) => res.render("login");
export const renderRegister = (req, res) => res.render("register");

export const renderApiProductos = (req, res) => res.render("mantenedor");

