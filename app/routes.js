// create a new express router
const express          = require('express');
const mainController   = require('./controllers/main.controller');
const ordersController = require('./controllers/orders.controller');
const router           = express.Router();


/////////////////
// Main routes //
/////////////////
router.get('/', mainController.showHome);

//////////////////
// Order routes //
//////////////////
router.get('/orders', ordersController.showOrders);

/////////////////
// Seed orders //
/////////////////
router.get('/orders/seed', ordersController.seedOrders);

///////////////////
// Create orders //
///////////////////
// Creation is limited to one per storeLocation (only exact matches for now), 
// this is a feature & not a bug.  It is ment to keep each store order together
// & will be expanded upon in the next version. (it is also why the url is 
// turned into a slug based on storeLocation instead of _id)
router.get('/orders/create', ordersController.showCreate);
router.post('/orders/create', ordersController.processCreate);

/////////////////
// Edit orders //
/////////////////
router.get('/orders/:slug/edit', ordersController.showEdit);
router.post('/orders/:slug', ordersController.processEdit);

///////////////////
// Delete orders //
///////////////////
router.get('/orders/:slug/delete', ordersController.deleteOrder);

/////////////////////////
// Show a single order //
/////////////////////////
router.get('/orders/:slug', ordersController.showSingle);

///////////////////
// Export router //
///////////////////
module.exports = router;