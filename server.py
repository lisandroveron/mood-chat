from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO, emit

app = Flask("server")
CORS(app)
socketio = SocketIO(
    app,
    cors_allowed_origins="*")

@app.route("/")
def index():
    return ""

if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=5000, debug=True)