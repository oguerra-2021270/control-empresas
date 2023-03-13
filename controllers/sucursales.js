//Importacion
const { response, request } = require('express');


const Sucursal = require('../models/sucursal');


const getSucursales = async (req = request, res = response) => {


    const query = { estado: true };

    const listaSucursales = await Promise.all([
        Sucursal.countDocuments(query),
        Sucursal.find(query)
    ]);

    res.json({
        msg: 'GET API de Empresas',
        listaSucursales
    });

}

const postSucursales = async (req = request, res = response) => {

    const { nombre, municipio, direccion, telefono, empresa } = req.body;
    const sucursalDB = new Sucursal({ nombre, municipio, direccion, telefono, empresa });



    await sucursalDB.save();

    res.status(201).json({
        msg: 'POST API de Empresa',
        sucursalDB
    });

}

const putSucursal = async (req = request, res = response) => {

    const { id } = req.params;


    const { _id, estado, ...resto } = req.body;



    const sucursalEditada = await Sucursal.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'PUT API de usuario',
        sucursalEditada
    });

}


const deleteSucursal = async (req = request, res = response) => {

    const { id } = req.params;

    const sucursalEliminada = await Sucursal.findByIdAndDelete(id);


    res.json({
        msg: 'DELETE API de Empresa',
        sucursalEliminada
    });

}



module.exports = {
    getSucursales,
    postSucursales,
    putSucursal,
    deleteSucursal
}