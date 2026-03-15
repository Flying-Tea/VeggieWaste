# VeggieWaste

Unsure about the freshness of your vegetables or fruits? This app allows you to get a second opinion on the state of your veggies! Built for the 2026 Hack For Humanity Competition. This project uses MobileNetV3 as the base model and further trains it to recognize mould on fruits and vegetables. Using ONNX to export the model into a C# backend for quicker loading and access times.

Ranked #27
Competition Closing Ceremony: https://www.youtube.com/watch?v=G0ZlTZIEiIQ

## The Problem

Food waste is a major global issue, with humanity discarding more than 1 billion tons of edible food each year. As food is thrown out just because it looks questionable (e.g., bruising or looks cheap), this leads to:

- Unnecessary food waste
- Increased environmental impact
- Higher grocery costs

### The Solution

**VeggieWaste** uses machine learning to analyze images of vegetables to determine whether they are **fresh** or **rotten**, helping users make educated decisions.

### Features

- Image upload via browser
- Freshness classification via AI
- Confidence scoring for transparency
- ONNX model inference in the backend

![App Image](/Examples/Example1.png)

## Tech Stack

#### Frontend

- React + Typescript
- Vite
- TailwindCSS
- Axios

#### Backend

- ASP.NET Core Web API
- ONNX runtime
- Imagesharp

#### Machine Learning

- **MobileNetV3** Convolutional Neural Network
- Light weight and high accuracy-to-performance ratio
- Exported to ONNX for cross-platform inference
- Real-time image classification

### How It Works

1. The user sends an image through the web interface, where it is then sent to the backend.
2. The backend receives the image, then:
   - Preprocesses the image
   - Runs inference using **MobileNetV3-based ONNX model** that was trained using 10,000+ images.
3. The API returns the classification and confidence score.
4. The frontend displays the result instantly.

## Running Locally

### Prerequisites

- Node.js
- .NET 10+
- Git

#### Backend Setup

```bash
dotnet run
```

Runs on:
A local host of your choice.

#### Frontend Setup

```bash
npm install
npm run dev
```

Runs on:
A local host of your choice.

---

## Dataset

[The dataset used in this project is from Kaggle, made by **Swoyam Nayak**.](https://www.kaggle.com/datasets/swoyam2609/fresh-and-stale-classification)

### Special Thanks To

- Insomnia for API Testing
- Ngrok for LAN testing across devices
- Hack For Humanity for hosting this hackathon
