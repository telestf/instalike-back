import fs from 'fs';
import { getAllPosts, createPost, updatePost } from "../models/postsModel.js";
import gerarDescricaoComGemini from "../services/geminiService.js"

const listarPosts = async(req, res) => {
    const posts = await getAllPosts();
    res.status(200).json(posts);
}

const postarNovoPost = async(req, res) => {
    const novoPost = req.body;
    try {
        const postCriado = await createPost(novoPost);
        res.status(200).json(postCriado);
    } catch (err){
        console.error(err.message);
        res.status(500).json({ "Erro": 'Falha na requisição' });
    }
}

const uploadImagem = async(req, res) => {
    const novoPost = { 
        descricao: '',
        imgUrl: req.file.originalname,
        alt: ''
    }

    try {
        const postCriado = await createPost(novoPost);
        const imgAtualizada = `uploads/${postCriado.insertedId}.jpg`;
        fs.renameSync(req.file.path, imgAtualizada);
        res.status(200).json(postCriado);
    } catch (err){
        console.error(err.message);
        res.status(500).json({ "Erro": 'Falha na requisição' });
    }
}

const atualizarNovoPost = async(req, res) => {
    const id = req.params.id;
    const imgUrl = `http://localhost:3000/${id}.jpg`
    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.jpg`);
        const descricao = await gerarDescricaoComGemini(imgBuffer);

        const post = {
            descricao: descricao,
            imgUrl: imgUrl,
            alt: req.body.alt
        }

        const postCriado = await updatePost(id, post);
        res.status(200).json(postCriado);
    } catch (err){
        console.error(err.message);
        res.status(500).json({ "Erro": 'Falha na requisição' });
    }
}

export { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost }