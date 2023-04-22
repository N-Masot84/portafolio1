import { Router } from "express";

import {
    renderIndexPage,
    renderBandaPage,
    renderDiscografiaPage,
    renderMerchPage,
    renderContactoPage,

} from "../controllers/index.controller.js";

const router = Router();

// Ruta a la página principal
router.get("/index", renderIndexPage);

//Ruta a la página de biografía
router.get("/banda", renderBandaPage);

//Ruta a la página discografía
router.get("/discografia", renderDiscografiaPage);

//Ruta a la página de Merchandise
router.get("/merch", renderMerchPage);

//Ruta a la página formulario de contacto
router.get("/contacto", renderContactoPage);


//Rutas de la API-----------------------------------------------------------------

router.get("/api/productos", async (_req, res) => {
  const resultado = await fetch("http://localhost:4000/api/productos"); {
  // console.log(resultado);
  const data = await resultado.json();
  res.render("mantenedor", { productos: data });
  }});


router.post("/api/productos", async (req, res) => {
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


  router.post("/api/productos", async (req, res) => {
    const { nombre, categoria, talla, precio, cantidad } = req.body;
    const body = { nombre: nombre, categoria: categoria, talla: talla, precio: precio, cantidad: cantidad }
    const resultado = await fetch("http://localhost:4000/api/productos", {
        method: "put",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" }
      });
    // console.log(JSON.stringify(resultado));
    const data = await resultado.json();
    res.render("mantenedor", { productos: data });
  });


  router.delete("/api/productos-borrar/:id",async(req,res)=>{
    console.log("método eliminar")
    const {id} = req.params
    const resultado = await fetch("http://localhost:4000/api/productos-borrar/"+id,
    {method: 'DELETE'});
    if(resultado.status==200){
        const datos = await fetch("http://localhost:4000/api/productos-borrar");
        const data = await datos.json();
        res.render("mantenedor", {"personas":data});
    }else{
        res.render("error", {"error":"Problemas al Eliminar registro"});
    }
});



export default router;