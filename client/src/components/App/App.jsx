import {useEffect, useRef, useState} from "react";
import { io } from "socket.io-client";
import "./normalize.css";
import "./App.css";

export default function App(){
	const [nickname, setNickname] = useState("");
	const [myMessage, setMyMessage] = useState("");
	const [messagesList, setMessagesList] = useState([]);
	const [isConnected, setIsConnected] = useState(false);

	const socket = useRef(null);

	useEffect(() => {
		socket.current = io({autoConnect: false});
		isConnected ? socket.current.connect() : null;
		
		return () => {
			socket.current.disconnect();
		};
	}, [isConnected]);

	useEffect(() => {
		socket.current.on("message", (data) => {
			setMessagesList(prevData => (
				[...prevData, data]
			));
		});

		return () => {
			socket.current.off("message");
		};
	}, [myMessage]);

	function handleChange(e, target){
		switch(target){
			case "nickname": setNickname(e.target.value); break;
			case "myMessage": setMyMessage(e.target.value); break;
			default: break;
		};
	};

	function handleSubmit(e, target){
		e.preventDefault();
		switch(target){
			case "nickname":
				setIsConnected(true);
				break;
			case "myMessage":
				socket.current.emit("message", `${nickname}: ${myMessage}`);
				setMyMessage("");
				document.getElementById("myMessage").value = "";
				break;
			default: break;
		};
	};

	return <>
		<header>
			<img src="assets/favicon.svg" alt="" />
			<h1>Mood Chat</h1>
		</header>
		<main>
			{!isConnected
				? <form onSubmit={(e) => handleSubmit(e, "nickname")}>
					<label htmlFor="nickname">Choose your nickname</label>
					<input
						type="text"
						name="nickname"
						required
						onChange={(e) => handleChange(e, "nickname")} />
					<button>Log In</button>
				</form> : null}
			{isConnected
				? <form onSubmit={(e) => handleSubmit(e, "myMessage")}>
					<input
						type="text"
						id="myMessage"
						required
						onChange={(e) => handleChange(e, "myMessage")} />
					<button>Send</button>
				</form> : null}
		</main>
	</>;
};