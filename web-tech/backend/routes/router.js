const express = require("express");

const controllers = require("../controllers/logincontrol")

const authcontrollers = require("../controllers/authcontrol")

const { verify } = require("../auth/auth.js");


const router = express.Router();


router.get('/api/', controllers.index);
router.post('/api/login', controllers.loginpost);

router.post("/api/signup", controllers.signuppost);

router.post("/api/reset", controllers.resetpassword);

router.get("/api/auth/dashboard", verify, authcontrollers.dashboard);

router.get("/api/auth/about", verify, authcontrollers.about);

router.get("/api/auth/grades", verify, authcontrollers.grades);

router.get("/api/auth/Examinations", verify, authcontrollers.Examinations);

router.get("/api/auth/hostel", verify, authcontrollers.hostel);

router.get("/api/auth/student_life", verify, authcontrollers.student_life);

router.get("/api/auth/Academics", verify, authcontrollers.Academics);

router.get("/api/auth/Finance", verify, authcontrollers.finance);


router.get("/api/auth/contact", verify, authcontrollers.contact);

router.post("/api/auth/update", verify, authcontrollers.update);

router.get("/api/auth/updatepass", verify, authcontrollers.updatepass);;



module.exports = router;