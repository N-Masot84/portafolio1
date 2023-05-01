import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import conexion from '../database/db.js';
import { promisify } from 'util';


//Método para registro
export const register = async (req, res) => {
    console.log(req.body)
    try {
        const { name, user, pass } = req.body;
        let passHash = await bcryptjs.hash(pass, 8);
        conexion.query('INSERT INTO usuarios SET ?', {user:user ,name:name, pass:passHash}, (error, results)=>{
            if(results){console.log(results)}
            res.redirect('/dashboard');
        })
    } catch (error) {
        console.log(error);
    }
}

//Método para el Login
export const login = async (req, res) => {
    try {
        const user = req.body.user
        const pass = req.body.pass
        
        if(!user || !pass) {
            res.render('login', {
                alert: true,
                alertTitle: "Advertencia",
                alertMessage: "Ingrese usuario y password",
                alertIcon: 'info',
                showConfirmButtonText: true,
                timer: 10000,
                ruta: 'login'
           }) 
        }else{
            conexion.query('SELECT * FROM usuarios WHERE user = ?', [user], async (error, results)=>{ 
                if( results.length == 0 || ! (await bcryptjs.compare(pass, results[0].pass)) ){
                    res.render('login', {
                        alert: true,
                        alertTitle: "Error",
                        alertMessage: "Usuario o password incorrectos",
                        alertIcon: 'error',
                        showConfirmButtonText: true,
                        timer: 10000,
                        ruta: 'login'
                   }) 
                }else{
                    //inicio de sesión OK
                    const id = results[0].id
                    const token = jwt.sign({id:id}, process.env.JWT_SECRETO, {
                        expiresIn: process.env.JWT_TIEMPO_EXPIRA
                    })
                    //genera token sin fecha de expiración
                    // const token = jwt.sign({id: id}, process.env.JWT_SECRETO)
                    console.log("El TOKEN es: "+token+" para el USUARIO : "+user)

                    const cookiesOptions = {
                        expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                        httpOnly: true
                    }
                    res.cookie('jwt', token, cookiesOptions)
                    res.render('dashboard', {
                        alert: true,
                        alertTitle: "Conexión exitosa",
                        alertMessage: "¡LOGIN correcto!",
                        alertIcon: 'success',
                        showConfirmButtonText: true,
                        timer: 10000,
                        ruta: 'dashboard'
                   }) 
                }
            })
        }
    } catch (error) {
        console.log(error)
    }
}

//Método para autentificación
export const isAuthenticated = async (req, res, next) => {
    if (req.cookies.jwt) {
       try {
            const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO);
            conexion.query('SELECT * FROM usuarios WHERE id = ?', [decodificada.id], (error, results)=>{
                if(!results){return next();}
                req.user = results[0];
                return next();
            })
       } catch (error) {
            console.log(error);
            return next();
       } 
    }else{
        res.redirect('/login');
    }
}

//Logout
export const logout = (req, res) => {
    res.clearCookie('jwt');
    return res.redirect('/login');
}

