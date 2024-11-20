import React from "react";
type DeleteOriginProps = {
    open: boolean;
    onClose: () => void;
    originId: number;
    origin: string;
};
declare const DeleteOrigin: React.FC<DeleteOriginProps>;
export default DeleteOrigin;
