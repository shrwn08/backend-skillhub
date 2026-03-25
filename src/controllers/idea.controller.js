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

//GET /api/ideas/recommended => Returns ideas whose skillTags overlap user's skills/interests

exports.getRecommended = async (req, res) => {
  try {
    const userTags = [...(req.user.skills || []), ...(req.user.interests || [])]
      .map((t) => t.toLowerCase());
 
    if (!userTags.length) {
      // fallback: return latest ideas
      const ideas = await Idea.find({ isActive: true }).limit(6).select('-roadmapSteps');
      return res.json({ success: true, data: ideas });
    }
 
    // ideas that share at least one tag
    const ideas = await Idea.find({
      isActive: true,
      skillTags: { $in: userTags.map((t) => new RegExp(t, 'i')) },
    })
      .select('-roadmapSteps')
      .limit(9);
 
    res.json({ success: true, data: ideas });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//GET /api/ideas/:id

exports.getIdea = async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    if (!idea || !idea.isActive) {
      return res.status(404).json({ success: false, message: 'Idea not found' });
    }
    res.json({ success: true, data: idea });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//  POST /api/ideas   (admin only)

exports.createIdea = async (req, res) => {
  try {
    const idea = await Idea.create({ ...req.body, createdBy: req.user._id });
    res.status(201).json({ success: true, data: idea });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

//  PUT /api/ideas/:id   (admin only)
exports.updateIdea = async (req, res) => {
  try {
    const idea = await Idea.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true,
    });
    if (!idea) return res.status(404).json({ success: false, message: 'Idea not found' });
    res.json({ success: true, data: idea });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

//  DELETE /api/ideas/:id   (admin only)
exports.deleteIdea = async (req, res) => {
  try {
    await Idea.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ success: true, message: 'Idea deactivated' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};