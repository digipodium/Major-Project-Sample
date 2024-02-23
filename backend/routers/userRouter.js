const express = require("express");
const Model = require("../models/userModel");
const jwt = require('jsonwebtoken');
const verifyToken = require("./verifyToken");
require('dotenv').config();

const router = express.Router();

router.post("/add", (req, res) => {
  console.log(req.body);

  new Model(req.body)
    .save()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/getall", verifyToken, (req, res) => {
  Model.find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// : denotes url parameter
router.get("/getbyemail/:email", (req, res) => {
  console.log(req.params.email);

  Model.find({ email: req.params.email })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/authenticate", (req, res) => {

  
  Model.findOne(req.body)
  .then((result) => {
      
    if(result){
    
      const payload = { _id : result._id, email : result.email, role : result.role };

      // create token
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {expiresIn: '7 days'},
        (err, token) => {
          if(err) {
            console.log(err);
            res.status(500).json(err);
          }
          else res.status(200).json({token : token});
        }
      )

    }
      
      else res.status(401).json({status : 'failed'});
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/getbyid/:id", (req, res) => {
  Model.findById(req.params.id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/update/:id", (req, res) => {
  Model.findByIdAndUpdate(req.params.id, req.body, { new : true } )
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/delete/:id", (req, res) => {
  Model.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
