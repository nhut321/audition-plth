import * as THREE from "three";
import Experience from "../../Experience.js";

export default class Nametag {
    constructor() {
        this.experience = new Experience();
        this.resources = this.experience.resources;
        this.scene = this.experience.scene;
        this.nametag = "";
    }

    createNametag(size = 16, baseWidth = 150, name = "John Doe") {
        const borderSize = 2;
        const fontSize = 12;
        const ctx = document.createElement("canvas").getContext("2d");
        const font = `200 ${size}px Arial`;
        ctx.font = font;
        // measure how long the name will be
        const textWidth = ctx.measureText(name).width;

        const doubleBorderSize = borderSize * 2;
        const width = baseWidth + doubleBorderSize;
        const height = size + doubleBorderSize;
        ctx.canvas.width = width;
        ctx.canvas.height = height;

        // need to set font again after resizing canvas
        ctx.font = font;
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";

        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        ctx.fillRect(0, 0, width, height);

        // scale to fit but don't stretch
        const scaleFactor = Math.min(1, baseWidth / textWidth);
        ctx.translate(width / 2, height / 2);
        ctx.scale(scaleFactor, 1);
        ctx.fillStyle = "white";
        ctx.fillText(name, 0, 0);

        const canvasTexture = new THREE.CanvasTexture(ctx.canvas);

        canvasTexture.minFilter = THREE.LinearFilter;
        canvasTexture.wrapS = THREE.ClampToEdgeWrapping;
        canvasTexture.wrapT = THREE.ClampToEdgeWrapping;

        const nameMaterial = new THREE.SpriteMaterial({
            map: canvasTexture,
            transparent: true,
        });

        const labelBaseScale = 0.01;
        const label = new THREE.Sprite(nameMaterial);

        label.position.y = 5;

        label.scale.x = ctx.canvas.width * labelBaseScale;
        label.scale.y = ctx.canvas.height * labelBaseScale;

        this.scene.add(label);
        return label;

        // this.scene.add(label);

        // return ctx.canvas;

        // return this.nametag;
    }

    update() {}
}

// import * as THREE from "three";
// import Experience from "../../Experience.js";

// export default class Nametag {
//     constructor() {
//         this.experience = new Experience();
//         this.resources = this.experience.resources;
//         this.scene = this.experience.scene;
//         this.nametag = "";
//         this.currentText = "";
//         this.chatTimeout = null;
//     }

//     createNametag(size = 16, baseWidth = 150, name = "John Doe") {
//         this.name = name;
//         this.canvas = document.createElement("canvas");
//         this.ctx = this.canvas.getContext("2d");
//         this.updateText(name);

//         this.texture = new THREE.CanvasTexture(this.canvas);
//         this.texture.minFilter = THREE.LinearFilter;
//         this.texture.wrapS = THREE.ClampToEdgeWrapping;
//         this.texture.wrapT = THREE.ClampToEdgeWrapping;

//         this.material = new THREE.SpriteMaterial({
//             map: this.texture,
//             transparent: true,
//         });

//         this.label = new THREE.Sprite(this.material);
//         this.label.position.y = 5;
//         const labelBaseScale = 0.01;
//         this.label.scale.set(this.canvas.width * labelBaseScale, this.canvas.height * labelBaseScale, 1);

//         return this.label;
//     }

//     updateText(text) {
//         const borderSize = 2;
//         const size = 16;
//         const font = `200 ${size}px`;
//         this.ctx.font = font;
//         const textWidth = this.ctx.measureText(text).width;

//         const width = Math.max(150, textWidth + borderSize * 2);
//         const height = size + borderSize * 2;
//         this.canvas.width = width;
//         this.canvas.height = height;

//         this.ctx.font = font;
//         this.ctx.textBaseline = "middle";
//         this.ctx.textAlign = "center";
//         this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
//         this.ctx.fillRect(0, 0, width, height);

//         this.ctx.fillStyle = "white";
//         this.ctx.fillText(text, width / 2, height / 2);

//         // this.texture.needsUpdate = true;
//     }

//     showChat(message) {
//         this.updateText(message);
//         clearTimeout(this.chatTimeout);
//         this.chatTimeout = setTimeout(() => {
//             this.updateText(this.name);
//         }, 10000);
//     }

//     update() {}
// }
