var express = require('express');
var router = express.Router();

var commonApiController= require('../controller/commonApiController');
var userApiController= require('../controller/consumerApiController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - finished
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The title of your book
 *         author:
 *           type: string
 *           description: The book author
 *         finished:
 *           type: boolean
 *           description: Whether you have finished reading the book
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the book was added
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
 *         finished: false
 *         createdAt: 2020-03-10T04:05:06.157Z
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     details:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The title of your book
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 */

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: The books managing API
 * /api/consumer/books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       500:
 *         description: Some server error
 *
 */

/**
 * @swagger
 * tags:
 *   name: Details
 *   description: The books managing API
 * /api/consumer/details:
 *   post:
 *     summary: Create a new book
 *     tags: [Details]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/details'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/details'
 *       500:
 *         description: Some server error
 *
 */
router.post('/books',commonApiController.Signup);

router.post('/details',commonApiController.details);





module.exports = router;