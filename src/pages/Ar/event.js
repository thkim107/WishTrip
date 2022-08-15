import * as AFRAME from "aframe";

console.log("event file");

AFRAME.registerComponent("eventbox", {
  init: function () {
    this.el.addEventListener("click", () => {
      alert("box click");
    });
  },
});

AFRAME.registerComponent("testbox", {
  init: function () {
    this.el.addEventListener("click", () => {
      alert("box click");
    });
  },
});
