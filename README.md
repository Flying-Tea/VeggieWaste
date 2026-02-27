# VeggieWaste

Unsure about your vegtables or fruits freshness? This app allows you to get a second opinion on the state of your veggies! Built for the 2026 Hack For Humanity Competition. This project uses MobileNetV3 as a base model, then further trained to recognize the mold on vegtables and fruits. Using ONNX to export the model into a C# backend for quicker loading and access times.

## The Problem

Food waste is a major global issue as a whole humanitiy throws out 1+ Billion tons of edible food each year. As food is thrown out just because it looks questionable (e.g bruising or looks cheap) this leads to:

- Unnecessary food waste
- Increased environment impact
- Higher grocery costs

### The Solution

**VeggieWaste** uses machine learning to analyze images of vegtables to determine whether they are **fresh** or **rotten**, helping users make educated decisions.

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
- Exported to ONNX for cross-platform inferance
- Real-time image classifcation

### How It Works

1. The user sends an image through the web interface, where it is then sent to the backend.
2. The backend recieves the image then:
   - Preprocesses the image
   - Runs inferance using **MobileNetV3-based ONNX model** that was trained using 10,000+ images.
3. The API returns the classifcation and confidence score.
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

[The dataset used in this project is from Kaggle made by **Swoyam Nayak**.](https://www.kaggle.com/datasets/swoyam2609/fresh-and-stale-classification)
