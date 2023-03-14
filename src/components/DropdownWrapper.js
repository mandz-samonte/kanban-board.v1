import useOutsideTapHandler from "../utils/useOutsideTapHandler";
import { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import reposition, {
    ORIGIN_BOTTOM_LEFT,
    ORIGIN_TOP_LEFT,
    ORIGIN_BOTTOM_RIGHT,
    ORIGIN_TOP_RIGHT,
} from "../utils/reposition";

export default function DropdownWrapper({
    children,
    anchor,
    preferredOrigin = ORIGIN_TOP_LEFT,
    visible,
    onTapOutside,
    animate = true,
    triggerTapOutsideOnBlur = false,
    yOffset = 5,
}) {
    const [renderOrigin, setRenderOrigin] = useState(preferredOrigin);
    const [animating, setAnimating] = useState(animate);
    const rootRef = useRef(null);
    useOutsideTapHandler(rootRef, onTapOutside || (() => null), triggerTapOutsideOnBlur);

    useEffect(() => {
        if (!anchor) return;
        const cb = () => reposition(anchor, rootRef, preferredOrigin, setRenderOrigin, yOffset);
        if (visible) {
            cb();
            window.addEventListener("scroll", cb);
        } else {
            window.removeEventListener("scroll", cb);
        }
        return () => {
            if (cb) {
                window.removeEventListener("scroll", cb);
            }
        };
    }, [visible, anchor, rootRef, preferredOrigin]);

    useEffect(() => {
        if (animate) {
            setAnimating(!visible);
        }
    }, [animate, visible]);

    return (
        <div
            className={classNames("fixed z-50", {
                "scale-100": visible && (!animate || !animating),
                "scale-75": animate && animating,
                "transition-transform": animate,
                "opacity-0 pointer-events-none": !visible,
                "origin-top-left": animate && renderOrigin === ORIGIN_TOP_LEFT,
                "origin-top-right": animate && renderOrigin === ORIGIN_TOP_RIGHT,
                "origin-bottom-left": animate && renderOrigin === ORIGIN_BOTTOM_LEFT,
                "origin-bottom-right": animate && renderOrigin === ORIGIN_BOTTOM_RIGHT,
            })}
            ref={rootRef}
        >
            {children}
        </div>
    );
}
