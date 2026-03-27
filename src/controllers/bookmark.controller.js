import Bookmark from "../models/bookmark.model.js"


//  GET /api/bookmarks   (protected)
exports.getBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ user: req.user._id })
      .populate('idea', 'title emoji category description minCost maxCost currency skillTags')
      .sort({ createdAt: -1 });
    res.json({ success: true, data: bookmarks });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//  POST /api/bookmarks   (protected)  body: { ideaId }
exports.addBookmark = async (req, res) => {
  try {
    const { ideaId } = req.body;
    const bookmark = await Bookmark.create({ user: req.user._id, idea: ideaId });
    await bookmark.populate('idea', 'title emoji category');
    res.status(201).json({ success: true, data: bookmark });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ success: false, message: 'Already bookmarked' });
    }
    res.status(500).json({ success: false, message: err.message });
  }
};