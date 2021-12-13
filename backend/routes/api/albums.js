const express = require('express')
const asyncHandler = require('express-async-handler');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Album } = require("../../db/models")
const { db } = require('../../config');
const { picture } = require('../../db/models');
const router = express.Router();

const validateAlbums = [
    check('title')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.')
        .isLength({ max: 10 })
        .withMessage("The title must be less then 10 characters"),
    check('description')
        .exists({ checkFalsy: true }),
    handleValidationErrors
];

router.post("/", validateAlbums, asyncHandler(async (req, res) => {
    const { title, description, userId } = req.body;
    const makeAlbum = await Album.create({
        title,
        description,
        userId
    })
    return res.json(makeAlbum);
}))

router.get("/:id/pics", asyncHandler(async (req, res) => {
    const albumId = req.params.id
    const pics = await picture.findAll({
        where: {
            albumId: albumId
        }
    })

    return res.json(pics)
}))

router.get("/:username", asyncHandler(async (req, res) => {
    const username = req.params.username
    const users = await User.findOne({
        where: {
            username
        }
    })
    const albums = await Album.findAll({
        where: {
            userId: users.id
        }
    })
    return res.json(albums)
}))

router.delete("/:id", asyncHandler(async (req, res) => {
    const id = req.params.id
    const album = await Album.findByPk(id)
    await album.destroy()
    return res.json(album)
}))

router.put("/:id", validateAlbums, asyncHandler(async (req, res) => {
    const id = req.params.id
    const { title, description, userId } = req.body;
    const album = await Album.findByPk(id)
    await album.update({
        title,
        description,
        userId
    })
    return res.json(album)
}))

module.exports = router;
