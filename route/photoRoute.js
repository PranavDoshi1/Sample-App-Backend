let express = require('express');
let router = express.Router();
let bodyParser = require("body-parser");
const photoModel = require('../Models/photoModel');
const commentModel = require('../Models/commentModel');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post("/createPhoto", async(req,res)=>{
    console.log(req.body);
    const {name, url} = req.body;

    try {
        const photo = await photoModel.create({
            name, url
        });
        res.status(200).send({
            photo
        })
        
    } catch (error) {
        console.log(error);

        res.status(500).send({
            error
        });
    }
})

router.get('/getAllPhotos', async(req,res)=>{
    try {
        console.log('entering getAllPhotos');
        const photos = await photoModel.find({});
        let photoArr = [];
        for(let i=0;i<photos.length;i++)
        {
            photoArr.push({value:photos[i]._id, label: photos[i].name});
        }
        res.status(200).send({photoArr});
    } catch (error) {
        console.log(error);
        res.status(500).send({error});
    }
})

router.post('/createComment',async(req,res)=>{
    const { photoId, cordX, cordY, comment} = req.body;

    try {
        let photo = await commentModel.findOne({photoId, cordX, cordY});

        if(photo==null)
        {
            await commentModel.create({photoId, cordX, cordY, comments:[comment]});
        }
        else
        {
            await commentModel.updateOne({
                photoId, cordX, cordY},
                {$push:{comments: comment}});
        }
        res.status(200).send({
            status:'success'
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({error});
    }
})

router.get('/getComments/:_id',async(req,res)=>{
    const { _id} = req.params;
    console.log(_id);
    try {
        const imageDetails = await photoModel.findOne({_id})
        const commentDetails = await commentModel.find({photoId:_id})
        res.status(200).send({
            imageDetails,
            commentDetails
        })
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

module.exports = router;