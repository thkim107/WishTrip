import * as AFRAME from "aframe";
import styled from "styled-components";
import { useEffect, useState } from "react";
import useScript from "../../modules/useScript.ts";

const entities = [
  { id: 1, latitude: 37.56047, longitude: 126.92896, color: "red" }
];

const ARContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Center = styled.div`
  height: 10rem;
  background-color: white;
  position: fixed;
  bottom: 2%;
  flex-direction: row;
  width: 20rem;
  border-radius: 1rem;
  margin: 0px auto;
  left: 0;
  right: 0;
  text-align: center;
  line-height: 10rem;
  font-size: 1.2rem;
`;

function Ar() {
  const [loading, setLoading] = useState(false);

  useScript("https://thkim107.github.io/WishTrip/assets/js/aframe-master.min.js");
  useScript("https://thkim107.github.io/WishTrip/assets/js/info-message.js");
  useScript("https://thkim107.github.io/WishTrip/assets/js/highlight.js");
  useScript("https://thkim107.github.io/WishTrip/assets/js/info-panel.js");
  useScript("https://thkim107.github.io/WishTrip/assets/js/aframe-look-at-component.min.js");
  useScript("https://thkim107.github.io/WishTrip/assets/js/aframe-ar-nft.js");

  const initialising = () => {

    AFRAME.registerComponent("peakfinder", {
      init: function () {
        alert("Peakfinder component initialising!");
        this.loaded = false;
        window.addEventListener("gps-camera-update-position", (e) => {
          if (this.loaded === false) {
            this._loadPeaks(
              e.detail.position.longitude,
              e.detail.position.latitude,
            );
            this.loaded = true;
          }
          this._loadDistance();
        });
      },
      _loadPeaks: function (longitude, latitude) {
        alert(longitude + " " + latitude);
        const scale = 10;
        const entity = document.createElement("a-text");
        entity.setAttribute("look-at", "[gps-camera]");
        entity.setAttribute("value", latitude + "\n" + longitude);
        entity.setAttribute("scale", {
          x: scale,
          y: scale,
          z: scale,
        });
        entity.setAttribute("gps-entity-place", {
          latitude: latitude,
          longitude: longitude,
        });
        this.el.appendChild(entity);
      },
      _loadDistance: function () {
        let distanceMsg = document
          .querySelector("[gps-entity-place]")
          .getAttribute("distanceMsg");
        if (distanceMsg) {
          alert(distanceMsg);
        }
      },
    });
    AFRAME.registerComponent("boxentity", {
      init: function () {
        alert("box component initialising!");
        window.addEventListener("gps-entity-place-added", (e) => {
          alert("gps-entity-place-added");
          this._loadBox(e.detail);
        });
        window.addEventListener("gps-entity-place-loaded", (e) => {
          alert("gps-entity-place-loaded");
          console.log(e.detail.component);
        });
        window.addEventListener("gps-entity-place-update-position", (e) => {
          alert("gps-entity-place-update-position");
          console.log(e.detail.distance);
        });
      },
      _loadBox: function (detail) {
        alert(detail.component.getAttribute("distance"));
        console.log(detail.component);
      },
    });
  };

  useEffect(() => {
    if (!loading) {
      initialising();
      setLoading(true);
    }
    // window.addEventListener("gps-camera-update-position", (e) => {
    //   alert("camera position update");
    //   console.log(e);
    // });

    return () => {
      let body = document.querySelector("body");
      let video = document.querySelector("video");
      body.removeChild(video);
    };
  }, []);

  return (
    <>
      <ARContainer>
        <a-scene
          cursor="rayOrigin: mouse; fuse: false" raycaster="objects: .raycastable"
          info-message="htmlSrc: #messageText">
          <a-camera gps-projected-camera rotation-reader></a-camera>
          <a-box
            material="color: black"
            scale="0.1 0.1 0.1"
            boxentity
          ></a-box>
          <a-entity peakfinder></a-entity>
          <a-assets>
            <a-asset-item id="messageText" src="message.html"></a-asset-item>

            <img id="kazetachinu" src="https://cdn.aframe.io/examples/ui/kazetachinu.jpg" crossorigin="anonymous" />
            <img id="kazetachinuPoster" src="https://cdn.aframe.io/examples/ui/kazetachinuPoster.jpg" crossorigin="anonymous" />

            <img id="ponyo" src="https://cdn.aframe.io/examples/ui/ponyo.jpg" crossorigin="anonymous" />
            <img id="ponyoPoster" src="https://cdn.aframe.io/examples/ui/ponyoPoster.jpg" crossorigin="anonymous" />

            <img id="karigurashi" src="https://cdn.aframe.io/examples/ui/karigurashi.jpg" crossorigin="anonymous" />
            <img id="karigurashiPoster" src="https://cdn.aframe.io/examples/ui/karigurashiPoster.jpg" crossorigin="anonymous" />
            <a-mixin
              id="frame"
              geometry="primitive: plane; width: 0.5783552; height: 0.8192"
              material="color: white; shader: flat"
              animation__scale="property: scale; to: 1.2 1.2 1.2; dur: 200; startEvents: mouseenter"
              animation__scale_reverse="property: scale; to: 1 1 1; dur: 200; startEvents: mouseleave"
            ></a-mixin>
            <a-mixin
              id="poster"
              geometry="primitive: plane; width: 0.544768; height: 0.786432"
              material="color: white; shader: flat"
              position="0 0 0.005"
            ></a-mixin>
            <a-mixin
              id="movieImage"
              geometry="primitive: plane; width: 1.5; height: 0.81"
              material="src: #ponyo; shader: flat; transparent: true"
              position="0 0.495 0.0021"
            ></a-mixin>
          </a-assets>

          <a-entity
            id="background"
            position="0 0 0"
            geometry="primitive: sphere; radius: 2.0"
            material="color: red; side: back; shader: flat"
            scale="0.001 0.001 0.001"
            visible="false" class="raycastable">
          </a-entity>

          <a-entity
            position="0 1.6 0"
            camera look-controls="magicWindowTrackingEnabled: false; touchEnabled: false; mouseEnabled: false">
            <a-entity
              id="fadeBackground"
              geometry="primitive: sphere; radius: 2.5"
              material="color: black; side: back; shader: flat; transparent: true; opacity: 0.6" visible="false">
            </a-entity>
          </a-entity>

          <a-entity id="leftHand" laser-controls="hand: left" raycaster="objects: .raycastable"></a-entity>
          <a-entity id="rightHand" laser-controls="hand: right" raycaster="objects: .raycastable" line="color: #118A7E"></a-entity>

          <a-entity id="ui" position="0 1.6 -2.5">
            <a-entity id="menu" highlight>
              {entities.map((entity) => {
                return (
                  <a-entity
                      id="karigurashiButton" 
                      gps-entity-place={`latitude: ${entity.latitude}; longitude: ${entity.longitude}`}
                      mixin="frame"
                      class="raycastable menu-button">
                    <a-entity material="src: #karigurashiPoster;" mixin="poster"></a-entity>
                  </a-entity>
                );
              })}              
            </a-entity>

            <a-entity
              id="infoPanel"
              position="0 0 0.5"
              info-panel
              visible="false"
              scale="0.001 0.001 0.001"
              geometry="primitive: plane; width: 1.5; height: 1.8"
              material="color: #333333; shader: flat; transparent: false" class="raycastable">
              <a-entity id="ponyoMovieImage" mixin="movieImage" material="src: #ponyo" visible="false"></a-entity>
              <a-entity id="kazetachinuMovieImage" mixin="movieImage" material="src: #kazetachinu" visible="false"></a-entity>
              <a-entity id="karigurashiMovieImage" mixin="movieImage" material="src: #karigurashi" visible="false"></a-entity>
              <a-entity id="movieTitle"
                position="-0.68 -0.1 0"
                text="shader: msdf; anchor: left; width: 1.5; color: white; value: Ponyo (2003)"></a-entity>
              <a-entity id="movieDescription"
                position="-0.68 -0.2 0"
                text="baseline: top; shader: msdf; anchor: left; color: white; value: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."></a-entity>
            </a-entity>
          </a-entity>
          
        </a-scene>
      </ARContainer>
    </>
  );
}

export default Ar;