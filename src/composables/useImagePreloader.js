export function preloadImages(urls = []) {
  urls.slice(0, 12).forEach((src) => {
    const img = new Image()
    img.src = src
  })
}
