import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

const db = conexao.db("imersao-instabyte");
const colecao = db.collection("posts");

const getAllPosts = async() => colecao.find().toArray();
const createPost = async(novoPost) => colecao.insertOne(novoPost);
const updatePost = async(id, novoPost) => {
  const objId = ObjectId.createFromHexString(id);
  return colecao.updateOne({ _id: new ObjectId(objId) }, { $set: novoPost });
}

// const getPostById = (id) => posts.findIndex(post=> post.id === Number(id));

export { getAllPosts, createPost, updatePost }