import FileSaver from 'file-saver'

var identity = function () {
  var identity = this.$store.state.auth.user
  delete identity.interval
  delete identity.balance
  var blob = new Blob([JSON.stringify(identity)], {type: 'text/plain;charset=utf-8'})
  FileSaver.saveAs(blob, 'identity.json')
  // FileSaver doesn't support abortion detection (https://github.com/eligrey/FileSaver.js/issues/126)
  // File API will be considered in the upcoming releases
}

export default identity
