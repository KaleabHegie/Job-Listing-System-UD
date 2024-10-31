const express = require('express')
const router = express.Router()
const {getAllUsers , updateUser , deleteUser , getSingleUser } = require('../controllers/adminController')
const { validateAdmin } = require('../middleware/validateTokenHandler')
const {getApplication , getAllApplication } = require('../controllers/adminController')



router.route('/get_all_users').get(validateAdmin , getAllUsers)
router.route('/get_single_user/:id').get(validateAdmin , getSingleUser)
router.route('/update_user/:id').put(validateAdmin , updateUser)
router.route('/delete_user/:id').delete(validateAdmin, deleteUser)


router.route('/get_all_application').get(validateAdmin , getAllApplication)
router.route('/get_single_application/:id').get(validateAdmin , getApplication)




module.exports = router