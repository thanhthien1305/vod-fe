# 📺 VOD Frontend (`vod-fe`)

This is the frontend for the Video On Demand (VOD) application that allows users to watch movies individually or join synchronized **watch parties** with friends. It is deployed using **Vercel**, while the backend is powered by **AWS Lambda, API Gateway, WebSocket API**, and **DynamoDB**.

---

## 🚀 Features

- 🔐 OAuth-based login
- 🎥 Custom video player
- 👥 Create or join watch parties (synchronized playback)
- 🌐 Real-time WebSocket connection for `play/pause/seek` sync
- 🔄 UI updates in real-time based on shared room state
- ☁️ Frontend deployed on Vercel

---

## 🧱 Architecture Overview

Frontend (Next.js @ Vercel)
|
| --> REST API → AWS API Gateway → Lambda
|
| --> WebSocket → AWS WebSocket API → Lambda → DynamoDB

yaml
Sao chép
Chỉnh sửa

---

## ⚙️ Getting Started (Local)
1. Install dependencies
bash
Sao chép
Chỉnh sửa
pnpm install
Or use npm install if you're not using pnpm.

2. Create .env.local file
env
Sao chép
Chỉnh sửa
NEXT_PUBLIC_API_URL=https://your-api-gateway.amazonaws.com/dev
NEXT_PUBLIC_WS_URL=wss://your-websocket-url.amazonaws.com/dev
3. Run development server
bash
Sao chép
Chỉnh sửa
pnpm dev
🚀 Deploy on Vercel
1. Push the repository to GitHub or GitLab
2. Go to https://vercel.com and create a new project from your repo
3. Set environment variables in Vercel settings:
env
Sao chép
Chỉnh sửa
NEXT_PUBLIC_API_URL=https://your-api-gateway.amazonaws.com/dev
NEXT_PUBLIC_WS_URL=wss://your-websocket-url.amazonaws.com/dev

5. Click Deploy and you're live 🎉
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


