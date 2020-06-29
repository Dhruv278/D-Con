const express=require('express');
const router=express.Router();
const profieHandler=require('../controller/profile');
const authentication=require('../controller/authentication');
router.get('/all',profieHandler.getAllProfiles)
router.get('/profile/:id',profieHandler.getuserProfile)
router.use(authentication.checktoken)
router.post('/createProfile',profieHandler.createProfile)
router.get('/myprofile',profieHandler.getProfile);
router.post('/myExperience',profieHandler.createExperience);
router.post('/myEducation',profieHandler.createEducation);

router.delete('/deleteExperience/:id',profieHandler.deleteExp);
router.delete('/deleteEducation/:id',profieHandler.deleteEdu);
router.delete('/deleteProfile',profieHandler.deleteProfile);
router.delete('/deleteAccount',profieHandler.deleteAccount);
module.exports=router;