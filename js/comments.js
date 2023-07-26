let form = document.getElementById("form");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let post = document.getElementById("post");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

let formValidation = () => {
  if (textarea.value === "") {
    msg.innerHTML = "El comentario no puede estar vacío.";
  } else {
    msg.innerHTML = "";
    acceptData();
  }
};

let dataComments = [];

let acceptData = () => {
  let data = {
    text: textarea.value,
  };
  dataComments.push(data);
  localStorage.setItem("dataComments", JSON.stringify(dataComments));
  createPost();
};

let createPost = () => {
  post.innerHTML = "";
  dataComments.map((x, y) => {
    return (post.innerHTML += `
      <div class="post-div" id="${y}">
        <p>${x.text}</p>
        <span class="options">
          <i class='bx bxs-message-alt-edit' onclick="editpost(this)"></i>
          <i class='bx bxs-trash-alt' onclick="deletepost(this)"></i>
        </span>
      </div>
    `);
  });

  textarea.value = "";
};

let editpost = (e) => {
  textarea.value = e.parentElement.previousElementSibling.innerHTML;
  deletepost(e);
};

let deletepost = (e) => {
  e.parentElement.parentElement.remove();
  dataComments.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("dataComments", JSON.stringify(dataComments));
};

(() => {
  dataComments = JSON.parse(localStorage.getItem("dataComments")) || [];
  createPost();
})();
