export const ReverseAxis = {
  left: "right",
  right: "left",
  top: "bottom",
  bottom: "top",
  center: "center",
};

function horizontalPosition(element: any, center = false) {
  const childRect = element.getBoundingClientRect();
  const distanceToLeft = childRect.left;
  const distanceToRight = Math.round(window.innerWidth - childRect.right);
  const halfwayPoint = Math.round(window.innerWidth / 2);

  if (distanceToLeft < halfwayPoint && distanceToRight < halfwayPoint) {
    if (center === true) {
      return "center";
    } else {
      // Default
      return "left";
    }
  } else if (distanceToLeft < distanceToRight) {
    return "left";
  } else {
    return "right";
  }
}

function verticalPosition(element: any, center = false) {
  const childRect = element.getBoundingClientRect();
  const distanceToTop = childRect.top;
  const distanceToBottom = window.innerHeight - childRect.bottom;
  const halfwayPoint = window.innerHeight / 2;

  // const threshold = 10;

  if (distanceToTop < halfwayPoint && distanceToBottom < halfwayPoint) {
    if (center === true) {
      return "center";
    } else {
      return "top";
    }
    // Default
  } else if (distanceToTop < distanceToBottom) {
    return "top";
  } else {
    return "bottom";
  }
}

export default function elementPosition(element: any, config?: any) {
  const center = config || {};
  const axisY = verticalPosition(element, center.y);
  const axisx = horizontalPosition(element, center.x);
  const setup = {
    x: axisx,
    y: axisY,
    inverted: {
      x: ReverseAxis[axisx],
      y: ReverseAxis[axisY],
    },
  };
  return setup;
}

/*
 560.90625 150.09375
 304.90625 406.09375
 560.90625 150.09375
 304.90625 406.09375
 560.90625 150.09375
 304.90625 406.09375
 560.90625 150.09375
 304.90625 406.09375
 560.90625 150.09375
 304.90625 406.09375
 560.90625 150.09375
 304.90625 406.09375
 560.90625 150.09375
 304.90625 406.09375
 560.90625 150.09375
 304.90625 406.09375
 560.90625 150.09375
 */
