const Smember = require('../models/smember');
const Movie = require('../models/movie');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');
const swearjar = require('swearjar');
const cloudinary = require('cloudinary');

// Create new Person => /api/v1/persons/new
exports.newSmember = catchAsyncErrors(async (req,res,next) => {
    let images = []

    typeof req.body.images === 'string' ? 
    images.push(req.body.images) : 
    images = req.body.images

    let imageLinks = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder : 'avatar'
        })

        imageLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }

    req.body.avatar = imageLinks

    const smember = await Smember.create({
        name: req.body.name,
        role: req.body.role,
        bio: req.body.bio,
        avatar: req.body.avatar
    })

    res.status(201).json({
        success:true,
        smember,
        message:`${smember.role} has been created`
    })
})

// Get person details => /api/v1/persons/:id?role=<role>
exports.getSmemberDetail = catchAsyncErrors(async (req,res,next) => {
    // console.log(req.params.id);
    const smember = await Smember.findById(req.params.id);
    const movie = await Movie.find();
    const moviesprod = [];
    const moviesact = [];

    movie.map(movies => {
        if (movies.producers === smember.name){
            moviesprod.push(movies.title);
        }
        else(
            console.log("y")
        )

        movies.actors.map(movieact => {
            if(movieact.name === smember.name){
                console.log(movies.title);
                moviesact.push(movies.title);
            }
        })
        
    })
    
    // console.log(smember);
    // console.log(smember.reviews);
    // console.log(smember.avatar);

    // console.log("foo");

    if(!smember) {return next(new ErrorHandler(`${req.query.role} not found`, 404))}
    // else {console.log("foo")}

    res.status(200).json({
        success:true,
        name:smember.name,
        bio:smember.bio,
        ratings:smember.ratings,
        role:smember.role,
        avatar:smember.avatar,
        reviews:smember.reviews,
        id:smember._id,
        moviesprod:moviesprod,
        moviesact:moviesact
    })
})

// Get all person via role => /api/v1/persons?role=<role>
exports.getSmemberByRole = catchAsyncErrors(async (req,res,next) => {
    const resPerPage = 4;
    
    const apiFeatures = new APIFeatures(Smember.find(), req.query)
        .search()
        .filter()
    
    let smembers = await apiFeatures.query;
    let personsCount = smembers.length;
    // apiFeatures.pagination(resPerPage);
    smembers = await apiFeatures.query;

    res.status(200).json({
        sucess:true,
        personsCount,
        // resPerPage,
        smembers
    })
})

// Update person profile => /api/v1/persons/:id
exports.updateSmember = catchAsyncErrors(async (req,res,next) => {
    console.log(req.params.id);
    let smember = await Smember.findById(req.params.id);

    if(!smember) return next(new ErrorHandler('Not found', 404));

    let images = []
    typeof req.body.avatar === 'string' ?
    images.push(req.body.avatar) :
    images = req.body.avatar

    if(images !== undefined) {
        // Delete the images of this smember
        for (let i = 0; i < smember.avatar.length; i++) {
            const result = await cloudinary.v2.uploader.destroy(smember.avatar[i].public_id)
        }

        // New images/poster of this smember
        let imageLinks = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i],{
                folder : 'avatars'
            });

            imageLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }

        // Don't be confused images are just temp array inside this function
        // avatar is the body name/ key that will be used
        req.body.avatar = imageLinks
    }

    // Update now based on id and the data is the body {} passed on request
    smember = await Smember.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    console.log(smember);
    res.status(200).json({
        success:true,
        smember
    })
})

// Delete person => /api/v1/persons/:id
exports.deleteSmember = catchAsyncErrors(async (req,res,next) => {
    var smember = await Smember.findById(req.params.id);

    if(!smember) return next(new ErrorHandler('Not found', 404));

    // Delete images 
    for(let i = 0; i < smember.avatar.length; i++) {
        const result = await cloudinary.v2.uploader.destroy(smember.avatar[i].public_id)
    }

    await smember.remove();

    smember = await Smember.find();
    
    res.status(200).json({
        success:true,
        smember,
        message: 'Deleted successfully.'
    })
})

// Create a new review => /api/v1/persons/review
exports.createSmemberReview = catchAsyncErrors(async (req,res,next) => {
    const { rating, comment, smemberId, user } = req.body;
    
    const review = {
        user : user._id,
        name: user.name,
        rating: Number(rating),
        comment: swearjar.censor(comment)
    }

    const smember = await Smember.findById(smemberId);
    console.log(smember);
    // console.log(smember.reviews);
    // console.log(smember._id);
    // Find will look through the array and check if user id exist
    const isReviewed = smember.reviews.find(
        r => r.user.toString() === user._id.toString()
    )

    if(isReviewed){
        smember.reviews.forEach(review => {
            if(review.user.toString() === user._id.toString()) {
                review.comment = swearjar.censor(comment);
                review.rating = rating;
            }
        })
    } else {
        smember.reviews.push(review);
        smember.numOfReviews = smember.reviews.length
    }

    // get average for smember ratings
    smember.ratings = smember.reviews.reduce((acc,item) => item.rating + acc, 0) / smember.reviews.length

    await smember.save({validateBeforeSave : false});

    res.status(200).json({
        success:true,
        reviews:smember.reviews,
        id:smember._id,
        message:'Action Succeeded.'
    })
})

// Get person reviews => /api/v1/persons/reviews?id=<personID>
exports.getSmemberReviews = catchAsyncErrors(async (req,res,next) => {
    const smember = await Smember.findById(req.query.id);
    
    res.status(200).json({
        success: true,
        reviews: smember.reviews
    })
})

// Delete person review => /api/v1/persons/reviews?id=<reviewID>&personId=<personId>
exports.deleteSmemberReview = catchAsyncErrors(async (req,res,next) => {
    const smember = await Smember.findById(req.query.smemberId);
    // New reviews array filtered without the selected id that you want to delete
    const reviews = smember.reviews.filter(review => review._id.toString() !== req.query.id.toString());
    console.log(reviews);
    // Calculate new smember ratings
    const ratings = smember.reviews.reduce((acc,item) => item.rating + acc, 0) / smember.reviews.length

    await Smember.findByIdAndUpdate(req.query.smemberId, {
        reviews,
        ratings
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        message:'Successfully deleted.'
    })
})


//get all members for search function => /api/v1/members/all/names
exports.getAllMemberNames = catchAsyncErrors(async (req,res,next) => {
    // const names = await Member.distinct('name');
    const names = await Smember.find().where('role', req.query.role).distinct('name')


    res.status(200).json({
        success:true,
        message:'All members in the Data.',
        names

    })
})

exports.getAdminSmember = catchAsyncErrors(async (req, res, next) => {

    const smembers = await Smember.find();

    res.status(200).json({
        success: true,
        smembers
    })

})
