import { uniqueId } from "lodash";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import DropdownWrapper from "../../components/DropdownWrapper";
import { ORIGIN_TOP_RIGHT } from "../../utils/reposition";
import { BiPencil } from "react-icons/bi";
import classNames from "classnames";

const LabelCheckbox = ({ id, label, color = "violet" }) => {
    const inputId = id || uniqueId("label-");

    return (
        <div className="flex items-center gap-x-2">
            <input id={inputId} type="checkbox" />

            <label
                htmlFor={inputId}
                className={classNames(
                    "w-full flex items-center px-5 h-10 rounded-lg cursor-pointer gap-x-2",
                    `bg-${color}-200`
                )}
            >
                <div className={classNames("w-3 h-3 rounded-full", `bg-${color}-500`)}></div>
                {label}
            </label>

            <button className="w-10 h-10 flex items-center justify-center flex-shrink-0 hover:bg-slate-200 rounded-lg">
                <BiPencil />
            </button>
        </div>
    );
};

export default forwardRef(function LabelDropdown({}, ref) {
    const [visible, setVisible] = useState(false);
    const [anchor, setAnchor] = useState();

    const show = (target) => {
        setVisible(true);
        setAnchor(target);
    };

    const hide = () => {
        setVisible(false);
        setAnchor(undefined);
    };

    useImperativeHandle(ref, () => ({
        show,
        hide,
    }));

    return (
        <DropdownWrapper anchor={anchor} visible={visible} onTapOutside={hide}>
            <div className="w-96 bg-white rounded-lg flex flex-col shadow-md p-5">
                <span className="text-sm font-medium mb-2">Labels</span>

                <div className="flex flex-col gap-y-5 mb-5">
                    <LabelCheckbox label="Sample" />
                </div>

                <button className="px-5 py-2 text-sm bg-slate-200 rounded-lg">Create a new label</button>
            </div>
        </DropdownWrapper>
    );
});
