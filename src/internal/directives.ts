import { directive, theme, inject, ripple } from "./utils/__init__.ts";
import Color from "./utils/internal/colors.ts";
import getPosition from "./utils/internal/position.ts";
import setPopover from "./utils/internal/popover.ts";

inject(ripple.css, "ripple");

export default function (App: any) {
  return {
    /**
     * @directive => Demo
     */
    other: (ctx: any) => {
      directive.object("other", ctx.el);
      console.log("Other", ctx.el.__dict__);

      // the element the directive is on
      // console.log(ctx.el.__dict__);

      // v-my-dir:foo -> "foo"
      // console.log(ctx.arg);

      // v-my-dir.mod -> { mod: true }
      // console.log(ctx.modifiers);

      // the raw value expression
      // e.g. v-my-dir="x" then this would be "x"
      // console.log(ctx.exp);
    },
    /**
     * @directive => Ripple
     */
    ripple: (ctx: any) => {
      const { el: element } = ctx;
      ctx.exp
        ? ripple.directive(element, ctx.get())
        : ripple.directive(element);
    },
    /**
     * @directive => Style
     */
    style: (ctx: any) => {
      const { el: element, arg: value, exp: expression } = ctx;
      if (value && expression) {
        element.style[value] = ctx.get();
      }
    },
    /**
     * @directive => Theme
     */
    theme: (ctx: any) => {
      const { el: element, arg, exp: expression } = ctx;
      const isAdmin = arg === "is";

      const actionTypes = ["theme", "theme_active", "theme_error"];
      actionTypes.forEach((type) => {
        directive.object(type, ctx.el);
      });

      if (isAdmin && expression) {
        ctx.effect(() => {
          const value = ctx.get();
          const dict = ctx.el.__dict__;

          const applyClasses = (activeType: string) => {
            Color.types.forEach((type) => {
              actionTypes.forEach((actionType) => {
                element.classList.remove(dict[actionType][type]);
              });
              if (dict[activeType][type]) {
                element.classList.add(dict[activeType][type]);
              } else if (dict.theme[type]) {
                element.classList.add(dict.theme[type]);
              }
            });
          };

          if ([true, "active"].includes(value)) {
            applyClasses("theme_active");
          } else if ([false, undefined, null, ""].includes(value)) {
            applyClasses("theme");
          } else if (value === "error") {
            applyClasses("theme_error");
          }
        });
      } else {
        if (expression) {
          const value = ctx.get();
          const setup: any = Color.setup({ arg });
          if (setup.base) {
            if (Color.types.includes(setup.type)) {
              const color = theme.class(setup.type, value);
              ctx.el.__dict__.theme[setup.type] = color;
              element.classList.add(color);
            }
          } else if (setup.active) {
            if (Color.types.includes(setup.type)) {
              const color = theme.class(setup.type, value);
              ctx.el.__dict__.theme_active[setup.type] = color;
            }
          } else if (setup.error) {
            if (Color.types.includes(setup.type)) {
              const color = theme.class(setup.type, value);
              ctx.el.__dict__.theme_error[setup.type] = color;
            }
          }
        }
      }
    },
    /**
     * @directive => CSS
     */
    css: (ctx: any) => {
      const { el: element } = ctx;
      directive.object("css", ctx.el);

      if (ctx.arg === "on" && ctx.exp) {
        const value = ctx.get();
        ctx.el.__dict__.css.on = value.split(" ").filter((x: any) => x);
      } else if (ctx.arg === "off" && ctx.exp) {
        const value = ctx.get();
        ctx.el.__dict__.css.off = value.split(" ").filter((x: any) => x);
      } else if (ctx.exp) {
        if (ctx.modifiers) {
          if (ctx.modifiers.hide) {
            element.style.display = "none";
            element.style.pointerEvents = "none";
          }
        }
        ctx.effect(() => {
          const isActive = ctx.get();
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
    hover: (ctx: any) => {
      const { el: element } = ctx;
      const method = ctx.get();

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
    swipe: (ctx: any) => {
      const { el: element } = ctx;
      const method = ctx.get();

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
    scroll: (ctx: any) => {
      const { el: element } = ctx;
      const method = ctx.get();

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
    popover: (ctx: any) => {
      const { el: element, arg } = ctx;

      function setSpace(args: any) {
        // Reset styles
        element.style.paddingLeft = null;
        element.style.paddingRight = null;
        element.style.paddingBottom = null;
        element.style.paddingTop = null;
        if (args.x === "center") {
          if (args.x === "right") {
            element.style.paddingLeft = element.__space__.x;
          }
          if (args.x === "left") {
            element.style.paddingRight = element.__space__.x;
          }
        } else if (args.x === "right") {
          element.style.paddingLeft = element.__space__.x;
        } else if (args.x === "left") {
          element.style.paddingRight = element.__space__.x;
        }

        if (args.y === "top") {
          element.style.paddingBottom = element.__space__.y;
        } else if (args.y === "bottom") {
          element.style.paddingTop = element.__space__.y;
        }
      }

      if (arg === "space") {
        const data = ctx.get();
        element.__space__ = data;
        if (element.__pos__) {
          setSpace(element.__pos__);
        }
      }
      if (!arg) {
        const _data = ctx.get();
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
          if (element.__space__) {
            setSpace(data);
          }

          // console.log(element.__space__, data.x, data.y);
          element.__pos__ = { ...data };
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
