const express = require('express');
const router = express.Router();

const {
    newSmember,
    getSmemberByRole,
    getSmemberDetail,
    updateSmember,
    deleteSmember,
    createSmemberReview,
    getSmemberReviews,
    deleteSmemberReview,
    getAllMemberNames,
    getAdminSmember
} = require('../controllers/smemberController');

router.route('/smember/new').post(newSmember);
router.route('/smember/detail/:id').get(getSmemberDetail);
router.route('/smember').get(getSmemberByRole);
router.route('/smember/:id').put(updateSmember);
router.route('/smember/delete/:id').delete(deleteSmember);
router.route('/smember/review/all').put(createSmemberReview);
router.route('/smember/reviews/all').get(getSmemberReviews);
router.route('/smember/reviews/delete/all').delete(deleteSmemberReview);
router.route('/smembers/all/names').get(getAllMemberNames);
router.route('/smembers/admin/all').get( getAdminSmember);

module.exports = router;