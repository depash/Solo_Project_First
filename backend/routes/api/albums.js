const express = require('express')
const asyncHandler = require('express-async-handler');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Album } = require("../../db/models")
const { db } = require('../../config');
const router = express.Router();

router.post("/", asyncHandler(async (req, res) => {
    const { albumInfo } = req.body
    const makeAlbum = await Album.create(albumInfo)
    return res.json(makeAlbum);
}))

module.exports = router;
