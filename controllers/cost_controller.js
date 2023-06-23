const Cost = require('../models/cost');

// POST /addcost
async function addCost(req, res) {
    const { user_id, year, month, day, id, description, category, sum } = req.body;

    // Check if any required field is missing
    if (!user_id || !year || !month || !day || !description || !category || !sum) {
        return res.status(400).send('Missing required fields');
    }

    // Add validation logic for category
    const categories = ['Food', 'Health', 'Housing', 'Sport', 'Education', 'Transportation', 'Other', 'Groceries'];
    if (!categories.includes(category)) {
        return res.status(400).send('Invalid category');
    }

    try {
        let cost = new Cost(req.body);
        cost = await cost.save();
        res.send(cost);
    } catch (error) {
        console.error('Error adding cost:', error);
        res.status(500).send('Internal Server Error');
    }
}

// GET /report
async function getReport(req, res) {
    const { user_id, year, month } = req.query;

    // Validate user_id
    if (!user_id) {
        return res.status(400).send('Invalid user_id');
    }

    // Validate year
    if (!year) {
        return res.status(400).send('Invalid year');
    }

    // Validate month
    if (!month || month < 1 || month > 12) {
        return res.status(400).send('Invalid month');
    }

    try {
        const costs = await Cost.find({ user_id: user_id.toString(), year, month });
        const categories = ['Food', 'Health', 'Housing', 'Sport', 'Education', 'Transportation', 'Other', 'Groceries'];
        const report = {};
        categories.forEach(category => {
            report[category] = costs.filter(cost => cost.category === category);
        });
        res.send(report);
    } catch (error) {
        console.error('Error generating report:', error);
        res.status(500).send('Internal Server Error');
    }
}

// Export the route handlers
module.exports = {
    addCost,
    getReport,
};
