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

//  GET /api/resources/:id  
exports.getResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id)
      .populate('uploadedBy', 'name');
    if (!resource || !resource.isPublished) {
      return res.status(404).json({ success: false, message: 'Resource not found' });
    }
    res.json({ success: true, data: resource });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//  POST /api/resources   (mentor / admin)
exports.createResource = async (req, res) => {
  try {
    // Videos and courses: require externalUrl, no file upload
    if (['video', 'course'].includes(req.body.type) && !req.body.externalUrl) {
      return res.status(400).json({
        success: false,
        message: 'externalUrl is required for video/course resources',
      });
    }
 
    const resource = await Resource.create({
      ...req.body,
      uploadedBy:  req.user._id,
      isPublished: req.user.role === 'admin', // auto-publish if admin; else pending review
    });
    res.status(201).json({ success: true, data: resource });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};