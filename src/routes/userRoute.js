import express from 'express';
import userController from '../controllers/userController.js';

const route = express.Router();

route.post('/add', userController.create);
route.get('/read', userController.getUserById);
route.get('/search', userController.searchUser);
route.get('/locate', userController.searchUserNearlocateUserId);
route.put('/edit/:id', userController.editUser);
route.delete('/delete/:id', userController.deleteUser);
export default route;
