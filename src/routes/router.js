import { Router } from "express";
import {register, login, logout} from '../controllers/authController.js';

import {
  renderIndexPage,
  renderBandaPage,
  renderDiscografiaPage,
  renderMerchPage,
  renderContactoPage,
  renderDashboard,
  renderLogin,
  renderRegister,
  renderApiProductos

} from "../controllers/index.controller.js";

const router = Router();


//Rutas ---------------------------------------------------------------------

//Página de inicio
router.get("/index", renderIndexPage);

//Página biografía
router.get("/banda", renderBandaPage);

//Página discografía
router.get("/discografia", renderDiscografiaPage);

//Página Merchandise
router.get("/merch", renderMerchPage);

//Página formulario de contacto
router.get("/contacto", renderContactoPage);


//Rutas de la API productos ---------------------------------------------------

// router.get("/api/productos", renderApiProductos);

router.get("/api/productos", async (req, res) => {
  try {
    const resultado = await fetch("http://localhost:4000/api/productos", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await resultado.json();
    res.render("mantenedor", { productos: data });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los productos.");
  }
});


router.post("/productos", async (req, res) => {
  const { nombre, categoria, talla, precio, cantidad} = req.body;
  const body = { nombre: nombre, categoria: categoria, talla: talla, precio: precio, cantidad: cantidad }
  const resultado = await fetch("http://localhost:4000/api/productos", {
      method: "post",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
  });
  // console.log(JSON.stringify(resultado));
  const data = await resultado.json();
  res.render("mantenedor", { productos: data });
});


  router.post("api/productos/update/:id", async (req, res) => {
    const { nombre, categoria, talla, precio, cantidad } = req.body;
    const body = { nombre: nombre, categoria: categoria, talla: talla, precio: precio, cantidad: cantidad }
    const resultado = await fetch("http://localhost:4000/api/productos/update/"+id, {
      method: "put",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    });
    // console.log(JSON.stringify(resultado));
    const data = await resultado.json();
    res.render("mantenedor", { productos: data });
  });
  
  
  router.delete("api/productos/borrar/:id",async(req,res)=>{
    console.log("método eliminar")
    const {id} = req.params
    const resultado = await fetch("http://localhost:4000/api/productos/borrar/"+id,
    {method: 'DELETE'});
    if(resultado.status==200){
      const datos = await fetch("http://localhost:4000/api/productos/borrar/"+id);
        const data = await datos.json();
        res.render("mantenedor", {"personas":data});
    }else{
      res.render("error", {"error":"Problemas al Eliminar registro"});
    }
  });
  


  //Rutas Login/Register---------------------------------------------------------
  
  router.get("/dashboard", renderDashboard);
  
  router.get("/login", renderLogin);
  
  router.get("/register", renderRegister);


//Router para los métodos del controller
router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)



export default router;