import multer from 'multer';
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from '../controllers/postsController.js';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname);
  }
});

const upload = multer({ dest: "./uploads" , storage});

const routes = (app) => {
  app.get('/posts', listarPosts);
  app.post('/post', postarNovoPost);
  app.post('/upload', upload.single('imagem'), uploadImagem);
  app.put('/upload/:id', atualizarNovoPost);
}

// app.get('/posts/:id', (req, res) => {
//     const index = getPostById(req.params.id);
//     res.status(200).json(posts[index]);
// });

export default routes