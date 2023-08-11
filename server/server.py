import os
from dotenv import load_dotenv
from flask import Flask, request
from flask_cors import CORS
from flask_socketio import SocketIO

load_dotenv()
app = Flask("server")
CORS(app)
socketio = SocketIO(
    app,
    cors_allowed_origins=os.environ["CORS_ORIGINS"])

users = {}

@app.route("/")
def index():
    return ""

@socketio.on("disconnect")
def deleteUser():
    if request.sid in users:
        socketio.emit("message", f"{users[request.sid]} disconnected.")
        del users[request.sid]
        socketio.emit("usersUpdate", [nickname for nickname in users.values()])

@socketio.on("message")
def transmit(message):
    socketio.emit("message", f"{users[request.sid]}: {message}")

@socketio.on("check")
def check(nickname):
    if nickname in users.values():
        return False, "Nickname already in use."
    users[request.sid] = nickname
    socketio.emit("message", f"{nickname} connected.", include_self=False)
    socketio.emit("usersUpdate", [nickname for nickname in users.values()])
    return True, ""

if __name__ == "__main__":
    socketio.run(
        app,
        host=os.environ["HOST"],
        port=os.environ["PORT"],
        debug=True)