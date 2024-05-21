# Multi-class Image Segmentation using UNETR

⚡Combining the power of Transformers with UNet for state-of-the-art image segmentation task💪  <br><br>
**This is Module 2 of UNETR which covers backend development and deployment on the cloud**  
Module 1. [UNETR-MachineLearning](https://github.com/Taha0229/UNetR-MachineLearning)  
Module 2. [Develop and Deploy Backend of UNETR ](https://github.com/Taha0229/UNetR-slim-backend)   
Module 3. [Develop and Deploy Frontend of UNTER](https://github.com/Taha0229/UNetR-frontend)

# Project Brief

In October 2021, Ali Hatamizadeh et al. published a paper titled "UNETR: Transformers for 3D Medical Image Segmentation," introducing the UNETR architecture, which outperforms other segmentation models. In essence, UNETR utilizes a contracting-expanding pattern consisting of a stack of transformer as the encoder which is connected to the CNN-based decoder via skip connections, producing segmented image. 
<br><br>
This project aims to implement the UNETR architecture as described in the paper, training it on a custom multi-class dataset for facial feature segmentation. The project involves developing the machine learning model, backend, and frontend for the application. The UNETR model is served via a REST API using Django REST framework to a Next.js frontend, with the frontend and backend deployed separately on Vercel and AWS, respectively. This tech stack selection ensures high scalability, performance, and an excellent UI/UX.
<br><br>

**Read [this](#important-note) note before reading ahead**

# Module Overview
In this module, I have shown, how to develop and deploy an interactive frontend using the below mentioned tech stack to use/consume the ML model built in Module 1. [UNETR-MachineLearning](https://github.com/Taha0229/UNetR-MachineLearning) which is being served by a Django backend built in Module 2. [Develop and Deploy Backend of UNETR ](https://github.com/Taha0229/UNetR-slim-backend).  
The main objective is to build a minimalistic yet beautiful UI in which we can upload images to inference on.

## Tech Used
1. **Next.Js:** A modern React.Js framework for building performant and interactive web applications.
2. **Tailwind CSS:** A utility-first CSS framework that streamlines web development by providing a set of pre-designed utility classes.
3. **NextUI:** Offers pre built, fully customizable UI components based on Tailwind CSS and Framer Motion.
4. **Vercel:** Frontend-as-a-service for deploying Next.Js app on the edge.

# How it works? 

1. Convert the uploaded image to a Base64 string.
2. Use regex to trim the string and format it appropriately, then preview it to the user.
3. Temporarily store the image string and name.
4. Send the data as a JSON object to the Django API.
5. Display the inferred Base64 image string returned by the server to the user.


## Workflow

**Workflow for implementing from scratch:**
1. Create Next app
2. Setup up and configure NextUI
3. Develop the required pages
4. Deploy on Vercel

**Workflow for implementing by cloning:**
1. Setup Next app
2. Deploy on Vercel


# Implementing the frontend from scratch
For the implementation, I presume you are familiar with Next.Js

### Step 1: Create Next app
1. Open the folder in a terminal in which you want to create the app.
2. Run: `npx create-next-app`
3. Choose the following configurations
```
What is your project named?  **frontend**
Would you like to use TypeScript? **Yes**
Would you like to use ESLint?  **Yes**
Would you like to use Tailwind CSS? **Yes**
Would you like to use `src/` directory? **Yes**
Would you like to use App Router? (recommended) **Yes**
Would you like to use Turbopack for `next dev`?  **Yes**
Would you like to customize the default import alias (@/*)?  **No** 
```
4. Change the directory to `frontend` using: `cd frontend`

Use the command `npm run dev` to run the Next app on local host, in any step, as required.

### Step 2: Setup and configure NextUI
Follow the instruction provided by the official NextUI [documentation](https://nextui.org/docs/frameworks/nextjs#add-dependencies)
1. Install the dependencies using:  
`npm i @nextui-org/react framer-motion` <br><br>

2. Configure `tailwind.config.js` as follows:
```
import {nextui} from "@nextui-org/react";  // modified


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}", // modified
  ],
  theme: {
    extend: {},
  },
  plugins: [nextui()], // modified
};
```

3. Create a file - `providers.jsx` inside the `app` directory. Add the following code in the file: 
```
'use client'

import {NextUIProvider} from '@nextui-org/react'

export function Providers({children}) {
  return (
    <NextUIProvider>
      {children}
    </NextUIProvider>
  )
}
```
4. Add the provider to the `RootLayout` in `layout.js` as follows:  
```
import { Providers } from "./providers";
... 

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}> 
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
```
5. Test the implementation: stop and restart the server as we have changed the `tailwind.config.js` file. Clear `page.js` then add a NextUI button as follows:  
```
import {Button} from '@nextui-org/button'; 

const page = () => {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  )
}
 ```
If a NextUI button appears, we are good to go. Otherwise, re-iterate the process and look into the official [docs](https://nextui.org/docs/frameworks/nextjs#add-dependencies).

### Step 3: Develop the required pages
This the file structure we intend to build inside the `src` directory:

```
├───app
│   │   favicon.ico
│   │   globals.css
│   │   layout.js
│   │   page.js
│   │   providers.jsx
│   │
│   └───predict
│           page.jsx
│
└───components
    └───Header
            Acme.jsx
            NavBar.jsx
```

**1. Nav bar:** First we will build the Nav bar.  <br><br>
**1.1** Create the `components` file structure as mentioned above  <br><br>
**1.2** Copy the code for `Acme.jsx` from [here](https://github.com/Taha0229/UNetR-frontend/blob/master/src/components/Header/Acme.jsx) and for `NavBar.jsx` from [here](https://github.com/Taha0229/UNetR-frontend/blob/master/src/components/Header/NavBar.jsx).  <br><br>
**1.3** Import and add this Navbar in `layout.js`  

```
import { Providers } from "./providers";
import NavBar from "../components/Header/NavBar"
... 


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <NavBar/>
          {children}
        </Providers>
      </body>
    </html>
  );
}

```

**2. Landing Page:** Modify `page.js` in `app` directory. For this project I have kept it simple, you can customize it as you like or copy it from me from [here](https://github.com/Taha0229/UNetR-frontend/blob/master/src/app/page.js).

**3. Inference page:** For this, implement the logic as explained in the above [How it works?](#how-it-works) section.  <br><br>
Install `react-icons` using: `npm i react-icons`  <br><br>
**3.1** Create a file structure for `predict` directory as mentioned above.  <br><br>
**3.2** Copy and paste the code in `page.jsx` inside `predict` directory from<br><br> [here](https://github.com/Taha0229/UNetR-frontend/blob/master/src/app/predict/page.jsx).  
Key states in the implementations:
```
  const BASE_URL = "http://107.22.155.211:8000";          
  const [base64Image, setBase64Image] = useState(null);
  const [fileName, setFileName] = useState("default")
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  ```

Key functions:  
**1.** `handleFileChange(event)` : Does the followings   
**1.1** fetches the first file uploaded from `event.target.file` which happens to be an image in our use case.  
**1.2** Reads the file as a `Data URL` using `FileReader` class.  
**1.3** Converts image into a Base64 string and store in a `useState` hook.  

**2.** `handlePredict()` : Does the followings  
**2.1** Manages `Loading` state.   
**2.2** Prepare the object to be sent  server. Trim the string based on regex.  
**2.3** Make a POST request using `fetch` API to the Django server.  
**2.4** Manage and handle response and error respectively.  

**4.** Custom pages: I have implemented an extra `contact` page. Similarly, you can add any other pages as you like.   

Just create a folder by the name of the route and add a `page.js` file containing the code for it.

### Step 2: Deploy on Vercel
Follow the steps in the next to the next section

# Implementing the frontend by Cloning 
### Step 1: Fork and Clone the repo
1. First, fork the repo so you can push the changes into your own repo and eventually, deploy the app on Vercel. <br><br>
2. Use the following command to clone:  
`git clone [url of your repo]` <br><br>
3. Change the directory:
`cd UNetR-frontend` <br><br>
4. Run the app:  
`npm run dev`  <br><br>
You can also use `npm run build` to examine the final build that will be deployed. Use `npm run start` to serve the build.

### Step 2: Deploy on Vercel
Follow the steps in the next section

# Deploy on Vercel
Deploying on Vercel is pretty easy also it offers a very generous free tier making it a prime choice for our Next app. 
1. Push your code into your GitHub  
**1.1.** Check your remote repository, and update if required.  
`git remote -v`  <br><br>
**1.2.** Add all the changes to stage area:    
`git add .`  <br><br>
**1.3.** Commit these change:   
`git commit -m "commit message`<br><br>
**1.4.** Push these changes:  
`git push` (if the upstream reference is set for the local and remote branch) or `git push -u [name of your remote repo] [main/master branch]`

2. Configure Vercel  
**2.1.** Login in to Vercel, and complete the initial setup. Connect it with your GitHub.  
**2.2.** Add a new project by importing the repo from your GitHub by selecting it from the list of repos.  
**2.3.** Configure the project (change name if required) and click on `Deploy`.  
**2.4.** Vercel will build the app for you. The logs can be found in the dashboard.  

3. Access the frontend with provided domain

# Important Note:
1. In this full implementation of the project that is developing the ML model, developing and deploying the frontend and the backend, the project will only work if either the frontend is running on the localhost or if the backend is secured by `https` protocol. This is due to `Mixed Content` error: 
`Mixed Content: The page at 'https://your-app.vercel.app' was loaded over HTTPS, but requested an insecure resource 'http://your.backend.aws.ip'. This request has been blocked; the content must be served over HTTPS.`  
 While setting up the outbound rules for the backend we opted for a custom TCP protocol which is configured for only `http` request, and for `https` request we would need `SSL/TCL` certificates. You can get these certificates by purchasing a domain and configuring it on AWS. At the moment, I am looking forward to implement SSL certificates via `Let's Encrypt` ([link](https://letsencrypt.org/)).  
The solution would require setting up an `Nginx` reverse proxy for the Django backend configuring the certificates.

2. The complete implementation is valid and just requires an additional Nginx setup.


### GitHub Commit message format
Feat– feature

Fix– bug fixes

Docs– changes to the documentation like README

Style– style or formatting change 

Perf – improves code performance

Test– test a feature