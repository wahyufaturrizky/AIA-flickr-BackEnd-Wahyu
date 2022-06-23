// require Flick feed API
const apiFeed = require('../api/feed')

// feed ( home ) request logic
const feed = async (req, res, next) => {
  try {
    // destructuring "items" from feed API response
    const { items } = await apiFeed()
    // maping list images from "items" array
    const images = items.map(item => {
      // destructuring "title", "author_id", and "media.m" (image url) keys from each item
      const { title, author_id, media } = item
      // return each title, owner (author) id, and the image url
      return {
        title,
        owner: author_id,
        image: media.m
      }
    })
    // send list images result
    res.status(200).json({
      images
    })
  } catch (e) {
    // catch an error
    res.json({ err: e.toString() })
    // callback next logic
    next()
  }
}

// export this module
module.exports = feed
