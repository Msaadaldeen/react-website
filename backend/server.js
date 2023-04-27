import express from 'express';
import chalk from 'chalk';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './routes/users.js';
import coursesRoute from './routes/courses.js';
import postsRoute from './routes/posts.js';
import categoriesRoute from './routes/categories.js';
import rolesRoute from './routes/roles.js';
import authRoute from './routes/auth.js';
import passwordForgotRoute from './routes/passwordForgot.js';
import passwordResetRoute from './routes/passwordReset.js';
import multer from 'multer';

const app = express();

const PORT = 5000;
const HOST = '127.0.0.1'; //'127.0.0.1' 'localhost'
const BASE_URL = `http://${HOST}:${PORT}`;
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};

//Milddleware
dotenv.config();
app.use(express.json());
app.use(express.static('public'));
app.use(cors(corsOptions));

// MongoDB
mongoose.set('strictQuery', true);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(chalk.green('Connected to MongoDB')));

// Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/upload/images');
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post('/uploads', upload.single('file'), (req, res) => {
  res.status(200).json('File has been uploaded');
});

// Routes
app.use('/api', coursesRoute);
app.use('/api', postsRoute);
app.use('/api', userRoute);
app.use('/api', categoriesRoute);
app.use('/api', rolesRoute);

app.use('/api/password-forgot', passwordForgotRoute);
app.use('/api/reset-password', passwordResetRoute);

// Authentication
app.use('/auth', authRoute);

app.get('/hello/:name', (req, res) => {
  const name = req.params.name;
  res.send(`Hey ${name}`);
});

app.listen(PORT, HOST, () => {
  console.log(chalk.greenBright(`Server is running on ${BASE_URL}`));
});

console.log(chalk.green('Starting app in dev mode...'));
