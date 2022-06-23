// require Flick search API
const apiSearch = require('../api/search')

// search request logic
const search = async ({ params }, res, next) => {
  try {
    // destructuring "photos" from search API response
    const { photos } = await apiSearch(params)
    // destructuring "page", "pages" (total pages), "perpage" (per page images),
    // total (total of the images), and photo (photos list) from search API response
    const { page, pages, perpage, total, photo } = photos
    // maping list images from "photo" array
    const images = photo.map(image => {
      // destructuring "title", "owner", "farm", "server", "id", "secret" keys from each image
      const { title, owner, farm, server, id, secret } = image
      // return each title, owner (author) id, and the image url
      return {
        title,
        owner,
        image: `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`
      }
    })
    // send list images result and some data
    res.status(200).json({
      total,
      perpage,
      page,
      pages,
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
module.exports = search
