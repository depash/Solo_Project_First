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

router.post("/", asyncHandler(async (req, res) => {
    const { albumInfo } = req.body
    const makeAlbum = await Album.create(albumInfo)
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

router.put("/:id", asyncHandler(async (req, res) => {
    const id = req.params.id
    const { albumInfo } = req.body;
    const album = await Album.findByPk(id)
    await album.update(albumInfo)
    return res.json(album)
}))

module.exports = router;
