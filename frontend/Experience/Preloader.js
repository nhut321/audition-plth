// import * as THREE from "three";
import Experience from "./Experience.js";

// import lerp from "./Utils/functions/lerp.js";
import elements from "./Utils/functions/elements.js";

import gsap from "gsap";

export default class Preloader {
    constructor() {
        this.experience = new Experience();
        this.resources = this.experience.resources;

        this.matchmedia = gsap.matchMedia();

        this.loaded = 0;
        this.queue = 0;

        this.counter = 0;
        this.amountDone = 0;

        this.domElements = elements({
            preloader: ".preloader",
            text1: ".preloader-percentage1",
            text2: ".preloader-percentage2",
            progressBar: ".progress-bar",
            svgLogo: ".svgLogo",
            progressBarContainer: ".progress-bar-container",
            progressWrapper: ".progress-wrapper",
            preloaderTitle: ".preloader-title",
            preloaderWrapper: ".preloader-wrapper",
            welcomeTitle: ".welcome-title",
            nameForm: ".login",
            nameInput: "#username", //username nhập vaof

            emailInput: "#email", // email nhập vào
            passwordInput: "#password", // mật khẩu nhập vào
            loginButton: "#login-button",

            nameInputButton: "#name-input-button",
            characterSelectTitle: ".character-select-title",
            avatarWrapper: ".avatar-img-wrapper",
            avatarLeftImg: ".avatar-left",
            avatarRightImg: ".avatar-right",
            customizeButton: ".customize-character-btn",
            description: ".description",
            characterAvatar: '.avatar-img',
            avatarItem: '.avatar-item'
        });

        // **** This is for updating a percentage ****
        this.resources.on("loading", (loaded, queue) => {
            this.updateProgress(loaded, queue);
        });

        this.resources.on("ready", () => {
            this.playIntro();
        });

        this.addEventListeners();
    }

    updateProgress(loaded, queue) {
        this.amountDone = Math.round((loaded / queue) * 100);
    }

    async playIntro() {
        return new Promise((resolve) => {
            this.timeline = new gsap.timeline();
            this.timeline
                .to(this.domElements.svgLogo, {
                    opacity: 0,
                    duration: 1.2,
                    delay: 2.2,
                    top: "-120%",
                    ease: "power4.out",
                })
                .to(
                    this.domElements.progressBarContainer,
                    {
                        opacity: 0,
                        duration: 1.2,
                        top: "30%",
                        ease: "power4.out",
                    },
                    "-=1.05"
                )
                .to(
                    this.domElements.progressWrapper,
                    {
                        opacity: 0,
                        duration: 1.2,
                        bottom: "21%",
                        ease: "power4.out",
                    },
                    "-=1.05"
                )
                .to(
                    this.domElements.description,
                    {
                        opacity: 0,
                        duration: 1.2,
                        bottom: "35%",
                        ease: "power4.out",
                    },
                    "-=1.05"
                )
                .to(
                    this.domElements.preloaderTitle,
                    {
                        opacity: 0,
                        duration: 1.2,
                        bottom: "18%",
                        ease: "power4.out",
                        onUpdate: () => {
                            this.domElements.preloaderTitle.classList.remove(
                                "fade-in-out"
                            );
                        },

                        onComplete: () => {
                            this.domElements.svgLogo.remove();
                            this.domElements.progressBarContainer.remove();
                            this.domElements.progressWrapper.remove();
                            this.domElements.preloaderTitle.remove();
                            this.domElements.preloaderWrapper.remove();
                        },
                    },
                    "-=1.05"
                )
                .to(
                    this.domElements.welcomeTitle,
                    {
                        opacity: 1,
                        duration: 1.2,
                        top: "37%",
                        ease: "power4.out",
                    },
                    "-=1"
                )
                .to(
                    this.domElements.nameForm,
                    {
                        opacity: 1,
                        duration: 1.2,
                        top: "50%",
                        ease: "power4.out",
                    },
                    "-=1"
                )
                .to(
                    this.domElements.nameInputButton,
                    {
                        opacity: 1,
                        duration: 1.2,
                        bottom: "39%",
                        ease: "power4.out",
                        onComplete: () => {
                            // this.domElements.preloader.remove();
                            resolve;
                        },
                    },
                    "-=1"
                );
        });
    }

    // onNameInput = () => {
    //     if (this.domElements.nameInput.value === "") return;
    //     this.nameInputOutro();
    // };

    onCharacterSelect = () => {
        this.preloaderOutro();
    };

    async nameInputOutro() {
        console.log('name input outro')
        return new Promise((resolve) => {
            this.timeline2 = new gsap.timeline();
            this.timeline2
                .to(this.domElements.welcomeTitle, {
                    opacity: 0,
                    duration: 1.2,
                    top: "34%",
                    ease: "power4.out",
                })
                .to(
                    this.domElements.nameForm,
                    {
                        opacity: 0,
                        duration: 1.2,
                        top: "44%",
                        ease: "power4.out",
                    },
                    "-=1.05"
                )
                .to(
                    this.domElements.nameInputButton,
                    {
                        opacity: 0,
                        duration: 1.2,
                        bottom: "47%",
                        ease: "power4.out",
                        onComplete: () => {
                            this.domElements.welcomeTitle.remove();
                            this.domElements.nameForm.remove();
                            // this.domElements.nameInputButton.remove();
                            
                            // this.domElements.avatarLeftImg.style.pointerEvents =
                            //     "auto";
                            // this.domElements.avatarRightImg.style.pointerEvents =
                            //     "auto";
                            console.log(this.domElements); // Kiểm tra các phần tử trong console
                            const avatarItems = document.querySelectorAll(".avatar-item");
                            avatarItems.forEach((avatar) => {
                                avatar.addEventListener("click", this.onCharacterSelect);
                            });
                            resolve();  // Đừng quên gọi resolve khi kết thúc
                        },
                    },
                    "-=1.05"
                )
                .to(
                    this.domElements.characterSelectTitle,
                    {
                        opacity: 1,
                        duration: 1.2,
                        top: "20%",
                        ease: "power4.out",
                    },
                    "-=1.05"
                )
                .to(
                    this.domElements.avatarWrapper,
                    {
                        opacity: 1,
                        duration: 1.2,
                        bottom: "47%",
                        ease: "power4.out",
                        // onComplete: () => {

                            
                        // }
                    },
                    "-=1.05"
                )
                .to(
                    this.domElements.customizeButton,
                    {
                        opacity: 1,
                        duration: 1.2,
                        bottom: "25%",
                        ease: "power4.out",
                    },
                    "-=1.05"
                );
        });
    }

    onLogin = async () => {
        const username = this.domElements.emailInput.value;
        const password = this.domElements.passwordInput.value;
    
        if (!username || !password) return;
    
        try {
            const response = await fetch("login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
    
            if (!response.ok) {
                throw new Error("Login failed");
            }
    
            const data = await response.json();
            console.log(data)
            sessionStorage.setItem("model-list", JSON.stringify(data.user)); // Lưu token để dùng sau
            this.nameInputOutro(); // Tiếp tục chuyển sang giao diện chính
            window.dispatchEvent(new Event("sessionUpdated"));
            // this.playIntro()
        } catch (err) {
            console.log('loi preload')
            document.querySelector(".error-message").classList.remove("hidden");
        }
    };

    async preloaderOutro() {
        return new Promise((resolve) => {
            this.timeline3 = new gsap.timeline();
            this.timeline3.to(this.domElements.preloader, {
                duration: 1.7,
                // top: "-150%",
                opacity: 0,
                ease: "power3.out",
                onComplete: () => {
                    this.domElements.preloader.remove();
                    resolve;
                },
            });
        });
    }
    
    
    addEventListeners() {
        // this.domElements.nameInputButton.addEventListener(
            //     "click",
            //     this.onNameInput
            // );
            
        // console.log(this.domElements.avatarItem)
        // this.domElements.avatarItem = document.querySelectorAll(".avatar-item");
            

        // this.domElements.avatarItem.forEach((avatar) => {
        //     console.log('click custom')
        //     avatar.addEventListener("click", this.onCharacterSelect);
        // });

        this.domElements.loginButton.addEventListener("click", this.onLogin);

        // this.domElements.avatarLeftImg.addEventListener(
        //     "click",
        //     this.onCharacterSelect
        // );
        // this.domElements.avatarRightImg.addEventListener(
        //     "click",
        //     this.onCharacterSelect
        // );
    }

    update() {
        if (this.counter < this.amountDone) {
            this.counter++;
            this.domElements.text1.innerText = Math.round(this.counter / 10);

            if (Math.round(this.counter / 10) !== 10) {
                this.domElements.text2.innerText = Math.round(
                    this.counter % 10
                );
                this.flag = false;
            } else {
                this.domElements.text2.innerText = 0;
                this.flag = true;
            }

            this.domElements.progressBar.style.width =
                Math.round(this.counter) + "%";

            if (this.flag) {
                this.domElements.progressBar.style.width = "100%";
            }
        }
    }
}
