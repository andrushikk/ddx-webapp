import express from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { sequelize } from './DB/initsequlize.mjs';

import './DB/sinc.mjs';

const app = express();
const port = 3010;

import cors from 'cors'
app.use(cors());
  
//Swagger
import { swaggerOptions } from './options/swaggerOptions.mjs';
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// Настройка базовой аутентификации
// app.use('/api-docs', basicAuth({
//     users: { 'admin': 'password' }, // Задайте имя пользователя и пароль
//     challenge: true, // Включите режим запроса учетных данных
//     unauthorizedResponse: 'Unauthorized' // Сообщение об ошибке при неудачной аутентификации
// }), swaggerUi.serve, swaggerUi.setup(swaggerDocs));






app.use(express.json());


//api
import apiRoutes from './routes/api.mjs';
app.use(apiRoutes);




//users

import usersADDRoute from './routes/users/add.mjs';
app.use('/api/users', usersADDRoute)


import usersGetRoute from './routes/users/get.mjs';
app.use('/api/users', usersGetRoute)


import categoryADDRoute from './routes/category/add.mjs'
app.use('/api/category', categoryADDRoute)


import categoryGETRoute from './routes/category/get.mjs'
app.use('/api/category', categoryGETRoute)



import ProgramADDRoute from './routes/programs/add.mjs'
app.use('/api/programs', ProgramADDRoute)



if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}

export default app;
