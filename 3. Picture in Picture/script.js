const videoElement = document.getElementById("video");
const button = document.getElementById("button");

// Ask the content that needs to be shared

async function selectMediaStream() {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    videoElement.srcObject = mediaStream;
    videoElement.onloadedmetadata = () => {
      videoElement.play();
    };
  } catch (error) {
    alert("error in selecting media stream :", error);
  }
}

// button to trigger Picture in Picture

button.addEventListener("click", async () => {
  // Disable button
  button.disabled = true;

  // request picture in picture
  await videoElement.requestPictureInPicture();

  // Enable button

  button.disabled = false;
});
// On load
selectMediaStream();
