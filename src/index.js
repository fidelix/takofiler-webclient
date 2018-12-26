// Import the plugins
const Uppy = require('@uppy/core')
const Dashboard = require('@uppy/dashboard')
const GoogleDrive = require('@uppy/google-drive')
const Webcam = require('@uppy/webcam')
const Tus = require('@uppy/tus')
const XHRUpload = require('@uppy/xhr-upload')

require('./app.css');

const uppy = Uppy({
  debug: true,
  autoProceed: false,
})
  .use(Dashboard, {
    trigger: '.UppyModalOpenerBtn',
    inline: true,
    target: '.DashboardContainer',
    replaceTargetContent: true,
    showProgressDetails: true,
    note: 'Images and video only, 2–3 files, up to 1 MB',
  height: 470,
  metaFields: [
    { id: 'name', name: 'Name', placeholder: 'file name' },
    { id: 'caption', name: 'Caption', placeholder: 'describe what the image is about' }
  ],
  browserBackButtonClose: true
  })
  .use(XHRUpload, { target: Dashboard, endpoint: 'https://api2.transloadit.com' })
.use(GoogleDrive, { target: Dashboard, serverUrl: 'https://companion.uppy.io' })
.use(Webcam, { target: Dashboard })
//.use(Tus, { target: Dashboard, endpoint: 'http://takofiler.l/tus/' })
.use(Tus, { target: Dashboard, endpoint: 'https://master.tus.io/files/' })


uppy.on('complete', result => {
  console.log('successful files:', result.successful)
  console.log('failed files:', result.failed)
})
