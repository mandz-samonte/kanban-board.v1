import React, { forwardRef, useImperativeHandle, useState } from "react";
import DropdownWrapper from "../../components/DropdownWrapper";
import { ORIGIN_TOP_RIGHT } from "../../utils/reposition";

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
            <div className="w-64 bg-white rounded-lg flex flex-col shadow-md">
                <button className="px-5 py-2">Sample Dropdown</button>
            </div>
        </DropdownWrapper>
    );
});
