import Datastore from 'nedb'
import path from 'path'
import { remote } from 'electron'

var db = new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath('userData'), '/data.db')
})

db.insertdApp = function (dapp, img) {
  var self = this
  return new Promise(function (resolve, reject) {
    self.findOne({id: dapp.id}, function (err, doc) {
      if (!err) {
        if (doc === null) {
          // console.log(values)
          // console.log('title: ' + values.title, 'url: ' + values.url, 'contact: ' + values.contact, 'cat: ' + values.cat, 'owner: ' + values.owner, 'desc: ' + values.desc, 'logo: ' + values.logo)
          // TODO: Check approval event by the Octopeth owner before inserting
          // TODO Check image dimensions before inserting
          // TODO: Consider implementing OOP for image validation
          // TODO: Set a download file size limit to prevent use of excessively large files
          self.insert({
            type: 'app',
            data: {
              id: dapp.id,
              title: decodeURIComponent(dapp.title),
              url: decodeURIComponent(dapp.url),
              contact: decodeURIComponent(dapp.contact),
              cat: dapp.cat,
              owner: dapp.owner,
              desc: decodeURIComponent(dapp.desc),
              approved: dapp.approved,
              logo: img,
              installed: false // What if it is installed?
            }
          }, function (err) {
            if (!err) {
              resolve()
            } else {
              reject(new Error('Error inserting to DB: ' + dapp.title))
            }
          })
        } else {
          // What if app already exists in explore or inventory?
          // What if app already exists but remote logo file was changed?
          // What if app already was added in an earlier event and was updated in this event?
        }
      } else {
        reject(new Error('Error finding app in DB: ' + dapp.title))
      }
    })
  })
}

export default db
