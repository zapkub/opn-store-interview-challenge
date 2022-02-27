import React, { ComponentType } from "react"



type RemovePatientButtonComponent = ComponentType<{ disabled?: boolean, onClick: (evt: React.MouseEvent<HTMLButtonElement>) => void}>
export const RemovePatientButton: RemovePatientButtonComponent = ({ onClick, disabled }) => {

    return (
        <button disabled={disabled} className="RemovePatientButton" onClick={onClick}>Remove Patient</button>
    )
}