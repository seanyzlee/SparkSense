const express = require("express")
const { Create, Read, ReadAIPrompt, PostABInfo } = require("../controllers/ABWeatherInfo")
const router = express.Router()

router.route("/ab").post(Create)
router.route("/ab").get(Read)
router.route("/ab/ai").get(ReadAIPrompt)
router.route("/ab/post").post(PostABInfo)


module.exports = router