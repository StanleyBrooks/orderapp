const Order = require('../models/order');


///////////////////////
// Seed the database //
///////////////////////

function seedOrders(req, res) {
  // Create default orders
  const orders = [
    { storeLocation: 'Floyd St.', storeOrder: '10 Muffins' },
    { storeLocation: 'Market St.', storeOrder: '15 lbs Coffee' },
    { storeLocation: 'Frankfort Ave', storeOrder: '10 gallons of milk' }
  ];

  // Use the Order model to insert/save
  Order.remove({}, () => {
    for (order of orders) {
      var newOrder = new Order(order);
      newOrder.save();
    }
  });

  res.send('Database seeded!');
}


////////////
// CREATE //
////////////

// Show the create form
function showCreate(req, res) {
  res.render('pages/create', {
    errors: req.flash('errors')
  });
}


// Process the creation form
function processCreate(req, res) {
  // Make sure the forms are not empty
  req.checkBody('storeLocation', 'Store Location is required.').notEmpty();
  req.checkBody('storeOrder', 'Order is required.').notEmpty();

  // If there are errors, redirect and save errors to flash
  const errors = req.validationErrors();
  if (errors) {
    req.flash('errors', errors.map(err => err.msg));
    return res.redirect('/orders/create');
  }

  // Create a new order
  const order = new Order({
    storeLocation: req.body.storeLocation,
    storeOrder: req.body.storeOrder
  });

  // Save order
  order.save((err) => {
    if (err)
      throw err;

    // Set a successful flash message
    req.flash('success', 'Successfuly created order!');

    // Redirect to the newly created order
    res.redirect(`/orders/${order.slug}`);
  });
}


//////////
// READ //
//////////

// Show a single order
function showSingle(req, res) {
  // Get a single order
  Order.findOne({ slug: req.params.slug }, (err, order) => {
    if (err) {
      res.status(404);
      res.send('Order not found!');
    }
    res.render('pages/single', { 
      order: order,
      success: req.flash('success')
    });
  });
}


////////////
// UPDATE //
////////////

// Show the edit form
function showEdit(req, res) {
  Order.findOne({ slug: req.params.slug }, (err, order) => {
    res.render('pages/edit', {
      order: order,
      errors: req.flash('errors')
    });
  });
}

// Process the edit form
function processEdit(req, res) {
  // validate information
  req.checkBody('storeLocation', 'Store location is required.').notEmpty();
  req.checkBody('storeOrder', 'Order is required.').notEmpty();

  // If there are errors, redirect and save errors to flash
  const errors = req.validationErrors();
  if (errors) {
    req.flash('errors', errors.map(err => err.msg));
    return res.redirect(`/orders/${req.params.slug}/edit`);
  }

  // Find single order
  Order.findOne({ slug: req.params.slug }, (err, order) => {
    // updating that order
    order.storeLocation = req.body.storeLocation;
    order.storeOrder = req.body.storeOrder;
    order.save((err) => {
      if (err)
        throw err;

      // Success flash message and redirect
      req.flash('success', 'Successfully updated order.');
      res.redirect('/orders');
    });
  });
}


////////////
// Delete //
////////////

function deleteOrder(req, res) {
  Order.remove({ slug: req.params.slug }, (err) => {
    // set flash data
    // redirect back to the orders page
    req.flash('success', 'Order deleted!');
    res.redirect('/orders');
  });
}


//////////
// LIST //
//////////

// Show all orders
function showOrders(req, res) {
  // Get all orders   
  Order.find({}, (err, orders) => {
    if (err) {
      res.status(404);
      res.send('Orders not found!');
    }

    // Return a view with data
    res.render('pages/orders', { 
      orders: orders,
      success: req.flash('success')
    });
  });
}

module.exports = {
  showOrders:    showOrders,
  showSingle:    showSingle,
  seedOrders:    seedOrders,
  showCreate:    showCreate,
  processCreate: processCreate,
  showEdit:      showEdit,
  processEdit:   processEdit,
  deleteOrder:   deleteOrder
}