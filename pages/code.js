const app = document.querySelector(".app");
  const socket = io();

  let uname;

  app
    .querySelector(".join-screen #join-user")
    .addEventListener("click", function () {
      let username = app.querySelector(".join-screen #username").value;
      if (username.length == 0) {
        return;
      }
      socket.emit("newuser", username);
      uname = username;
      document.getElementById("logo").innerText = `${username}`;
      if (localStorage.getItem("MenImg")) {
        app.querySelector(".join-screen").classList.remove("active");
        app.querySelector(".chat-screen").classList.add("active");
      } else if (localStorage.getItem("WomenImg")) {
        app.querySelector(".join-screen").classList.remove("active");
        app.querySelector(".chat-screen").classList.add("active");
      } else if (localStorage.getItem("CustomAvatar")) {
        app.querySelector(".join-screen").classList.remove("active");
        app.querySelector(".chat-screen").classList.add("active");
      } else {
        alert("please Select Img");
      }
    });
    app
      .querySelector("#message-input")
      .addEventListener("onkeypress", function (e) {
        if(e.KeyCode === "enter"){
        let message = app.querySelector(".chat-screen #message-input").value;
        if (message.length == 0) {
          return;
        }
        renderMessage("my", {
          username: uname,
          text: message
        });
        socket.emit("chat", {
          username: uname,
          text: message
        });
        app.querySelector(".chat-screen #message-input").value = "";
      }
      });
  app
    .querySelector("#send-message")
    .addEventListener("click", function () {
      let message = app.querySelector(".chat-screen #message-input").value;
      if (message.length == 0) {
        return;
      }
      renderMessage("my", {
        username: uname,
        text: message
      });
      socket.emit("chat", {
        username: uname,
        text: message
      });
      app.querySelector(".chat-screen #message-input").value = "";
    });

  app
    .querySelector(".chat-screen #exit-chat")
    .addEventListener("click", function () {
      socket.emit("exituser", uname);
      window.location.href = window.location.href;
    });

  socket.on("update", function (update) {
    renderMessage("update", update);
  });
  socket.on("chat", function (message) {
    renderMessage("other", message);
  });

  function renderMessage(type, message) {
    let messageContainer = app.querySelector(".chat-screen .messages");
    if (type == "my") {
      let el = document.createElement("div");
      el.setAttribute("class", "message my-message");
      el.innerHTML = `
            <div>
            <div class="name">You</div>
            <div class="text">${message.text}</div>
            </div>
            `;
      messageContainer.appendChild(el);
    } else if (type == "other") {
      let el = document.createElement("div");
      el.setAttribute("class", "message other-message");
      el.innerHTML = `
            <div>
            <div class="name">${message.username}</div>
            <div class="text">${message.text}</div>
            </div>
            `;
      messageContainer.appendChild(el);
    } else if (type == "update") {
      let el = document.createElement("div");
      el.setAttribute("class", "update");
      el.innerText = message;
      messageContainer.appendChild(el);
    }
    // scroll chat to end
    messageContainer.scrollTop =
      messageContainer.scrollHeight - messageContainer.clientHeight;
  }
  let call = document.getElementById("call-chat");
  call.addEventListener("click", () => {
    document.getElementById("calls-popup").style.display = "block";
    document.getElementById("checkUsers").innerHTML = `
    <h3>All Users</h3>
    <li>${message.username}</li>
    `;
  });

function HandleMenImg() {
  document.getElementById("text").style.position = "absolute";
  document.getElementById("text").style.marginTop = "-85px";
  document.getElementById("text").style.marginLeft = "20px";
  document.getElementById("text").style.display = "block";
  document.getElementById("img").style.opacity = "0.8";
  document.getElementById("img2").style.opacity = "1";
  localStorage.setItem("MenImg", "men image is here");
  img3.src = document.getElementById("img").src;
  localStorage.removeItem("WomenImg");
}
function HandleWomenImg() {
  document.getElementById("text").style.position = "absolute";
  document.getElementById("text").style.marginTop = "-85px";
  document.getElementById("text").style.marginLeft = "230px";
  document.getElementById("text").style.display = "block";
  document.getElementById("img").style.opacity = "1";
  document.getElementById("img2").style.opacity = "0.8";
  localStorage.setItem("WomenImg", "wowen image is here");
  img3.src = document.getElementById("img2").src;
  localStorage.removeItem("MenImg");  
}