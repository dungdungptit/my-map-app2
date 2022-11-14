import { useState } from "react";

const Car = () => {
    const [name, setName] = useState("");

    const handleChage = (e) => {
        setName(e.target.value);
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Hello ${name}`);
        setName("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <select value={name} onChange={handleChage}>
                <option value={"volvo"} id={1}>Volvo</option>
                <option value={"saab"}>Saab</option>
                <option value={"mercedes"}>Mercedes</option>
            </select>
            <button type="submit">Submit</button>
        </form>
    )
}

export default Car;