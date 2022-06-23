// use axios to fetch API from Flickr
const axios = require('axios')
// get API config
const { URL, KEY, FORMAT } = require('./config')

// Flickr search API use text (keyword), perpage images, and page number parameter
const search = async ({ text, perPage, page }) => {
  try {
    // destructuring "data" from search API response
    const { data } = await axios.get(`${URL}rest/?${FORMAT}&method=flickr.photos.search&${KEY}&text=${text}&per_page=${perPage}&page=${page}`)
    // return normal data in json format
    return JSON.parse(data
      // normalize Flickr API data response
      .replace('jsonFlickrApi', '')
      .replace(/\(/g, '')
      .replace(/\)/g, '')
      .replace(/\n/g, '')
      .replace(/\t/g, '')
    )
  } catch (e) {
    // throw an error
    throw new Error(e)
  }
}

// export Flickr search API
module.exports = search
