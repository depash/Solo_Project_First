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
    const { PicInfo } = req.body
    console.log(PicInfo)
    const makePic = await picture.create(PicInfo)
    return res.json(makePic);
}))

router.delete("/:id", asyncHandler(async (req, res) => {
    const id = req.params.id
    const pic = await picture.findByPk(id)
    await pic.destroy()
    return res.json(pic)
}))

module.exports = router;
