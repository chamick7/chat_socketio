const form = document.querySelector("#inbox_form");
const inbox = document.querySelector("#inbox_msg");
const room = document.querySelector(".room_key").getAttribute("id");
const name = document.querySelector(".info").getAttribute("id");
const msg_container = document.querySelector("#msg_container");

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const color = getRandomColor();


const socket = io();

socket.emit("join", { room: room, name: name,color:color });

socket.on('joinRoom',(data) => {
  const li = document.createElement('li');
  li.className = "join";
  
  li.innerHTML = `<span class="name" style="color:${data.color}">Chamick7</span> connected !!`
  msg_container.appendChild(li);

})

socket.on("msgToClient", (data) => {

  const li = document.createElement("li");
  li.className = "msg"

  if (data.sender == name) {
    li.className = "msg me"
    li.innerHTML = `${data.name}<span style="color:${data.color}" >${data.msg}</span>`;
    msg_container.appendChild(li)
  } else {
    li.innerHTML = `${data.name}<span style="color:${data.color}" >${data.msg}</span>`;
    msg_container.appendChild(li)

  }
});

function submitHandle() {
  const msg = inbox.value;

  socket.emit("msgToServer", { room: room, name: name, msg: msg,color:color });

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
