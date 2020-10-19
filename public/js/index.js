const form = document.querySelector("#inbox_form");
const inbox = document.querySelector("#inbox_msg");
const room = document.querySelector(".room_key").getAttribute("id");
const name = document.querySelector(".info").getAttribute("id");
const msg_container = document.querySelector("#msg_container");
const socket = io();

socket.emit("join", { room: room, name: name });

socket.on("msgToClient", (data) => {

  const li = document.createElement("li");
  li.className = "msg"

  if (data.sender == name) {
    li.className = "msg me"
    li.innerHTML = `${data.name}<span>${data.msg}</span>`;
    msg_container.appendChild(li)
  } else {
    li.innerHTML = `${data.name}<span>${data.msg}</span>`;
    msg_container.appendChild(li)

  }
});

function submitHandle() {
  const msg = inbox.value;

  socket.emit("msgToServer", { room: room, name: name, msg: msg });

  inbox.value = "";
}

inbox.addEventListener("keypress", (e) => {
  if (e.code == "Enter" && !e.shiftKey) {
    e.preventDefault();
    submitHandle();
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  submitHandle();
});
