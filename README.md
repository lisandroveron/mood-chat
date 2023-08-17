# Mood Chat

*Chat web application with real-time sentiment analysis, using React and Flask. Messages are displayed in colors that reflect your emotional polarity.*

The Chat Web Application is an interactive platform developed using React on the frontend and Flask on the backend. Its main feature is the ability to analyze the sentiment of messages in real time, providing an enriching experience for users by visually reflecting the emotions associated with each message.

The sentiment analysis functionality is achieved through the use of the TextBlob library, which allows evaluating the emotional polarity and subjectivity of each message. Polarity refers to whether the sentiment is positive, negative, or neutral, while subjectivity indicates how objective or subjective the message itself is.

The visual representation of messages in the user interface is achieved by assigning specific colors to each sentiment category. Messages with positive polarity are highlighted in green, and the level of subjectivity influences the intensity of the color by changing the alpha value in the rgba CSS property. The more subjective the message, the higher the alpha value, resulting in a more vibrant green color.

Neutral messages are represented in a shade of gray, following a similar logic to that of positive messages in terms of subjectivity adjustment.

On the other hand, messages with negative sentiments are presented in a striking red color, which instantly captures the user's attention and communicates the negative nature of the sentiment expressed in the message.

This application not only enables interactive communication, but also provides an additional visual dimension to the process of exchanging messages. By visualizing message sentiments in the form of colors, users can better understand the emotional atmosphere of the ongoing conversation and respond more appropriately and empathetically.

In short, the Chat Web App combines the sentiment analysis technology of TextBlob with the dynamic rendering capabilities of React and the API building power of Flask. The result is a unique chat experience that is not only text-based, but also taps into the emotional dimension of human communication.

Try the [live demo](http://moodchat.adaptable.app/)

**IMPORTANT NOTE**: Due to hosting limitations (NOT exclusive to adaptable.io, but to all hostings), the connection is closed after 30 seconds of being created, so it is necessary to restart the application by reloading the page. Keep in mind that this is due to the anti-scaling system of the hostings, if the code is executed in localhost, it will execute normally without problems. Below I will leave the instructions to run the application on the local host (your pc).

## How to run in local

To run the application code on your computer, follow the steps below.

**Note**: Remember, use `cd` command to move through directories. And, in Windows, use Git Bash console.

### Requisites

- [Git](https://git-scm.com/downloads)
- [Node](https://nodejs.org/en/download)
- [Python 3](https://www.python.org/downloads/)

### Clone the repository

`git clone https://github.com/lisandroveron/mood-chat.git && cd mood-chat`

**Note**: In the steps below, you need to open two terminals (or Git Bash). One inside "client" folder directory, and the another one in "server" folder.

### Install dependencies

In the "client" folder run:

- `npm install`

In the "server" folder run:

- `python3 -m venv venv && source venv/bin/activate && pip install -r requirements.txt`

### Run development servers

In "client" folder run:

- `npm run dev -- --host`

In "server" folder run:

- `source venv/bin/activate && flask -A server:app run --debug`

Now you can open in the [development server](http://localhost:5173).