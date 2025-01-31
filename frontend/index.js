import "./index.scss";
import { io } from "socket.io-client";
import Experience from "./Experience/Experience.js";
import elements from "./Experience/Utils/functions/elements.js";



// Dom Elements ----------------------------------

const domElements = elements({
    canvas: ".experience-canvas",
    chatContainer: ".chat-container",
    messageSubmitButton: "#chat-message-button",
    messageInput: "#chat-message-input",
    inputWrapper: ".message-input-wrapper",
    nameInputButton: "#name-input-button",
    
    nameInput: "#username", //Nhập username vào
    emailInput: "#email", // email nhập vào
    passwordInput: "#password", // mật khẩu nhập vào
    loginButton: "#login-button",
    
    characterAvatar: '.character-avatar',
    avatarLeftImg: ".avatar-left",
    avatarRightImg: ".avatar-right",
    
});

// Frontend Server ----------------------------------

const socketUrl = new URL("/", window.location.href);

// const socket = io(socketUrl.toString());
const chatSocket = io(socketUrl.toString() + "chat");
const updateSocket = io(socketUrl.toString() + "update");
let userName = "";

//test 
sessionStorage.clear();
// let session

function loadSessionData() {
    const sessionModel = JSON.parse(sessionStorage.getItem("model-list")) || [];

    const characterContainer = document.querySelector(".avatar-img-wrapper");

    sessionModel.forEach((character) => {
        const characterElement = document.createElement("img");
        characterElement.src = `./images/${character.image}`;
        characterElement.alt = character.name;
        characterElement.dataset.id = character.name; // Thêm ID vào dataset
        characterElement.classList.add("avatar-img");
        characterElement.classList.add("avatar-item");
        characterElement.style.pointerEvents = "auto";
        characterContainer.appendChild(characterElement);
    });


}

// 🔥 Lắng nghe sự kiện để cập nhật ngay khi sessionStorage thay đổi
window.addEventListener("sessionUpdated", loadSessionData);

// Khi load trang lần đầu
loadSessionData();
//test

// Experience ----------------------------------

const experience = new Experience(domElements.canvas, updateSocket);

// Sockets ----------------------------------

chatSocket.on("connect", () => {
    console.log("Connected to server with ID" + chatSocket.id);
});



domElements.messageSubmitButton.addEventListener("click", handleMessageSubmit);
// domElements.nameInputButton.addEventListener("click", handleNameSubmit);
domElements.loginButton.addEventListener("click", handleNameSubmit);
domElements.chatContainer.addEventListener("click", handleChatClick);
// domElements.avatarLeftImg.addEventListener(
//     "click",
//     handleCharacterSelectionLeft
// );
// domElements.avatarRightImg.addEventListener(
//     "click",
//     handleCharacterSelectionRight
// );



document.addEventListener("keydown", handleMessageSubmit);

function handleChatClick() {
    if (domElements.inputWrapper.classList.contains("hidden"))
        domElements.inputWrapper.classList.remove("hidden");
}

const handleClickAvatarCustom = (e,avatarType) => {
    // Lấy giá trị của thuộc tính data-id từ avatarItem
    const avatarId = avatarType.dataset.id;

    // updateSocket.emit("setAvatar", "male");
    updateSocket.emit("setAvatar", avatarId);
    // Gỡ sự kiện trên chính phần tử được click
    e.currentTarget.removeEventListener("click", handleClickAvatarCustom);
};

// Thay vì gán sự kiện trực tiếp cho mỗi avatar-item, sử dụng event delegation
document.querySelector(".avatar-img-wrapper").addEventListener("click", (event) => {
    const avatarItem = event.target.closest(".avatar-item");
    if (avatarItem) {
        handleClickAvatarCustom(event,avatarItem);
    }
});

// function handleNameSubmit() {
//     userName = domElements.nameInput.value;
//     chatSocket.emit("setName", userName);
//     updateSocket.emit("setName", userName);
// }

async function handleNameSubmit() {
    const userName = domElements.emailInput.value
    
    chatSocket.emit("setName", userName);
    updateSocket.emit("setName", userName);
}

function handleCharacterSelectionLeft() {
    updateSocket.emit("setAvatar", "lin1-1");
    console.log('click avatar left')

    domElements.avatarLeftImg.removeEventListener(
        "click",
        handleCharacterSelectionLeft
    );
}
function handleCharacterSelectionRight() {
    updateSocket.emit("setAvatar", "nhutt32.1-1");


    domElements.avatarRightImg.removeEventListener(
        "click",
        handleCharacterSelectionRight
    );
}

function handleMessageSubmit(event) {
    if (event.type === "click" || event.key === "Enter") {
        domElements.inputWrapper.classList.toggle("hidden");
        domElements.messageInput.focus();

        if (domElements.messageInput.value === "") return;
        displayMessage(
            userName,
            domElements.messageInput.value.substring(0, 500),
            getTime()
        );
        chatSocket.emit(
            "send-message",
            domElements.messageInput.value.substring(0, 500),
            getTime()
        );
        domElements.messageInput.value = "";
    }
}

function getTime() {
    const currentDate = new Date();
    const hours = currentDate.getHours().toString().padStart(2, "0");
    const minutes = currentDate.getMinutes().toString().padStart(2, "0");
    const time = `${hours}:${minutes}`;
    return time;
}

function displayMessage(name, message, time) {
    const messageDiv = document.createElement("div");
    messageDiv.innerHTML = `<span class="different-color">[${time}] ${name}:</span> ${message}`;
    domElements.chatContainer.append(messageDiv);
    domElements.chatContainer.scrollTop =
        domElements.chatContainer.scrollHeight;
}

// Get data from server ----------------------------------

chatSocket.on("recieved-message", (name, message, time) => {
    displayMessage(name, message, time);
});

// Update Socket ----------------------------------------------------
updateSocket.on("connect", () => {});

const audio = document.getElementById("myAudio");

window.addEventListener("keydown", function (e) {
    if (e.code === "Equal") {
        if (!audio.paused) {
            audio.pause();
            audio.currentTime = 0;
        } else {
            audio.play();
        }
    }
});

