# Developer Portfolio Website

A modern, responsive and interactive developer portfolio built with **React**, **TypeScript**, **Vite**, **Three.js**, **Framer Motion**, **EmailJS** and the **GitHub API**.

This portfolio includes animated 3D sections, dynamic GitHub repositories, blog articles, education, timeline, contact form and downloadable CV support.

## Preview

This project is designed for developers who want a modern and customizable personal portfolio website.

## Features

* Modern responsive portfolio design
* Dark and light theme support
* Interactive 3D hero section
* 3D skills visualization
* Dynamic GitHub repositories
* Interactive education section
* Career timeline section
* Blog articles section
* Contact form with EmailJS
* Downloadable CV support
* SEO component support
* Clean and customizable data structure

## Tech Stack

* React
* TypeScript
* Vite
* SCSS
* Three.js
* React Three Fiber
* Drei
* Framer Motion
* Axios
* EmailJS
* React Router DOM
* React Toastify
* GitHub API

## Getting Started

Clone the project:

```bash
git clone https://github.com/UlviParviz/ulvi-portfolio.git
```

Go to the project directory:

```bash
cd ulvi-portfolio
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

The project will run locally at:

```txt
http://localhost:5173
```

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
VITE_GITHUB_USERNAME=
```

Example:

```env
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
VITE_GITHUB_USERNAME=your_github_username
```

## EmailJS Setup

This project uses **EmailJS** for the contact form.

You need to create an EmailJS account and configure:

* Email service
* Email template
* Public key

The contact form uses these template variables:

```txt
{{from_name}}
{{from_email}}
{{subject}}
{{message}}
```

Make sure your EmailJS template uses the same variable names. Otherwise, the submitted form data will not appear correctly in the received email.

Recommended EmailJS template settings:

```txt
Subject:
New portfolio message from {{from_name}} — {{subject}}

From Name:
{{from_name}}

Reply To:
{{from_email}}
```

## GitHub Projects Setup

The projects section fetches repositories from GitHub using your GitHub username.

Add your GitHub username to the `.env` file:

```env
VITE_GITHUB_USERNAME=your_github_username
```

Selected repositories are controlled from:

```txt
src/data/portfolio.ts
```

Example:

```ts
export const SELECTED_REPOS = [
  "react-portfolio",
  "node-api",
  "typescript-project",
];
```

Repository names must match your real GitHub repository names.

## CV Setup

The CV file is stored inside the `public` folder.

Replace the existing CV file with your own CV:

```txt
public/cv.pdf
```

Important:

* Keep the file name as `cv.pdf`
* Replace the default file with your own CV
* The CV download button will automatically use this file
* If you deploy the project and later change the CV, replace the same `cv.pdf` file and redeploy if needed

## Customization

Most portfolio content is managed from:

```txt
src/data/portfolio.ts
```

You can customize:

* Hero section content
* About information
* Skills
* Education
* Timeline
* Blog posts
* Selected GitHub repositories
* Contact information
* CV button text
* Section titles and descriptions
* Colors and labels
* Personal profile data

Update this file according to your own experience, projects, education and design preferences.

## Project Structure

```txt
src
├── data
│   └── portfolio.ts
├── features
│   ├── blog
│   ├── contact
│   ├── education
│   ├── github
│   ├── hero
│   ├── skills
│   └── timeline
├── shared
│   ├── seo
│   └── components
├── styles
│   └── global.scss
└── main.tsx
```

## Available Scripts

Start the development server:

```bash
npm run dev
```

Build the project for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Deployment

You can deploy this project on:

* Vercel
* Netlify
* Railway
* Render
* GitHub Pages

Before deployment, add the required environment variables to your hosting platform.

Required environment variables:

```env
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
VITE_GITHUB_USERNAME=
```

## Important Notes

Before using this portfolio for yourself:

1. Replace `public/cv.pdf` with your own CV.
2. Keep the CV file name as `cv.pdf`.
3. Update `src/data/portfolio.ts` with your own information.
4. Add your GitHub username to `.env`.
5. Configure EmailJS service, template and public key.
6. Update selected repository names.
7. Customize texts, colors and sections if needed.
8. Add the same environment variables to your deployment platform.

## License

This project is open for personal portfolio usage. You can customize it and use it for your own developer portfolio.
