# 📺 [VOD Frontend]([url](https://vod-fe.vercel.app)) (`vod-fe`)

This is the frontend for the Video On Demand (VOD) application that allows users to watch movies individually or join synchronized **watch parties** with friends. It is deployed using **Vercel**, while the backend is powered by **AWS Lambda, API Gateway, WebSocket API**, and **DynamoDB**.

---
Live Demo: https://vod-fe.vercel.app

⚠️ Note: This demo is hosted on Vercel and may be unavailable in the future due to resource limits or project changes.

## 🚀 Features

- 🔐 OAuth-based login
- 🎥 Custom video player
- 👥 Create or join watch parties (synchronized playback)
- 🌐 Real-time WebSocket connection for `play/pause/seek` sync
- 🔄 UI updates in real-time based on shared room state
- ☁️ Frontend deployed on Vercel



## 🧱 Architecture Overview

Frontend (Next.js @ Vercel)
|
| --> REST API → AWS API Gateway → Lambda
|
| --> WebSocket → AWS WebSocket API → Lambda → DynamoDB

yaml
Sao chép
Chỉnh sửa



🔌 How WebSocket Sync Works
When a user creates or joins a room, the client opens a WebSocket connection to AWS.

If the host triggers play, pause, or seek, a signal is sent to the server.

AWS Lambda distributes this message to all connected clients in the room.

Other clients update their video playback state accordingly → synchronized experience.

## 🧑‍💻 Tech Stack
Next.js

** React

** Tailwind CSS

** Vercel

** AWS Lambda

** API Gateway + WebSocket

** DynamoDB


## 📮 Contact: mathanhthien@gmail.com


