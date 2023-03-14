import classNames from "classnames";
import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import Input from "../../components/Input";
import ModalWrapper from "../../components/ModalWrapper";
import Textarea from "../../components/Textarea";
import useOutsideTapHandler from "../../utils/useOutsideTapHandler";
import { AiOutlineTag } from "react-icons/ai";
import LabelDropdown from "./LabelDropdown";

export default forwardRef(function TaskModal({}, ref) {
    const panelRef = useRef();
    const [data, setData] = useState();
    const [visible, setVisible] = useState(false);
    const labelDropdownRef = useRef();

    const show = (data) => {
        setData(data);
        setVisible(true);
    };

    const hide = () => {
        setVisible(false);
        setData(null);
    };

    useImperativeHandle(ref, () => ({
        show,
        hide,
    }));

    useOutsideTapHandler(panelRef, hide);

    return (
        <>
            <ModalWrapper visible={visible}>
                <div
                    className={classNames(
                        "w-full shadow-xl shadow-black/10 rounded-xl transition-transform max-w-screen-lg bg-white flex h-full max-h-[700px]",
                        {
                            "-translate-y-[2rem]": !visible,
                        }
                    )}
                    ref={panelRef}
                >
                    <div className="flex flex-col flex-shrink-0 w-2/3 p-10 gap-y-5">
                        <Input label="Title" value={data?.title} />
                        <Textarea label="Description" vlaue={data?.description} />

                        <div className="w-full h-px bg-zinc-200 mx-10"></div>

                        <Textarea label="Comment" vlaue={data?.description} placeholder="Leave a comment" />
                    </div>
                    <div className="flex flex-col flex-shrink-0 bg-slate-200 w-1/3 rounded-r-xl">
                        <div className="flex flex-col border-b border-slate-300 px-5 py-10">
                            <button
                                onClick={(e) => labelDropdownRef.current.show(e.currentTarget)}
                                className="text-left px-5 py-2 bg-white rounded-lg flex items-center gap-x-2"
                            >
                                <AiOutlineTag />
                                Labels
                            </button>
                            <LabelDropdown ref={labelDropdownRef} />
                        </div>
                        <div className="flex flex-col px-5 py-10">
                            <button className="text-red-500 px-5 py-2 text-left font-medium">Delete</button>
                        </div>
                    </div>
                </div>
            </ModalWrapper>
        </>
    );
});
