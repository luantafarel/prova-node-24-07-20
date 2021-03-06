const express = require('express')
let router = express.Router()

const authController = require('./controller')
const validation = require('../../../middlewares/validation')

/**
 * @swagger
 *
 * definitions:
 *   LoginUser:
 *     type: object
 *     required:
 *       email
 *       password
 *     properties:
 *       email:
 *         type: string
 *         format: email
 *       password:
 *         type: string
 *         minLength: 8
 *         example: testing123
 *   Telefones:
 *     type: object
 *     properties:
 *          ddd:
 *              type: string
 *              lenght: 3
 *          numero:
 *              type: string
 *              maxLenght: 9
 *              minLenght: 8
 *   RegisterUser:
 *     allOf:
 *     -  $ref: "#/definitions/LoginUser"
 *     type: object
 *     required:
 *       name
 *     properties:
 *       name:
 *         type: string
 *         minLength: 3
 *       telefone:
 *         type: array
 *         items:
 *          $ref: "#/definitions/Telefones" 
 */

/**
 *  @swagger
 *  /auth/register:
 *    post:
 *      summary:
 *      - Register a new user
 *      produces:
 *      - application/json
 *      parameters:
 *      - in: "body"
 *        name: "body"
 *        description: "User to be registered"
 *        required: true
 *        schema:
 *          $ref: "#/definitions/RegisterUser"
 *      tags:
 *      - auth
 *      responses:
 *        201:
 *          description: User registered successfully
 *          schema:
 *            type: "object"
 *            properties:
 *              id:
 *                type: string
 *                format: ObjectId
 *        409:
 *          description: E-mail already exists
 *        422:
 *          description: Some required field is missing
 */
router.post(
  '/register',
  validation.validateRegistrationBody(),
  authController.register
)

/**
 *  @swagger
 *  /auth/login:
 *    post:
 *      summary:
 *      - Logs the user in and get an authorization token
 *      produces:
 *      - application/json
 *      parameters:
 *      - in: "body"
 *        name: "body"
 *        description: "User to be logged"
 *        required: true
 *        schema:
 *          $ref: "#/definitions/LoginUser"
 *      tags:
 *      - auth
 *      responses:
 *        200:
 *          description: User logged in successfully
 *          schema:
 *            type: "object"
 *            properties:
 *              msg:
 *                type: string
 *              email:
 *                type: string
 *                format: email
 *              token:
 *                type: string
 *                format: jwt
 *              id:
 *                type: string
 *                format: ObjectId
 *        401:
 *          description: E-mail/password is wrong
 *        422:
 *          description: Some required field is missing
 */
router.post('/login',validation.validateLoginBody(),authController.login)

module.exports = router