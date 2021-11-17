
const PiCamera = require("pi-camera");

const camera = new PiCamera({
    mode: "photo",
    width: 640,
    height: 480,
    nopreview: true,
    exposure: "off",
    rotation: 0
  });

module.exports = camera;