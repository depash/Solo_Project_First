const express = require('express')
const asyncHandler = require('express-async-handler');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Album } = require("../../db/models")
const { db } = require('../../config');
const picture = require('../../db/models/picture');
const router = express.Router();

router.post("/", asyncHandler(async (req, res) => {
    const { picInfo } = req.body
    const makePic = await picture.create(picInfo)
    return res.json(makePic);
}))


module.exports = router;
