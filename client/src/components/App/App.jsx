import { io } from "socket.io-client";

export default function App(){
	const socket = io();
	return <>
		<p>Hello world.</p>
	</>;
};