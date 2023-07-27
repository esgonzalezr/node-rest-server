const { request, response } = require("express");
const { Category } = require('../models');

const getAllCategories = async (req = request, res = response) => {

    const { limit = 5, offset = 0 } = req.query;
    const queryCondition = { status: true };

    try {

        const [count, categories] = await Promise.all([
            Category.count(queryCondition),
            Category.find(queryCondition)
                .populate('user', 'name')
                .limit(limit)
                .skip(offset)
        ]);

        res.status(200).json({
            count,
            categories
        });

    } catch (error) {
        console.log('Internal Error - getAllCategories', error);
        res.status(500).json({
            msg: error
        });
    }
};

const getCategoryById = async (req = request, res = response) => {

    const { id } = req.params;

    try {

        const category = await Category.findById(id)
            .populate('user', 'name'); // Trae el registro e incluye el detalle del ID de usuario que lo creó / actualizó

        res.status(200).json({
            category
        });

    } catch (error) {
        console.log('Internal Error - getCategoryById', error);
        res.status(500).json({
            msg: error
        });
    }
}

const createCategory = async (req = request, res = response) => {
    const name = req.body.name.toUpperCase();
    const categoryFound = await Category.findOne({ name: name });

    //Valida si ya existe una categoría con ese nombre
    if (categoryFound) {
        return res.status(400).json({
            msg: `La categoría ${categoryFound.name} ya existe.`
        });
    }

    //Se crea la data a persistir. Nota: el UID del usuario siempre se debe tomar del request ya que es el que está validado.
    const data = {
        name: name,
        user: req.user._id
    }

    try {
        //Se prepara el modelo y se persiste
        const newCategory = new Category(data);
        await newCategory.save();

        //Se retorna la respuesta con la categoría creada
        res.status(201).json({
            newCategory
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: error
        });
    }
};

const updateCategory = async (req = request, res = response) => {

    const { id } = req.params;
    const name = req.body.name.toUpperCase();

    try {

        //Se valida que no exista una categoría con el nuevo nombre de la actualización
        // const foundCategory = await Category.findOne({ name: name });
        // if (foundCategory) {
        //     return res.status(401).json({
        //         msg: `No es posible actualizar el registro. Ya existe una categoría con el nombre ${name}.`
        //     });
        // }

        //Se prepara la data que se va a persistir
        const data = {
            name: name,
            user: req.user._id
        }

        //Se lanza el update
        const updatedCategory = await Category.findByIdAndUpdate(id, data, { returnOriginal: false });

        //Se retorna la respuesta
        res.status(200).json({
            msg: 'Registro actualizado correctamente',
            category: updatedCategory
        });

    } catch (error) {
        res.status(500).json({
            msg: 'Error del sistema: ' + error
        });
    }
};

const deleteCategory = async (req = request, res = response) => {

    const { id } = req.params;

    try {
        const deletedCategory = await Category.findByIdAndUpdate(id, { status: false, user: req.user._id }, { returnOriginal: false });

        res.status(200).json({
            msg: 'Registro eliminado (deshabilitado) correctamente',
            category: deletedCategory
        });

    } catch (error) {
        console.log('Error del sistema: ', error);
        res.status(500).json({
            msg: 'Error interno del sistema. Comuníquese con el administrador',
            error
        });
    }
};


module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
}