import Resource from "../models/resource.model.js"


//  GET /api/resources

exports.getAllResources = async (req, res) => {
  try {
    const { type, topic, search, featured, page = 1, limit = 8 } = req.query;
    const filter = { isPublished: true };
 
    if (type)     filter.type  = type;
    if (topic)    filter.topic = topic;
    if (featured) filter.isFeatured = true;
    if (search)   filter.$text = { $search: search };
 
    const total     = await Resource.countDocuments(filter);
    const resources = await Resource.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .select('-body')           // omit full body in list view
      .sort({ isFeatured: -1, createdAt: -1 });
 
    res.json({ success: true, total, page: Number(page), data: resources });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};