````md
# Developer Portfolio Website

A modern, responsive and interactive developer portfolio built with **React**, **TypeScript**, **Vite**, **Three.js**, **Framer Motion**, **EmailJS** and the **GitHub API**.

This portfolio includes animated 3D sections, dynamic GitHub repositories, blog articles, timeline, education, contact form and downloadable CV support.

## Features

- Modern responsive portfolio design
- Dark / light theme support
- Interactive 3D hero section
- 3D skills visualization
- Dynamic GitHub repository section
- Interactive education section
- Career timeline section
- Blog article section
- Contact form with EmailJS
- Downloadable CV
- SEO component support
- Clean and customizable data structure

## Tech Stack

- React
- TypeScript
- Vite
- SCSS
- Three.js
- React Three Fiber
- Drei
- Framer Motion
- Axios
- EmailJS
- React Router DOM
- React Toastify
- GitHub API

## Getting Started

Clone the project:

```bash
git clone https://github.com/UlviParviz/ulvi-portfolio.git
````

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

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
VITE_GITHUB_USERNAME=
```

### EmailJS Configuration

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

Make sure your EmailJS template contains the same variable names. Otherwise, the submitted form data will not appear correctly in the received email.

## GitHub Projects

The projects section fetches repositories from GitHub using:

```env
VITE_GITHUB_USERNAME=
```

Add your GitHub username to this variable.

Example:

```env
VITE_GITHUB_USERNAME=your-github-username
```

Selected repositories are controlled from the portfolio data file.

Open:

```txt
src/data/portfolio.ts
```

Then update the selected repository names according to your own GitHub repositories.

## CV Setup

The CV file is stored inside the `public` folder.

Replace the default file with your own CV:

```txt
public/cv.pdf
```

Important:

* Keep the file name as `cv.pdf`
* Replace it with your own CV
* The download button will automatically use this file

If you want to use a dynamic external CV URL instead, you can update the CV link from the project configuration or portfolio data.

## Customization

Most portfolio content is managed from:

```txt
src/data/portfolio.ts
```

You can customize:

* Hero content
* About information
* Skills
* Education
* Timeline
* Blog posts
* Selected GitHub repositories
* Contact information
* CV button text
* Section texts

Update this file according to your own profile, experience, projects and design preferences.

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

Start development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

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

Before deployment, make sure to add the required environment variables to your hosting platform.

Required environment variables:

```env
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
VITE_GITHUB_USERNAME=
```

## Important Notes

Before using the portfolio for yourself:

1. Replace `public/cv.pdf` with your own CV.
2. Update `src/data/portfolio.ts` with your own information.
3. Add your GitHub username to `.env`.
4. Configure EmailJS service, template and public key.
5. Update selected repository names.
6. Customize colors, texts and sections if needed.

## License

This project is open for personal portfolio usage. You can customize it and use it for your own developer portfolio.

```
```
