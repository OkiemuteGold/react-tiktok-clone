import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'

const Detail = () => {
    const router = useRouter();
    console.log(router, router.query)

    return (
        <h1>Details</h1>
    )
}

export default Detail