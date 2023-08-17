import os
from dotenv import load_dotenv
from flask import Flask, request, render_template
from flask_cors import CORS
from flask_socketio import SocketIO
from deep_translator import GoogleTranslator
from textblob import TextBlob

load_dotenv()
app = Flask("server", static_folder="dist/assets/", template_folder="dist")
gt = GoogleTranslator(source="auto", target="en")
CORS(app)
if "CORS_ORIGINS" in os.environ:
    socketio = SocketIO(app, cors_allowed_origins=os.environ["CORS_ORIGINS"])
else:
    socketio = SocketIO(app)

users = {}

@app.route("/")
def index():
    return render_template("index.html")

@socketio.on("disconnect")
def deleteUser():
    if request.sid in users:
        socketio.emit("message", f"{users[request.sid]} disconnected.")
        del users[request.sid]
        socketio.emit("usersUpdate", [nickname for nickname in users.values()])

@socketio.on("message")
def transmit(message):
    blob = TextBlob(gt.translate(message))
    socketio.emit("message", {
        "message": f"{users[request.sid]}: {message}",
        "polarity": blob.sentiment.polarity,
        "subjectivity": blob.sentiment.subjectivity,
    })

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
