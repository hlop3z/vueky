import { directive, inject, ripple } from "./utils/__init__.ts";
import getPosition from "./utils/internal/position.ts";
import setPopover from "./utils/internal/popover.ts";

inject(ripple.css, "ripple");

// @ts-ignore
export default function (App: any) {
  return {
    /**
     * @directive => Ripple
     */
    ripple: ({ el: element, get, exp }: any) => {
      exp ? ripple.directive(element, get()) : ripple.directive(element);
    },
    /**
     * @directive => Style
     */
    style: ({ el: element, arg: value, exp: expression, get, effect }: any) => {
      if (value && expression) {
        element.style[value] = get();
        effect(() => {
          element.style[value] = get();
        });
      }
    },
    /**
     * @directive => CSS
     */
    css: ({ el: element, arg, exp, get, modifiers, effect }: any) => {
      directive.object("css", element);

      if (arg === "on" && exp) {
        const value = get();
        element.__dict__.css.on = value.split(" ").filter((x: any) => x);
      } else if (arg === "off" && exp) {
        const value = get();
        element.__dict__.css.off = value.split(" ").filter((x: any) => x);
      } else if (exp) {
        if (modifiers) {
          if (modifiers.hide) {
            element.style.display = "none";
            element.style.pointerEvents = "none";
          }
        }
        effect(() => {
          const isActive = get();
          const cssON = element.__dict__.css.on;
          const cssOFF = element.__dict__.css.off;
          if (isActive) {
            element.style.display = "";
            element.style.pointerEvents = null;
            if (cssON) {
              element.classList.add(...cssON);
            }
            if (cssOFF) {
              element.classList.remove(...cssOFF);
            }
          } else {
            element.style.pointerEvents = "none";
            if (cssON) {
              element.classList.remove(...cssON);
            }
            if (cssOFF) {
              element.classList.add(...cssOFF);
            }
          }
        });
      }
    },
    /**
     * @directive => Hover
     */
    hover: ({ el: element, get }: any) => {
      const method = get();

      const handler = (value: boolean) => (event: any) => {
        const args = directive.response(element, { value, event });
        if (method) {
          method(args);
        }
      };
      const setON = handler(true);
      const setOff = handler(false);

      // Add Listener
      element.addEventListener("mouseenter", setON, { passive: true });
      element.addEventListener("mouseleave", setOff, { passive: true });

      // Remove Listener
      return () => {
        element.removeEventListener("mouseenter", setON);
        element.removeEventListener("mouseleave", setOff);
      };
    },
    /**
     * @directive => Swipe
     */
    swipe: ({ el: element, get }: any) => {
      const method = get();

      const onSwipe = (value: any) => {
        const args = directive.response(element, { value });
        if (method) {
          method(args);
        }
      };

      let touchStartX: any = null;
      let touchStartY: any = null;
      const MIN_SWIPE_DISTANCE = 50;

      const handleTouchStart = (event: any) => {
        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;
      };

      const handleTouchEnd = (event: any) => {
        if (touchStartX === null || touchStartY === null) return;

        const touchEndX = event.changedTouches[0].clientX;
        const touchEndY = event.changedTouches[0].clientY;

        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;

        if (
          Math.abs(deltaX) > MIN_SWIPE_DISTANCE ||
          Math.abs(deltaY) > MIN_SWIPE_DISTANCE
        ) {
          if (Math.abs(deltaX) > Math.abs(deltaY)) {
            onSwipe(deltaX > 0 ? "right" : "left");
          } else {
            onSwipe(deltaY > 0 ? "down" : "up");
          }
        }

        touchStartX = null;
        touchStartY = null;
      };

      // Add Listener
      element.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });
      element.addEventListener("touchend", handleTouchEnd, { passive: true });

      // Remove Listener
      return () => {
        element.removeEventListener("touchstart", handleTouchStart);
        element.removeEventListener("touchend", handleTouchEnd);
      };
    },
    /**
     * @directive => Scroll
     */
    scroll: ({ el: element, get }: any) => {
      const method = get();

      const handler = (event: any) => {
        const args = directive.response(self, {
          value: {
            x: event.target.scrollLeft,
            y: event.target.scrollTop,
          },
          event,
        });
        if (method) {
          method(args);
        }
      };

      // Add Listener
      element.addEventListener("scroll", handler, { passive: true });

      // Remove Listener
      return () => {
        element.removeEventListener("scroll", handler);
      };
    },
    /**
     * @directive => Popover
     */
    popover: ({ el: element, arg, get }: any) => {
      directive.object("space", element);
      directive.object("pos", element);

      function setSpace(args: any) {
        // Reset styles
        element.style.paddingLeft = null;
        element.style.paddingRight = null;
        element.style.paddingBottom = null;
        element.style.paddingTop = null;
        if (args.x === "center") {
          if (args.x === "right") {
            element.style.paddingLeft = element.__dict__.space.x;
          }
          if (args.x === "left") {
            element.style.paddingRight = element.__dict__.space.x;
          }
        } else if (args.x === "right") {
          element.style.paddingLeft = element.__dict__.space.x;
        } else if (args.x === "left") {
          element.style.paddingRight = element.__dict__.space.x;
        }

        if (args.y === "top") {
          element.style.paddingBottom = element.__dict__.space.y;
        } else if (args.y === "bottom") {
          element.style.paddingTop = element.__dict__.space.y;
        }
      }

      if (arg === "space") {
        const data = get();
        element.__dict__.space = data;
        if (element.__dict__.pos) {
          setSpace(element.__dict__.pos);
        }
      }
      if (!arg) {
        const _data = get();
        const data = { ..._data };

        // element.style.display = "none";
        element.style.position = "absolute";
        element.parentNode.style.position = "relative";

        // Method
        function positionChange() {
          if (_data.x === "auto" || _data.y === "auto") {
            const pos = getPosition(element.parentNode);
            if (_data.y === "auto") {
              data.y = pos.inverted.y;
            }
            if (_data.x === "auto") {
              data.x = _data.y === "center" ? pos.inverted.x : pos.x;
            }
          }
          if (element.__dict__.space) {
            setSpace(data);
          }

          // console.log(element.__dict__.space, data.x, data.y);
          element.__dict__.pos = { ...data };
          setPopover(element, data.x, data.y);
        }

        // Set Position
        positionChange();
        if (_data.x === "auto" || _data.y === "auto") {
          // Interval
          const intervalId = setInterval(positionChange, 100);

          // Cleanup
          return () => {
            clearInterval(intervalId);
          };
        }
      }
    },
  };
}
