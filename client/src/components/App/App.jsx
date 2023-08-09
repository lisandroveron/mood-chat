import {useEffect, useRef, useState} from "react";
import { io } from "socket.io-client";
import "./normalize.css";
import "./App.css";

export default function App(){
	const [message, setMessage] = useState("");
	const [messagesList, setMessagesList] = useState([]);

	const socket = useRef(null);

	useEffect(() => {
		socket.current = io({autoConnect:false});
		socket.current.connect();

		return () => {
			socket.current.disconnect();
		};
	}, []);

	function handleChange(e){
		setMessage(e.target.value);
	};

	function handleSubmit(e){
		e.preventDefault();
		socket.current.emit("message", message);
		setMessage("");
		const input_message = document.getElementById("message");
		input_message.value = "";
	};

	return <>
		<header>
			<img src="assets/favicon.svg" alt="" />
			<h1>Mood Chat</h1>
		</header>
		<main>
			<form onSubmit={handleSubmit}>
				<input type="text" id="message" name="message" onChange={handleChange} />
				<button>Send</button>
			</form>
			<p>{message}</p>
		</main>
	</>;
};