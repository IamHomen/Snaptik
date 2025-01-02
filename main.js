// Fetch download URL from the API
const getDownloadUrl = async () => {
  const videoUrl = document.getElementById('videoLink').value; // Fetch value from input field.

  if (!videoUrl) {
    displayMessage('Please enter a TikTok video URL.', 'error');
    return;
  }

  const options = {
    method: 'GET',
    url: 'https://tiktok-video-downloader-api.p.rapidapi.com/media',
    params: {
      videoUrl: videoUrl
    },
    headers: {
      'x-rapidapi-key': 'ffe19e4260msh456a565997c24dcp1e5a80jsnbe16b6151614',
      'x-rapidapi-host': 'tiktok-video-downloader-api.p.rapidapi.com'
    }
  };
  
  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}