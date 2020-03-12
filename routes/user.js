const express = require('express');
const userRouter = express.Router();

module.exports = userRouter;

userRouter.get('/', (req, res) => {});

userRouter.get('/:id', (req, res) => {});

userRouter.post('/', (req, res) => {});

userRouter.put('/:id', (req, res) => {});

userRouter.delete('/users/:id', (req, res) => {});
