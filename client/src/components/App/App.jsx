import {useEffect, useRef, useState} from "react";
import { io } from "socket.io-client";
import "./normalize.css";
import "./App.css";
import Message from "../Message/Message.jsx";

export default function App(){
	const [nickname, setNickname] = useState("");
	const [myMessage, setMyMessage] = useState("");
	const [isLogged, setIsLogged] = useState(false);
	const [usersList, setUsersList] = useState([]);
	const [messagesList, setMessagesList] = useState([]);

	const socket = useRef(null);

	useEffect(() => {
		socket.current = io({
			autoConnect: false,
			closeOnBeforeunload: true,
		});
		socket.current.connect();
		
		return () => {
			socket.current.disconnect();
		};
	}, []);

	useEffect(() => {
		socket.current.on("message", (data) => {
			setMessagesList(prevData => (
				[...prevData, data]
			));
		});

		socket.current.on("usersUpdate", (data) => {
			setUsersList(data);
		});

		return () => {
			socket.current.off("message", () => {});
			socket.current.off("usersUpdate", () => {});
		};
	}, []);

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
				socket.current.emit(
					"check",
					nickname,
					(validated, error) => {
						validated ? setIsLogged(true) : alert(error);
					}
				);
				break;
			case "myMessage":
				socket.current.emit("message", myMessage);
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
			{!isLogged
				? <form
					id="nicknameForm"
					onSubmit={(e) => handleSubmit(e, "nickname")}>
					<label htmlFor="nickname">Choose your nickname</label>
					<input
						type="text"
						name="nickname"
						autoFocus
						required
						onChange={(e) => handleChange(e, "nickname")} />
					<button>Log In</button>
				</form> : null}
			{isLogged
				? <div id="chatWindow">
					<div id="messagesList">
						{messagesList.map((item, index) => (
							<Message
								key={`message-${index}`}
								message={item.message}
								polarity={item.polarity}
								subjectivity={item.subjectivity}
							/>
						))}
					</div>
					<div id="usersList">
						{usersList.map((item, index) => (
							<p
								key={`user-${index}`}
								className="itemList">
								{item}
							</p>
						))}
					</div>
					<form
						id="myMessageForm"
						onSubmit={(e) => handleSubmit(e, "myMessage")}>
						<input
							type="text"
							id="myMessage"
							autoFocus
							required
							onChange={(e) => handleChange(e, "myMessage")} />
						<button>Send</button>
					</form>
				</div> : null}
		</main>
	</>;
};