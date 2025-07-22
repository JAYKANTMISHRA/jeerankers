const express=require("express");
const { auth } = require("../middleware/auth");
const router = express.Router();
const {getProblem,getProblemById,getProblemByText} = require("../controllers/getProblem");
const {createProblem} = require("../controllers/createProblem");
const {updateProblem} = require("../controllers/updateProblem");
const {markProblem, unmarkProblem, getMarkedProblem, storeSolvedQuestion, getSolvedProblem} = require("../controllers/markProblem");

const {deleteProblem} = require("../controllers/deleteProblem");
const { createContest } = require("../controllers/contestControllers.js/createContest");
const { getContest, getContestById } = require("../controllers/contestControllers.js/getContest");
const {signup, login} = require("../controllers/Auth")
const { getList, getSubmissions } = require("../controllers/Revision.js");
const { getUserData, manageFriend, getFriendList, addFriend, removeFriend, updateUser } = require("../controllers/UserController.js");

// revisin list


router.post("/signup", signup);
router.post("/login", login);

router.get("/getProblem",auth,getProblem);

router.get("/getProblemByText",auth,getProblemByText);

router.get("/getProblem/:id",auth,getProblemById);

router.get("/getMarkedProblem",auth, getMarkedProblem);
router.put("/storeSolvedQuestion",auth,storeSolvedQuestion);
router.get("/getSolvedProblem",auth, getSolvedProblem);
router.put("/markProblem",auth,markProblem);
router.put("/unmarkProblem",auth, unmarkProblem);



// revision routers
router.get("/getList",auth,getList);
router.get("/getSubmissions",auth, getSubmissions);



// users router
router.get("/getUserData",auth, getUserData);
router.put("/manageFriend",auth, manageFriend);
router.put("/addFriend", addFriend);
router.put("/removeFriend", removeFriend);
router.get("/getFriendList", getFriendList);
router.put("/updateUser",auth, updateUser);

router.post("/createProblem",auth,createProblem);
router.put("/updateProblem/:id",updateProblem);
router.delete("/deleteProblem/:id",deleteProblem);
router.post("/createContest",createContest);
router.get("/getContest",auth,getContest);
router.get("/getContest/:id",getContestById);


module.exports = router;
