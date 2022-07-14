import {useState} from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [thumbnail, setThumbnail] = useState(null);
    return (
        <form>
            <h2>Sign Up</h2>

        </form>
    );
}