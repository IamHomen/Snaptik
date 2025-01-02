// theme

document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("themeToggle");

    // Function to toggle the theme
    const toggleTheme = () => {
        document.body.classList.toggle("dark-theme");
        const isDark = document.body.classList.contains("dark-theme");
        themeToggle.innerHTML = isDark ? "&#9790;" : "&#9788;"; // Change icon based on theme
    };

    // Add event listener to the theme icon
    themeToggle.addEventListener("click", toggleTheme);

    // Optional: Save theme preference in local storage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
        themeToggle.innerHTML = "&#9790;";
    }

    themeToggle.addEventListener("click", () => {
        const currentTheme = document.body.classList.contains("dark-theme") ? "dark" : "light";
        localStorage.setItem("theme", currentTheme);
    });
});

// Paste button functionality
const pasteButton = document.querySelector(".input-container button");
const inputField = document.querySelector(".input-container input");

pasteButton.addEventListener("click", async () => {
    try {
        const text = await navigator.clipboard.readText();
        inputField.value = text;
    } catch (err) {
        console.error("Failed to read clipboard: ", err);
    }
});


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
      const card = document.getElementById('card');
      const img = document.getElementById('cover');
      const h3 = document.getElementById('description');
      const p = document.getElementById('nickname');
      const a = document.getElementById('download');

      h3.textContent = response.data.description;
      p.textContent = response.data.author.nickname;
      img.src = response.data.cover;
      a.href = response.data.downloadUrl;

      card.style.display = 'block';
      console.log(response.data.author.username);
    } catch (error) {
      console.error(error);
    }
  }