# 🚀 InterviewIQ-AI

> **An AI-powered Mock Interview Prep & Candidate Evaluation Platform** built using the MERN stack (MongoDB, Express, React, Node.js), powered by **Google Gemini 1.5/2.0 Pro/Flash APIs**, and utilizing **Puppeteer** for automated, high-fidelity resume generation.

---

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Google%20Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Gemini" />
  <img src="https://img.shields.io/badge/Puppeteer-40B5A4?style=for-the-badge&logo=puppeteer&logoColor=white" alt="Puppeteer" />
  <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="License" />
</p>

---

## 📌 Table of Contents

1. [Project Overview](#-project-overview)
2. [Key Features](#-key-features)
3. [Tech Stack](#-tech-stack)
4. [System Architecture](#-system-architecture)
5. [Complete Workflow](#-complete-workflow)
6. [Folder Structure](#-folder-structure)
7. [Database Design](#-database-design)
8. [Authentication Flow](#-authentication-flow)
9. [AI Workflow & Structured Outputs](#-ai-workflow--structured-outputs)
10. [Tailored ATS Resume Generation](#-tailored-ats-resume-generation)
11. [API Documentation](#-api-documentation)
12. [Installation & Setup](#-installation--setup)
13. [Environment Variables](#-environment-variables)
14. [Screenshots](#-screenshots)
15. [Challenges Faced & Solutions](#-challenges-faced--solutions)
16. [Key Learnings](#-key-learnings)
17. [Resume Bullet Points](#-resume-bullet-points)
18. [Interview Pitch (5-Minute Speakable guide)](#-interview-pitch-5-minute-speakable-guide)
19. [License & Contact](#-license--contact)

---

## 🔍 Project Overview

### The Problem
Traditional job seekers struggle to align their resumes and preparation strategies with specific job descriptions. Many apply blindly without knowing how well their profile matches the requirements, what technical concepts to study, or how to formulate answers to behavioral questions. 

### The Solution
**InterviewIQ-AI** bridges this gap. It acts as an automated career coach that:
- Evaluates candidate profiles against target job descriptions.
- Highlights core **skills gaps** and assigns them impact severities.
- Generates tailored, structured technical and behavioral mock interview questions.
- Creates day-by-wise structured study roadmaps.
- Uses AI to tailor their resume and compile it directly into an ATS-friendly, clean PDF using headless Chromium.

### Target Users
- **Job Seekers / Students** looking for a customized, data-driven interview preparation roadmap.
- **Bootcamp Graduates** wanting to practice role-specific behavioral/technical prompts.
- **Career Switchers** looking to quickly bridge skill gaps and tailor resumes for target roles.

---

## 🌟 Key Features

- [x] **Secure Authentication & Token Blacklisting:** Cookie-based JWT authentication with server-side blacklist verification for robust logouts.
- [x] **Intelligent PDF Resume Parsing:** Reads PDF resume uploads directly into raw text arrays on-the-fly (memory buffer parsing).
- [x] **Structured AI Output Modeling:** Leverages `zod` and `zod-to-json-schema` to enforce strict schema adherence for Gemini responses, ensuring parsing stability.
- [x] **Interactive Dashboard:** View match scores, detailed technical/behavioral mock questions, key skill gaps, and day-wise plans in a modern, dynamic glassmorphic card layout.
- [x] **Tailored ATS Resume & HTML-to-PDF compiler:** Prompts AI to write custom tailormade HTML stylesheets and renders them into professional PDF downloads using Puppeteer.
- [x] **Smart Fallbacks:** Generate interview strategies using *only* self-description parameters if no resume file is handy.
- [x] **Dynamic UX Touchpoints:** Drag-and-drop file upload zones with border hover animations, real-time character counters, and smooth loading spinners.

---

## 💻 Tech Stack

### Frontend
- **React (v19):** Declarative component-based UI.
- **React Router (v7):** Fast routing and route protection.
- **Sass (SCSS):** Structured CSS layout with flexible variables.
- **Axios:** CORS-enabled API client.

### Backend
- **Node.js & Express:** Lightweight, high-performance web server.
- **Multer:** Handles multipart file uploads (memory buffers).
- **PDF-Parse:** Extracts text content from PDF uploads.
- **Puppeteer:** Headless browser automation for high-precision HTML-to-PDF rendering.

### Database & Security
- **MongoDB & Mongoose:** Document-based storage for interview histories and users.
- **JWT (JsonWebToken):** Secure stateless authorization tokens.
- **Cookie-Parser:** Safe retrieval of secure token cookies.
- **BcryptJS:** Hashing algorithms for secure user credentials.

### Artificial Intelligence
- **Google GenAI SDK (`@google/genai`):** Communicates with Google's Gemini models.
- **Zod & Zod-to-JSON-Schema:** Enforces strict response schemas to prevent AI response drift.

---

## 🏗️ System Architecture

```text
       ┌────────────────────────┐
       │   React SPA (Client)   │
       └───────────┬────────────┘
                   │ HTTPS Request (JWT Cookie)
                   ▼
       ┌────────────────────────┐
       │  Express App (Server)  │
       └───────────┬────────────┘
                   ├───────────────────────────────┐
                   ▼                               ▼
       ┌──────────────────────┐          ┌───────────────────┐
       │   MongoDB Database   │          │   Puppeteer PDF   │
       │(Users, Plans, Tokens)│          │  (Headless Chrome)│
       └──────────────────────┘          └───────────────────┘
                   │
                   ▼
       ┌──────────────────────┐
       │  Google Gemini API   │
       │  (Structured JSON)   │
       └──────────────────────┘
```

The React frontend handles user authentication and input details. The Express backend handles JWT cookie verification, database CRUD operations, PDF text extraction, Puppeteer rendering, and structures user prompts to feed into the Gemini API.

---

## 🔄 Complete Workflow

```text
[User Access] ──► [Sign Up/Login] ──► [Target Job Details + Upload Resume (or Self-Desc)]
                                                    │
                                                    ▼
[Download PDF] ◄── [Puppeteer PDF Compiler] ◄── [Tailored Resume HTML] ◄── [Extract PDF Text]
      ▲                                                                          │
      │                                                                          ▼
[Dashboard UI] ◄─────── [Save MongoDB Document] ◄────── [Structured JSON] ◄── [Gemini AI Engine]
```

1. **User Auth:** User registers/logs in. JWT token is stored inside a secure cookie.
2. **Setup Prompt:** User pastes a target job description and uploads their resume (PDF) or inputs their professional details.
3. **Parse & Request:** The backend extracts resume text from the PDF using `pdf-parse`. The text is combined with the job description into a prompt structured around a strict Zod JSON schema.
4. **Structured Generation:** Gemini parses the inputs, scores the candidate's match percentage, identifies skill gaps, compiles technical/behavioral interview questions, and creates a study plan.
5. **Storage:** The structured object is returned, parsed, stored in MongoDB, and displayed on the dashboard.
6. **Resume Tailoring:** The user requests a tailored resume. Gemini outputs job-specific styled HTML, which Puppeteer processes into a downloadable PDF document.

---

## 📂 Folder Structure

```text
InterviewIQ-AI/
├── Backend/                     # Node.js backend
│   ├── src/
│   │   ├── config/              # Database connection setup
│   │   ├── controllers/         # Logic for auth and interview reports
│   │   ├── middlewares/         # JWT verification, upload limits, file parsing
│   │   ├── models/              # User, InterviewReport, and Token Blacklist schemas
│   │   ├── routes/              # Express endpoint paths
│   │   └── services/            # Gemini API and Puppeteer PDF compilers
│   ├── server.js                # App server listener & dotenv injection
│   └── package.json
│
├── Frontend/                    # React Vite frontend
│   ├── src/
│   │   ├── features/
│   │   │   ├── auth/            # Auth pages, hooks, contexts, & Header
│   │   │   └── interview/       # Dashboard pages, hooks, API contexts, styles
│   │   ├── style/               # Core button & SCSS layouts
│   │   ├── App.jsx              # Main context provider wrapper
│   │   └── main.jsx             # React DOM entry point
│   ├── vite.config.js
│   └── package.json
│
└── Screenshots/                 # Application screenshots
```

---

## 🗄️ Database Design

### User Model (`users`)
Stores core user details and credentials.
- `username` (String, Required, Unique): Account username.
- `email` (String, Required, Unique): Account email address.
- `password` (String, Required): Hashed password.

### Blacklist Model (`tokenBlacklist`)
Stores logged-out tokens to prevent token reuse.
- `token` (String, Required): Blacklisted JWT.
- `createdAt` (Date): Auto-purges tokens after expiry using MongoDB TTL indexes.

### Interview Report Model (`interviewreports`)
Stores detailed analysis records generated by Gemini.
- `user` (ObjectId): References `users.id`.
- `jobDescription` (String, Required): Text description of the target job.
- `resume` (String): Extracted text from candidate's resume.
- `selfDescription` (String): Manual professional overview.
- `matchScore` (Number): Match percentage (0-100).
- `title` (String, Required): Generated target job title.
- `technicalQuestions` (Array of Subdocuments):
  - `question` (String), `intention` (String), `answer` (String).
- `behavioralQuestions` (Array of Subdocuments):
  - `question` (String), `intention` (String), `answer` (String).
- `skillGaps` (Array of Subdocuments):
  - `skill` (String), `severity` ("low", "medium", "high").
- `preparationPlan` (Array of Subdocuments):
  - `day` (Number), `focus` (String), `tasks` (Array of Strings).

---

## 🔒 Authentication Flow

```text
[Register/Login Request] ──► [Hash Check / User Create] ──► [Sign JWT] ──► [Store in HTTP-only Cookie]
                                                                                  │
                                                                                  ▼
[API Route Access] ◄── [Allow Next()] ◄── [Token Verified & NOT Blacklisted] ◄── [Auth Middleware]
```

1. **Sign Up/Sign In:** The backend hashes passwords using `bcryptjs` and signs a JSON Web Token containing the user ID.
2. **Cookie Storage:** The JWT token is returned to the client and stored in a secure cookie.
3. **Route Protection:** When calling private APIs, `authUser` middleware intercepts the request, decodes the JWT, and verifies it against the `tokenBlacklist` collection in MongoDB.
4. **Log Out:** The token is cleared from client-side cookies and added to the database `tokenBlacklist` collection to block access if the client attempts to use it again.

---

## 🤖 AI Workflow & Structured Outputs

A standard challenge with LLM endpoints is response consistency. To solve this, **InterviewIQ-AI** enforces strict structured output formats using Google Gemini schemas:

```javascript
// 1. Define strict Zod Schema
const interviewReportSchema = z.object({
    matchScore: z.number().describe("Score between 0 and 100..."),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The question text..."),
        intention: z.string().describe("Why the interviewer is asking this..."),
        answer: z.string().describe("Detailed ideal answer guide...")
    })),
    // ... other fields
});

// 2. Transpile to standard JSON schema and feed into Gemini Config
const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
        responseMimeType: "application/json",
        responseSchema: zodToJsonSchema(interviewReportSchema),
    }
});

// 3. Directly parse response without formatting worries
const parsedData = JSON.parse(response.text);
```

By specifying `responseMimeType` and `responseSchema` with the converted Zod schema, the model outputs JSON that maps directly to the schema structure, eliminating formatting errors.

---

## 📄 Tailored ATS Resume Generation

1. **HTML Structuring:** The user clicks "Download Resume" in the dashboard. The backend passes the job description, resume text, and self-description to Gemini.
2. **Template Output:** The AI outputs standard HTML structure customized to the target job description (optimized with colors, clear headers, and layouts).
3. **Chromium Rendering:** Puppeteer launches a headless browser, sets the styled HTML page content, and compiles it into an A4 PDF document:
   ```javascript
   const browser = await puppeteer.launch();
   const page = await browser.newPage();
   await page.setContent(htmlContent, { waitUntil: "networkidle0" });
   const pdfBuffer = await page.pdf({ format: "A4", margin: { top: "20mm", bottom: "20mm" } });
   await browser.close();
   ```
4. **Download:** The backend sends the buffer back to the frontend with `Content-Type: application/pdf` headers, downloading the PDF directly on the client.

---

## 📋 API Documentation

### Auth Endpoints

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/auth/register` | Registers a new user. Stores token in HTTP-only cookie. | No |
| `POST` | `/api/auth/login` | Logins user with email/password. Stores token in cookie. | No |
| `GET` | `/api/auth/logout` | Clears cookie and blacklists JWT token. | Yes |
| `GET` | `/api/auth/get-me` | Returns current user profile details. | Yes |

### Interview Plan Endpoints

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/interview/` | Generates a report from raw PDF resume and/or self-description. | Yes |
| `GET` | `/api/interview/` | Retrieves brief overview of past reports (for home history). | Yes |
| `GET` | `/api/interview/report/:interviewId` | Fetches a detailed interview report document. | Yes |
| `POST` | `/api/interview/resume/pdf/:interviewReportId` | Generates a job-tailored resume PDF via Gemini and Puppeteer. | Yes |

---

## 🚀 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/InterviewIQ-AI.git
cd InterviewIQ-AI
```

### 2. Configure Environment Variables
Create a `.env` file in the `/Backend` directory:
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/interviewiq
JWT_SECRET=your_jwt_secret_key_here
GOOGLE_GENAI_API_KEY=your_gemini_api_key_here
```

### 3. Install and run Backend
```bash
cd Backend
npm install
npm run dev
```

### 4. Install and run Frontend
Open a new terminal window:
```bash
cd Frontend
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🛠️ Environment Variables

- `PORT`: Port the Express server runs on.
- `MONGO_URI`: MongoDB connection string.
- `JWT_SECRET`: Secret key used to sign JSON Web Tokens.
- `GOOGLE_GENAI_API_KEY`: API key for Google Gemini GenAI services.

---

## 📷 Screenshots

### Login Page
![Login Page](Screenshots/Login%20page.png)

### Dashboard / Generate Strategy
![Dashboard Page](Screenshots/Dashboard.png)

### Study Roadmap
![Roadmap Page](Screenshots/Roadmap.png)

---

## 💡 Challenges Faced & Solutions

### 1. File Upload State Loss During React Re-renders
- **Challenge:** Changing the `resumeFile` state triggered a component re-render. Because the conditional structure swapped the dropzone label for a file info block, React reconstructed the adjacent `<input>` tag, clearing the file reference from the DOM before processing completed.
- **Solution:** Added a stable `key="resume-file-input"` to the file `<input>` element. React now tracks the element across state updates and preserves the DOM node.

### 2. PDF Parsing Reliability
- **Challenge:** PDFs uploaded from different formats (ATS, standard Word exports) had varying page layouts, sometimes causing parsing libraries to choke or output unformatted strings.
- **Solution:** Switched to a robust Uint8Array memory-buffer parser parsing raw text structures safely, while adding server-side guards to verify inputs and process empty values if a user prefers to write a self-description.

### 3. Headless Browser PDF Generation Overheads
- **Challenge:** Launching Puppeteer browsers in Node can consume significant server memory and causes timeouts if left hanging.
- **Solution:** Implemented clean browser initialization controls, utilizing strict `waitUntil: "networkidle0"` limits to guarantee CSS sheets load, and wrapped operations in `try-finally` blocks to ensure `browser.close()` runs even if rendering fails.

---

## 🎓 Key Learnings

- **Strict Structured Outputs:** Gained experience mapping Zod schemas directly into Gemini config calls to enforce reliable, format-safe JSON responses.
- **State Preservation in React:** Learned how React reconciles child nodes and how to use stable keys to preserve DOM state during conditional layouts.
- **Stateless Authorization Patterns:** Implemented cookie-based JWT tokens combined with database token blacklisting to secure routes while maintaining state.
- **PDF Extraction and Compilation:** Built parsing pipelines using Multer memory buffers and Puppeteer Chromium PDF rendering.

---

## 📝 Resume Bullet Points

- **AI-Powered Mock Interview Platform:** Built a MERN stack web app that parses candidate resumes using `pdf-parse` and matches them against target job descriptions.
- **Enforced JSON Schemas:** Leveraged `zod` and Google's Gemini SDK (`responseSchema`) to enforce strict JSON output configurations, eliminating response parsing errors.
- **Automated Resume Compiler:** Implemented a backend pipeline using Puppeteer to dynamically compile custom job-tailored HTML layouts into downloadable PDF documents.
- **Secure Authentication Guard:** Configured cookie-based JWT authentication paired with a token-blacklist logout registry in MongoDB to prevent token reuse.

---

## 🎙️ Interview Pitch (5-Minute Speakable Guide)

> *"In my project, **InterviewIQ-AI**, I wanted to build an automated, personalized career coach that helps candidates identify skill gaps and generate structured preparation strategies for target job descriptions.
>
> I built the frontend with **React**, using a clean, dark-themed dashboard. The backend is built with **Node.js and Express**, and connects to a **MongoDB** database.
>
> The core workflow starts when a user uploads their resume. The backend intercepts the file with **Multer** and parses it directly from memory using **pdf-parse**. It then builds a custom prompt that is sent to the **Google Gemini API**. To ensure the AI responses are reliable, I enforced strict schemas using **Zod** and Gemini's native `responseSchema` config. This guarantees the AI returns structured JSON containing matching scores, technical/behavioral mock questions, intention analysis, and custom roadmaps, which are stored in the database.
> 
> I also built a custom resume compiler. It prompts Gemini to write a targeted HTML resume template customized to the job description, and uses **Puppeteer** to launch a headless browser and render that HTML into a clean, downloadable PDF.
>
> For security, I set up **JWT-based authentication** stored in secure, HTTP-only cookies. To secure the logout process, I added a token-blacklist collection in MongoDB so tokens are flagged as invalid upon logout.
>
> One interesting challenge I ran into was a React HMR unmounting issue. Changing the file state caused React to unmount the adjacent input node, resetting the selected file value. I solved this by adding stable keys to the input element.
>
> Overall, this project helped me understand structured AI output modeling, backend file manipulation, and secure authentication flows."*

---

## 📄 License & Contact

Distributed under the MIT License. See [LICENSE](LICENSE) for more details.

**Aditya** - [GitHub Profile](https://github.com/Aditya00010) - Aditya00010@gmail.com (Placeholder)
