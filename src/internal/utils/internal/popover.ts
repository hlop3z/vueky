function applyPopoverPosition(element: any, x: any, y: any) {
  element.style.transform = "";
  element.style.top = "";
  element.style.left = "";
  element.style.right = "";
  element.style.bottom = "";

  switch (x) {
    case "left":
      element.style.left = "0";
      break;
    case "right":
      element.style.right = "0";
      break;
    case "center":
      element.style.left = "50%";
      element.style.transform += "translateX(-50%) ";
      break;
  }

  // Apply vertical positioning
  switch (y) {
    case "top":
      element.style.top = "0";
      element.style.transform += "translateY(-100%) ";
      break;
    case "bottom":
      element.style.bottom = "0";
      element.style.transform += "translateY(100%) ";
      break;
    case "center":
      element.style.top = "50%";
      element.style.transform += "translateY(-50%) ";
      break;
  }

  // Handle combined classes
  if (x === "center" && y === "top") {
    element.style.transform = "translateY(-100%) translateX(-50%)";
  } else if (x === "center" && y === "bottom") {
    element.style.transform = "translateY(100%) translateX(-50%)";
  } else if (x === "center" && y === "center") {
    element.style.transform = "translateY(-50%) translateX(-50%)";
  } else if (x === "left" && y === "center") {
    element.style.top = "50%";
    element.style.left = "0";
    element.style.transform = "translateY(-50%) translateX(-100%)";
  } else if (x === "right" && y === "center") {
    element.style.top = "50%";
    element.style.right = "0";
    element.style.transform = "translateY(-50%) translateX(100%)";
  }
  // Apply horizontal positioning
}

export default applyPopoverPosition;

// Example usage:
// const popover = document.querySelector(".popover");
// applyPopoverPosition(popover, "center", "top");
