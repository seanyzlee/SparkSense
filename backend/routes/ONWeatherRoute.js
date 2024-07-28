const express = require("express")
const { Create, Read, ReadAIPrompt, PostONInfo, GetTwillioConditions } = require("../controllers/ONWeatherInfo")
const router = express.Router()

router.route("/on").post(Create)
router.route("/on").get(Read)
router.route("/on/ai").get(ReadAIPrompt)
router.route("/on/post").post(PostONInfo)
router.route("/on/twillio").get(GetTwillioConditions)



module.exports = router