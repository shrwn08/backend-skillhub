import Bookmark from "../models/bookmark.model.js"


// ── GET /api/bookmarks   (protected)
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