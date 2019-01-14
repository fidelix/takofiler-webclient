require('@uppy/core/dist/style.css')
require('@uppy/dashboard/dist/style.css')

// Import the plugins
const Uppy = require('@uppy/core')
const Dashboard = require('@uppy/dashboard')
const Tus = require('@uppy/tus')

const uppy = Uppy({
  debug: false,
  autoProceed: false,
  restrictions: {
    maxFileSize: 1073741824, // 1 GB
    //allowedFileTypes: ['video/x-matroska', 'video/mp4', 'video/mkv'],
  },
  locale: {
    strings: {
      exceedsSize: 'Arquivo acima do tamanho máximo!',
      dropPasteImport: 'Drop files here, paste, %{browse} or import from',
      dropPaste: 'Arraste os arquivos aqui, cole ou %{browse}',
      browse: 'selecione',
    }
  }/*,
  onBeforeUpload: (files) => {
    if (Object.keys(files).length < 2) {
      // log to console
      uppy.log(`Aborting upload because only ${Object.keys(files).length} files were selected`)
      // show error message to the user
      uppy.info(`You have to select at least 2 files`, 'error', 500)
      return false
    }
  }*/
})
  .use(Dashboard, {
    trigger: '.UppyModalOpenerBtn',
    inline: true,
    target: '.DashboardContainer',
    replaceTargetContent: true,
    showProgressDetails: true,
    note: 'ATENÇÃO. Não é possível renomear arquivos. Renomeie ANTES de selecionar os arquivos.',
  /*height: 470,
  metaFields: [
    { id: 'name', name: 'Name', placeholder: 'file name' },
    { id: 'caption', name: 'Caption', placeholder: 'describe what the image is about' }
  ],*/
  browserBackButtonClose: true
  })
.use(Tus, { target: Dashboard, endpoint: API_URL, autoRetry: false })

uppy.on('upload-success', (file, resp, uploadURL) => {
  console.log(file.name, uploadURL)
  console.log(resp)
  let tbody = document.querySelector('#results')
  tbody.insertAdjacentHTML('beforeend', '<pre>' + uploadURL + '/' + file.name + '</pre>');
})


/*function getHash(buffer, algo = "SHA-256") {
  return crypto.subtle.digest(algo, buffer)
      .then(hash => {
        // here hash is an arrayBuffer, so we'll convert it to its hex version
        let result = '';
        const view = new DataView(hash);
        for (let i = 0; i < hash.byteLength; i += 4) {
          result += ('00000000' + view.getUint32(i).toString(16)).slice(-8);
        }
        return result;
      });
}

uppy.on('file-added', (file) => {
  const fR = new FileReader();
  fR.onload = e => getHash(fR.result)
    .then(hash => console.log(hash))
    // Chrome only accept it from an secure origin
    .catch(e => {
      if (e.code === 9) {
        console.log(`Be sure to be on the https page: https://stackoverflow.com/questions/44036218/`)
      } else {
        console.log(e.message)
      }
    })
  fR.readAsArrayBuffer(file.data)
})
uppy.on('complete', result => {
  console.log('successful files:', result.successful)
  console.log('failed files:', result.failed)
})

function bytesToHexString(bytes) {
  if (!bytes)
    return null;
  bytes = new Uint8Array(bytes);
  var hexBytes = [];
  for (var i = 0; i < bytes.length; ++i) {
    var byteString = bytes[i].toString(16);
    if (byteString.length < 2)
      byteString = "0" + byteString;
    hexBytes.push(byteString);
  }
  return hexBytes.join("");
}*/


