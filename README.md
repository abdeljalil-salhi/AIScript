<p align="center">
    <a target="_blank" href="https://www.abdel.codes/project/aiscript">
        <img src="https://github.com/abdeljalil-salhi/AIScript_public/blob/main/README_Cover.png?raw=true" alt="AIScript Cover Picture" width="800" />
    </a>
</p>

<p align="center">
	<img alt="GitHub code size in bytes" src="https://img.shields.io/github/languages/code-size/abdeljalil-salhi/AIScript?color=lightblue" />
	<img alt="Code language count" src="https://img.shields.io/github/languages/count/abdeljalil-salhi/AIScript?color=yellow" />
	<img alt="GitHub top language" src="https://img.shields.io/github/languages/top/abdeljalil-salhi/AIScript?color=blue" />
	<img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/abdeljalil-salhi/AIScript?color=green" />
</p>

---

<p align="center">
	<a target="_blank" href="https://www.abdel.codes/project/aiscript/" alt="AIScript in my portfolio">
		<img src="https://github.com/abdeljalil-salhi/AIScript_public/blob/main/README_Demo.gif?raw=true" alt="AIScript Demo GIF" width="800"/>
	</a>
	<br />
	<i><b>AIScript</b> demo GIF</i>
</p>

## Core Features

### AI-Driven Book Generation

Users can create entire books from a single topic input. The AI writes the content, formats it into a DOCX file with proper structure, and converts it to a PDF, ready for publication or sale.

### Custom AI Covers

The platform generates custom book covers based on the provided topic, automatically applying them to the book's cover page.

### User Authentication and Security

Users can create accounts, log in, use Google or Twitter OAuth, and reset their passwords, alongside two-factor authentication for enhanced security.

### Responsive and Modern Design

A user-friendly frontend built with React, Vite, and Refine, featuring a modern design and animations using Tailwind, PostCSS, and Framer Motion.

### Queue System and Notifications

A shared and priority queue system that processes book generation requests in the background, notifying users when their books are ready for download.

### Comprehensive Support

A help center with FAQs, a contact form, and a live chat feature using a Telegram bot for real-time support.

## What sets AIScript apart?

### Unique Selling Proposition (USP)

AIScript stands out from other AI-driven tools by offering a comprehensive solution that includes:

- Complete book generation from a simple topic input within seconds.

- Automatic formatting in DOCX with titles, table of contents, and chapters.

- Conversion to a final PDF format ready for use, publication, or sale.

- AI-generated custom covers tailored to the book's topic.

### Business Model

AIScript offers a free testing tier with 50 credits. Subscription tiers provide 500 or 1000 credits per month, with plans to introduce a top-up functionality for purchasing additional credits that expire within a year.

## Technological Stack Details

### Backend (NestJS)

Developed with scalability in mind, featuring JWT for tokens, GraphQL for data handling, Multer for file uploads, Argon2 for password hashing, UUIDs for IDs, and Websockets for real-time updates. The backend includes a shared queue for free users and a priority queue for premium users, with 2FA using OTP and QR codes, and Google/Twitter OAuth integration.

### Backend (Django)

Hosts the AI model responsible for generating book content, formatting it into DOCX, and converting it to PDF. Communicates with the NestJS backend for processing user requests.

### Frontend

Built with React, Vite, Refine, Tailwind, PostCSS, and Ant Design, featuring a responsive and modern design. Websockets are handled in the ContextAPI, with a custom-coded authentication provider for user management. Authenticated users can subscribe, create, view, download, or print PDFs directly from the platform.

### Database

Uses PostgreSQL with Prisma for data storage, including user accounts, book generation requests, temporary verification tokens, subscriptions, and credits.

SQLite is used on the Django side for backup and recovery purposes, storing generated books and covers temporarily.

### Telegram Bot

A Telegram bot built with JavaScript integrated with the platform API for real-time support, notifications, and alerts. Users can receive updates on their book generation requests, credits, and subscription status.

---

### 📫 Contributing to this project:

<table>
  <tr>
    <td width="30px"></td>
    <td align="center">
      <a href="https://github.com/abdeljalil-salhi">
        <img src="https://avatars.githubusercontent.com/u/65598953" width="100px;" alt="GitHub profile"/><br>
      </a>
      <sub>
        <b>Abdel</b>
      </sub>
    </td>
    <td width="30px"></td>
  </tr>
</table>
