import React, { useState } from "react";
import "./Avatar.css";
import Axios from "axios";

const Avatar = () => {
  // Setting up the initial states using react hook 'useState'
  const [sprite, setSprite] = useState("Adventurer");
  const [seed, setSeed] = useState(1000);

  // Function to set the current sprite type
  function handleSprite(spritetype) {
    setSprite(spritetype);
  }

  // Function to generate random seeds for the API
  function handleGenerate() {
    let x = Math.floor(Math.random() * 1000);
    setSeed(x);
  }

  // Function to download image and save it in our computer
  function downloadImage() {
    Axios({
      method: "get",
      url: `https://api.dicebear.com/9.x/${sprite}/svg?seed=${seed}`,
      responseType: "arraybuffer",
    })
      .then((response) => {
        var link = document.createElement("a");
        link.href = window.URL.createObjectURL(
          new Blob([response.data], { type: "application/octet-stream" })
        );
        link.download = `${seed}.svg`;
        document.body.appendChild(link);
        link.click();
        setTimeout(function () {
          window.URL.revokeObjectURL(link);
        }, 200);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="container">
      <div className="nav">
        <p>Random Avatar Generator</p>
      </div>
      <div className="home">
        <div className="btns">
          <button
            onClick={() => {
              handleSprite("avataaars");
            }}
          >
            Human
          </button>
          <button
            onClick={() => {
              handleSprite("pixel-art");
            }}
          >
            Pixel
          </button>
          <button
            onClick={() => {
              handleSprite("bottts");
            }}
          >
            Bots
          </button>
          <button
            onClick={() => {
              handleSprite("shapes");
            }}
          >
            Shapes
          </button>
          <button
            onClick={() => {
              handleSprite("identicon");
            }}
          >
            Identicon
          </button>
          <button
            onClick={() => {
              handleSprite("croodles");
            }}
          >
            Croodles
          </button>
          <button
            onClick={() => {
              handleSprite("notionists");
            }}
          >
            Notionists
          </button>
        </div>
        <div className="avatar">
          <img
            src={`https://api.dicebear.com/9.x/${sprite}/svg?seed=${seed}`}
            alt="Sprite"
          />
        </div>
        <div className="generate">
          <button
            id="gen"
            onClick={() => {
              handleGenerate();
            }}
          >
            Next
          </button>
          <button
            id="down"
            onClick={() => {
              downloadImage();
            }}
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default Avatar;
