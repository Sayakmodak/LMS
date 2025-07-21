# EduVerse LMS

EduVerse is a modern Learning Management System built with the MERN stack.  
It helps instructors create and sell courses, and helps learners browse, purchase, and track course progress.

## Installation

Clone the repository and install dependencies for both the backend and the frontend.

```bash
git clone https://github.com/Sayakmodak/LMS.git
```
## Install dependencies:
```bash
npm install
```
## Create a new .env.local file in the server folder and add the following:
```bash
MONGODB_URI=(your_mongodb_connection_string)
PORT=8080
SECRET_KEY=(Your Secret Key)
FRONTEND_URL=http:(Your Frontend URL)


# cloudinary setup
CLOUD_NAME=(Your cloud name)
API_KEY=(Your Key)
API_SECRET=(Your Key)

# Stripe setup
STRIPE_SECRET_KEY=(Your Key)
STRIPE_PUBLISHABLE_KEY=(Your Key)
WEBHOOK_ENDPOINT_SECRET=(Your Endpoint Key)
```

## Start the backend server
```bash
npm run dev
```
Open (http://localhost:8080) with your browser to see the result.

## Features
1. User authentication for students and instructors.

2. Create, update, publish/unpublish, and delete courses & lectures

3. Search and filter courses by category and price

4. Upload course thumbnails and lectures to Cloudinary

5. Payment integration with Stripe or Razorpay

6. Track student progress in enrolled courses

7. Modern UI with React and Tailwind CSS

8. Uses RTK Query for efficient API calls

## Tech Stack
Frontend: React, Redux Toolkit, RTK Query, Tailwind CSS

Backend: Node.js, Express.js

Database: MongoDB with Mongoose

Media: Cloudinary

Payments: Stripe

Auth: JWT
