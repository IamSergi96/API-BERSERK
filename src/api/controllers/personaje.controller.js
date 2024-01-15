const Character = require("../models/personajeModelo");
const HTTPSTATUSCODE = require("../../../utils/httpstatuscode");

//get all characters
const getCharacters = async(req,res)=>{
    try{
        const characters = await Character.find();
        res.status(200).json({status: 200, message: HTTPSTATUSCODE[200], data: characters});
    }catch(error){
        res.status(404).json({message: HTTPSTATUSCODE(404)});
    }
}

//get 1 character
const getCharacter = async(req,res)=>{
    try{
        const id = req.params.id;
        const character = await Character.findById(id);
        res.status(200).json({status: 200, message: HTTPSTATUSCODE[200], data: character})
    }catch(error){
        res.status(404).json({message: HTTPSTATUSCODE(404)});
    }
}

//post a character
const createCharacter = async(req,res)=>{
    const character = new Character(req.body);
    try{
        console.log("character", character)
        await character.save();
        console.log("Despues de guardar")
        res.status(201).json({status: 200, message: HTTPSTATUSCODE[200], data: character})
    }catch(error){
        console.error(error.message)
        res.status(404).json({message: HTTPSTATUSCODE[404]});
    }
}


//patch: Update character
const updateCharacter = async (req, res)=>{
    try{
        const id = req.params.id;
        const body = req.body;
        const character = await Character.findByIdAndUpdate(id, body, {new:true});
        if(!character){
            return res.status(404).json({status: 404, message: HTTPSTATUSCODE[404]});
        }
        res.status(200).json({status: 200, message: HTTPSTATUSCODE[200], data: character});
    }catch(error){
        res.status(400).json({message: HTTPSTATUSCODE[400]});
    }
}

//delete: delete a character
const deleteCharacter = async (req,res)=>{
    try{
        const id = req.params.id;
        const character = await Character.findByIdAndDelete(id);
        if(!character){
            return res.status(404).json({message: HTTPSTATUSCODE(404)})
        }
        res.status(200).json({status: 200, message: HTTPSTATUSCODE[200], data: character});
    }catch(error){
        res.status(500).json({status: 500, message: HTTPSTATUSCODE[500]});
    }
}

module.exports={getCharacters, getCharacter, createCharacter, updateCharacter, deleteCharacter}