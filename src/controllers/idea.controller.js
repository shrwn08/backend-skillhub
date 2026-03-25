import Idea from "../models/idea.model.js"

//GET /api/ideas => Query: ?category=food&search=bakery&page=1&limit=9

exports.getAllIdeas = async (req, res) => {
  try {
    const { category, search, page = 1, limit = 9 } = req.query;
    const filter = { isActive: true };
 
    if (category) filter.category = category;
    if (search)   filter.$text = { $search: search };
 
    const total = await Idea.countDocuments(filter);
    const ideas = await Idea.find(filter)
      .select('-roadmapSteps')         // omit steps in list view
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });
 
    res.json({
      success: true,
      total,
      page:  Number(page),
      pages: Math.ceil(total / limit),
      data:  ideas,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};