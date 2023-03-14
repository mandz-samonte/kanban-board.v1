import ReactDOM from "react-dom";
import classNames from "classnames";

export default function ModalWrapper({ visible = false, className, children }) {
    return ReactDOM.createPortal(
        <div
            className={classNames(
                "fixed top-0 left-0 right-0 bottom-0 z-40 overflow-y-auto flex items-center justify-center bg-black/50",
                {
                    "opacity-0 pointer-events-none": !visible,
                },
                className
            )}
        >
            {children}
        </div>,
        document.body
    );
}
