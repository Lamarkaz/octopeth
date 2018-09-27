import imageType from 'image-type'

var dApp = async function (dapp) {
  return logo(dapp.logo)
}

var logo = function (location) {
  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest()
    // TODO: Check if logo is URL
    xhr.open('GET', decodeURIComponent(location))
    xhr.responseType = 'arraybuffer'
    xhr.onload = () => {
      var res = xhr.response
      var imgType = imageType(new Uint8Array(res))
      if (imgType !== null) {
        var img = {
          type: imgType,
          buffer: new Uint8Array(res).reduce((data, byte) => data + String.fromCharCode(byte), '')
        }
        resolve(img)
      } else {
        reject(new Error('invalid logo'))
      }
    }
    xhr.send()
  })
}

export default dApp
