const router = require("express").Router();
const multer = require("multer");

const Furniture = require("../models/Furniture");
const User = require("../models/User")


/* Configuration Multer for File Upload */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/"); // Store uploaded files in the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name
  },
});

const upload = multer({ storage });

/* CREATE LISTING */
router.post("/create", upload.array("listingPhotos"), async (req, res) => {
  try {
    /* Take the information from the form */
    const {
      name,
      category,
      description,
      price,
      availability,
      // imageUrl
    } = req.body;

    // const listingPhotos = req.files

    // if (!listingPhotos) {
    //   return res.status(400).send("No file uploaded.")
    // }

    // const listingPhotoPaths = listingPhotos.map((file) => file.path)

    const newFurniture = new Furniture({
      name,
      category,
      description,
      price,
      availability,
      // imageUrl
    
    })

    await newFurniture.save()

    res.status(200).json(newFurniture)
  } catch (err) {
    res.status(409).json({ message: "Fail to create Furniture", error: err.message })
    console.log(err)
  }
});

/* GET lISTINGS BY CATEGORY */
router.get("/", async (req, res) => {
  const qCategory = req.query.category
  console.log("qCategory")
  try {
    let listings
    if (qCategory) {
      listings = await Furniture.find({ category: qCategory })
    } else {
  console.log(qCategory)
      
      listings = await Furniture.find()
    }

    res.status(200).json(listings)
  } catch (err) {
    res.status(404).json({ message: "Fail to fetch listings", error: err.message })
    console.log(err)
  }
})

/* GET LISTINGS BY SEARCH */
router.get("/search/:search", async (req, res) => {
  const { search } = req.params

  try {
    let listings = []

    if (search === "all") {
      listings = await Furniture.find()
    } else {
      listings = await Furniture.find({
        $or: [
          { category: {$regex: search, $options: "i" } },
          { name: {$regex: search, $options: "i" } },
        ]
      })
    }

    res.status(200).json(listings)
  } catch (err) {
    res.status(404).json({ message: "Fail to fetch listings", error: err.message })
    console.log(err)
  }
})

/* LISTING DETAILS */
router.get("/:listingId", async (req, res) => {
  try {
    const { listingId } = req.params
    const listing = await Furniture.findById(listingId)
    res.status(202).json(listing)
  } catch (err) {
    res.status(404).json({ message: "Furniture can not found!", error: err.message })
  }
})

module.exports = router
