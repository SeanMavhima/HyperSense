const video = document.getElementById('webcam');
const liveView = document.getElementById('liveView');
const demosSection = document.getElementById('demos');
const enableWebcamButton = document.getElementById('webcamButton');
const downloadButton = document.getElementById('downloadButton');

const detections = [];

// Check if webcam access is supported.
function getUserMediaSupported() {
  return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}

if (getUserMediaSupported()) {
  enableWebcamButton.addEventListener('click', enableCam);
  downloadButton.addEventListener('click', exportToCSV);
} else {
  console.warn('getUserMedia() is not supported by your browser');
}

function enableCam(event) {
  if (!model) {
    return;
  }

  event.target.classList.add('removed');

  const constraints = {
    video: true
  };

  navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
    video.srcObject = stream;
    video.addEventListener('loadeddata', predictWebcam);
  });
}

var model = undefined;

cocoSsd.load().then(function(loadedModel) {
  model = loadedModel;
  demosSection.classList.remove('invisible');
});

var children = [];

function playDogAlarm() {
  const dogAlarm = document.getElementById('dogAlarm');
  if (dogAlarm) {
    dogAlarm.play();
  }
}

function exportToCSV() {
  const csvContent = 'data:text/csv;charset=utf-8,' +
    'Class,Confidence,Timestamp\n' +
    detections.map(detection =>
      `${detection.class},${detection.confidence},${detection.timestamp}`
    ).join('\n');
  
  const encodedURI = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedURI);
  link.setAttribute('download', 'object_detections.csv');
  document.body.appendChild(link);
  link.click();
}

function predictWebcam() {
  model.detect(video).then(function(predictions) {
    for (let i = 0; i < children.length; i++) {
      liveView.removeChild(children[i]);
    }
    children.splice(0);

    for (let n = 0; n < predictions.length; n++) {
      if (predictions[n].score > 0.66) {
        const p = document.createElement('p');
        p.innerText = predictions[n].class + ' - with ' +
          Math.round(parseFloat(predictions[n].score) * 100) +
          '% confidence.';
        p.style = 'margin-left: ' + predictions[n].bbox[0] + 'px; margin-top: ' +
          (predictions[n].bbox[1] - 10) + 'px; width: ' +
          (predictions[n].bbox[2] - 10) + 'px; top: 0; left: 0;';

        const highlighter = document.createElement('div');
        highlighter.setAttribute('class', 'highlighter');
        highlighter.style = 'left: ' + predictions[n].bbox[0] + 'px; top: ' +
          predictions[n].bbox[1] + 'px; width: ' +
          predictions[n].bbox[2] + 'px; height: ' +
          predictions[n].bbox[3] + 'px;';

        liveView.appendChild(highlighter);
        liveView.appendChild(p);
        children.push(highlighter);
        children.push(p);

        const detection = {
          class: predictions[n].class,
          confidence: Math.round(parseFloat(predictions[n].score) * 100),
          timestamp: new Date().toLocaleString()
        };

        detections.push(detection);

        if (predictions[n].class.toLowerCase() === 'dog') {
          playDogAlarm();
        }
      }
    }

    window.requestAnimationFrame(predictWebcam);
  });
}
