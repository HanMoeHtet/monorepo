import { CreateUserDto, greet } from '@monorepo/common';
import express, { Router } from 'express';
import path from 'path';
import url from 'url';
import { UserService } from './user.service.js';
import cors from 'cors';

greet();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// configure cors
app.use(
  cors({
    origin: ['http://localhost:3000'],
  })
);

const userRouter = Router();

const userService = new UserService();

userRouter.get('/', (req, res) => {
  res.json({
    users: userService.getUsers(),
    message: 'Hello World!',
  });
});

userRouter.post('/', (req, res) => {
  const createUserDto = req.body as CreateUserDto;
  const userId = userService.addUser(createUserDto);
  res.status(201).json({
    message: 'User added successfully.',
    userId,
  });
});

userRouter.get('/:id', (req, res) => {
  const id = Number.parseInt(req.params.id);
  const user = userService.getUser(id);
  if (user) {
    res.json({
      user,
    });
  } else {
    res.status(404).json({
      message: 'User not found.',
    });
  }
});

userRouter.delete('/:id', (req, res) => {
  const id = Number.parseInt(req.params.id);
  userService.deleteUser(id);
  res.status(204).end();
});

app.use('/users', userRouter);

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
app.use('/', express.static(path.resolve(__dirname, '../../web/build')));

app.listen(8000, () => {
  console.log('Listening at http://localhost:8000');
});
