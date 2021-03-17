import React, { useState, useEffect } from 'react'

function CheckForm() {

    const [formData, setFormData] = useState("");
    const [checked, setChecked] = useState([]); // categories
    const [categories, setCategories] = useState([
        { _id: "EN", name: "English", slug: "english" },
        { _id: "FR", name: "French", slug: "french" },
        { _id: "ES", name: "espanol", slug: "espanol" }
    ]);

    useEffect(() => {
        setFormData(new FormData());
    }, []);



    return (
        <div>
            
        </div>
    )
}

export default CheckForm


