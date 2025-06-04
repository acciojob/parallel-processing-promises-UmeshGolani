const imageUrls = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

const downloadButton = document.getElementById('download-images-button');
const loadingDiv = document.getElementById('loading');
const errorDiv = document.getElementById('error');
const outputDiv = document.getElementById('output');

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
  });
}

function downloadImages(urls) {
  errorDiv.textContent = '';
  outputDiv.innerHTML = '';
  loadingDiv.style.display = 'block';

  const promises = urls.map(obj => downloadImage(obj.url)); // ✅ FIXED LINE

  Promise.all(promises)
    .then(images => {
      loadingDiv.style.display = 'none';
      images.forEach(img => outputDiv.appendChild(img));
    })
    .catch(error => {
      loadingDiv.style.display = 'none';
      errorDiv.textContent = error.message;
    });
}

downloadButton.addEventListener('click', () => {
  downloadImages(imageUrls);
});
