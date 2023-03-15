import React from "react"
import "./style.css"
import { Icon } from '@iconify/react';

export default function SuccessTxt(props) {
    return(
        <>
        <div className="flex-row-center">
        <p className="success">{props.text}</p>
        <Icon icon="akar-icons:check" />
        </div>
        </>
    )}