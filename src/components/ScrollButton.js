/* eslint-disable */

import React, { useState } from "react";
import { Button } from "./Styles";
import styled from "styled-components";

const ScrollButton = () => {
  const Button = styled.div`
    position: fixed;
    width: 100%;
    left: 45.95%;
    bottom: 40px;
    height: 20px;
    font-size: 3rem;
    z-index: 1;
    cursor: pointer;
    color: rgb(101, 101, 101);
  `;

  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <Button>
      <i
        class="fa-solid fa-circle-arrow-up"
        onClick={scrollToTop}
        style={{
          display: visible ? "inline" : "none",
          position: "relative",
          top: ".4rem",
        }}
      ></i>
    </Button>
  );
};

export default ScrollButton;
