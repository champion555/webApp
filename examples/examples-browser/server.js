
var FormData = require('form-data');
var axios = require('axios')
const express = require('express')
const path = require('path')
const { get } = require('request')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const viewsDir = path.join(__dirname, 'views')
app.use(express.static(viewsDir))
app.use(express.static(path.join(__dirname, './public')))
app.use(express.static(path.join(__dirname, '../images')))
app.use(express.static(path.join(__dirname, '../media')))
app.use(express.static(path.join(__dirname, '../../weights')))
app.use(express.static(path.join(__dirname, '../../dist')))

app.get('/', (req, res) => res.redirect('/webcam_face_detection'))
app.get('/webcam_face_detection', (req, res) => res.sendFile(path.join(viewsDir, '/faceDetectionPage/webcamFaceDetection.html')))

// app.get('/face_detection', (req, res) => res.sendFile(path.join(viewsDir, 'faceDetection.html')))
// app.get('/face_landmark_detection', (req, res) => res.sendFile(path.join(viewsDir, 'faceLandmarkDetection.html')))
// app.get('/face_expression_recognition', (req, res) => res.sendFile(path.join(viewsDir, 'faceExpressionRecognition.html')))
// app.get('/age_and_gender_recognition', (req, res) => res.sendFile(path.join(viewsDir, 'ageAndGenderRecognition.html')))
// app.get('/face_extraction', (req, res) => res.sendFile(path.join(viewsDir, 'faceExtraction.html')))
// app.get('/face_recognition', (req, res) => res.sendFile(path.join(viewsDir, 'faceRecognition.html')))
// app.get('/video_face_tracking', (req, res) => res.sendFile(path.join(viewsDir, 'videoFaceTracking.html')))


app.get('/testapiface', async (req, res) => {
  res.json({status:200, message:'ok'})
})
app.post('/testapiface', async (req, res) => {
  var getRes= req.body.key
  res.json({status:200, message:getRes +'ok'})
})

app.post('/fetch_external_image', async (req, res) => {
  const { imageUrl } = req.body
  if (!imageUrl) {
    return res.status(400).send('imageUrl param required')
  }
  try {
    const externalResponse = await request(imageUrl)
    res.set('content-type', externalResponse.headers['content-type'])
    return res.status(202).send(Buffer.from(externalResponse.body))
  } catch (err) {
    return res.status(404).send(err.toString())
  }
})


// app.post('/api_call', async (req, res) => {
//   var { data } = req.body
//   data.result = "success"  
//   res.send(data)
// })
app.post('/api_call', async (req, res) => {

  var formData = new FormData();
  formData.append("api_key", "Mzc0MTExMjUtNTBmMS00ZTA3LWEwNjktZjQxM2UwNjA3ZGEw");
  formData.append("secret_key","YTE4YmM5YmYtZjZhYS00MTU5LWI4Y2EtYjQyYTRkNzAxOWZj")
  console.log("api called for token : ", formData._boundary)


  let key_res;
  await  axios({
      method: 'post',
      url: 'http://109.238.12.179:5000/v1/api/client/authentificate',
      data: formData,
      headers: {'Content-Type': `multipart/form-data; boundary=${formData._boundary}` }
      })
      .then(function (response) {
        // console.log(response)
      
        key_res = response
      })
      .catch(function (response) {
      //  console.log("error occured : ", response)
    })

    if(key_res.status == 'SUCCESS'){

      await  axios({
        method: 'post',
        url: 'http://109.238.12.179:5000/v1/api/photoFaceLiveness',
        data: formData,
        headers: {'Content-Type': `multipart/form-data; boundary=${formData._boundary}` }
        })
        .then(function (response) {
          // console.log(response)
        
          key_res = response
        })
        .catch(function (response) {
        //  console.log("error occured : ", response)
      })


    }else{
      res.send("Failed")
      return
    }

    console.log("token got : ", key_res)
    res.send("Ok")
    // console.log("api called")

})
function authenticationToServer(){       
  var formData = new FormData();
  formData.append("api_key", "MWEwMjVjYzYtMTcyNy00Y2M5LWJhZTQtNDY4NzY2YzY0NjRis");
  formData.append("secret_key","NjFhNzAzY2UtZTE3MS00OTRmLWIxZDMtOWFjZTcxYzUzY2Vl")
  // formData.append("image", imagefile.files[0]);

  var tokenData = {
    "api_key": "MWEwMjVjYzYtMTcyNy00Y2M5LWJhZTQtNDY4NzY2YzY0NjRis",
    "secret_key": "NjFhNzAzY2UtZTE3MS00OTRmLWIxZDMtOWFjZTcxYzUzY2Vl"
  }


  axios({
      method: 'post',
      url: 'http://109.238.12.179:5000/v1/api/client/authentificate',
      data: tokenData
  })
      .then(function (response) {
        loadingDialog.style.display = "none"
        document.getElementById("authenticationRes").innerText = response
        // console.log(response);
      })
      .catch(function (response) {
        loadingDialog.style.display = "none"
        document.getElementById("authenticationRes").innerText = "error"
        //handle error
        console.log("eror happenend : ", response);
    });
}

app.listen(3000, () => console.log('Listening on port 3000!'))

function request(url, returnBuffer = true, timeout = 10000) {
  return new Promise(function(resolve, reject) {
    const options = Object.assign(
      {},
      {
        url,
        isBuffer: true,
        timeout,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
        }
      },
      returnBuffer ? { encoding: null } : {}
    )

    get(options, function(err, res) {
      if (err) return reject(err)
      return resolve(res)
    })
  })
}