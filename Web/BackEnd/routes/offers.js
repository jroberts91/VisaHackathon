const express = require('express');
const router = express.Router();
const { RetrieveAllOffers } = require("../external/vmorc");

//=================================
//             Offers
//=================================

// current implementation only gets all offers with no filter
//?max=int
router.get("/list", async (req, res) => {
    let max = req.query.max;
    var data = await RetrieveAllOffers(max);
    return res.status(200).json(data);
});

module.exports = router;