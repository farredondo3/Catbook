const Cat = require('../models/catModel')

const multer = require('multer')

// multer config for image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

const getAllCats = async (req, res) => {
    try {
        const cats = await Cat.find()
        res.render('home', { cats: cats })
    } catch (error) {
        console.log(error)
    }
}

const uploadPage = (req, res) => {
    res.render('upload')
}

const createCat = async (req, res) => {
    try {
        const cat = new Cat({

            name: req.body.name,
            age: req.body.age,
            favoriteFood: req.body.favoriteFood,
            funFact: req.body.funFact,
            image: req.file.filename
        })

        await cat.save()
        res.redirect('/')

    } catch (error) {

        console.log(error)

    }
}

const editPage = async (req, res) => {
    try {
        const cat = await Cat.findById(req.params.id)
        res.render('edit', { cat: cat })
    } catch (error) {
        console.log(error)
    }
}

const updateCat = async (req, res) => {
    try {
        await Cat.findByIdAndUpdate(req.params.id, req.body)
        res.redirect('/')
    } catch (error) {
        console.log(error)
    }
}

const deleteCat = async (req, res) => {
    try {
        await Cat.findByIdAndRemove(req.params.id)
        res.redirect('/')
    } catch (error) {
        console.log(error)

    }
}


module.exports = {
    getAllCats,
    upload,
    uploadPage,
    createCat,
    editPage,
    updateCat,
    deleteCat

}