"use client";
import dynamic from "next/dynamic";
const DynamicRegister = dynamic(
    () => import("@/components/Register"),
    {
        "ssr": false
    }
);
export default function SuperintendentePage () {

    return <DynamicRegister/>;

}
