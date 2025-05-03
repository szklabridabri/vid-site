async function loadVideos() {
  const res = await fetch("data.json");
  const data = await res.json();
  const search = document.getElementById("search").value.toLowerCase();
  const container = document.getElementById("videoList");
  container.innerHTML = "";

  data.filter(v => v.title.toLowerCase().includes(search)).forEach((video, index) => {
    const likes = localStorage.getItem("likes_" + index) || video.likes;
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>${video.title}</h3>
      <video src="${video.url}" controls width="300"></video>
      <p>Likes: <span id="like${index}">${likes}</span>
      <button onclick="like(${index})">Like</button></p>
    `;
    container.appendChild(div);
  });
}

function like(index) {
  const span = document.getElementById("like" + index);
  const newLikes = parseInt(span.textContent) + 1;
  span.textContent = newLikes;
  localStorage.setItem("likes_" + index, newLikes);
}

document.getElementById("search").addEventListener("input", loadVideos);
loadVideos();
