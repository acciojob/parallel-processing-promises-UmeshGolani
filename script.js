const output = document.getElementById("output");
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
    img.src = url;
  });
}

async function downloadImages(imageList) {
  // Clear previous state
  output.innerHTML = "";
  errorDiv.textContent = "";
  loading.style.display = "block";

  try {
    const imagePromises = imageList.map(img => downloadImage(img.url));
    const loadedImages = await Promise.all(imagePromises);

    loadedImages.forEach(img => output.appendChild(img));
  } catch (err) {
    errorDiv.textContent = err.message;
  } finally {
    loading.style.display = "none";
  }
}

btn.addEventListener("click", () => {
  downloadImages(images);
});
