# Resume

[![Netlify Status](https://api.netlify.com/api/v1/badges/d6ebbb0b-a548-46ca-ae13-470497217ae4/deploy-status)](https://app.netlify.com/sites/kevin-cv/deploys)

A professional resume and CV website built with [Hugo](https://gohugo.io/) and the [DevResume theme](https://github.com/KevinCochrane/hugo-devresume-theme). The site showcases Kevin Chang's professional experience, skills, education, and projects.

**Live Site:** [kevin-cv.netlify.app](https://kevin-cv.netlify.app/)

## About

This is a personal website showcasing the professional profile of Kevin Chang, a Data Scientist at ASB Bank in New Zealand. The site is built using Hugo, a fast and flexible static site generator, and features a modern, responsive design optimized for displaying CV/resume information.

## Tech Stack

- **Static Site Generator:** [Hugo](https://gohugo.io/)
- **Theme:** [hugo-devresume-theme](https://github.com/KevinCochrane/hugo-devresume-theme)
- **Deployment:** [Netlify](https://netlify.com/)
- **R Integration:** [Blogdown](https://bookdown.org/yihui/blogdown/)
- **Environment Management:** [renv](https://rstudio.github.io/renv/)

## Project Structure

```
.
├── config.toml              # Hugo configuration with all profile settings
├── content/                 # Blog posts and content
├── themes/                  # Hugo theme files
├── renv/                    # R environment lock file
├── resources/               # Generated resources
└── README.md
```

## Getting Started

### Prerequisites

- [Hugo](https://gohugo.io/getting-started/installing/) (extended version recommended)
- [Git](https://git-scm.com/)
- (Optional) R and RStudio for blogdown integration

### Installation & Local Development

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd Resume
   ```

2. **Start the Hugo development server:**
   ```bash
   hugo server
   ```

3. **View the site:**
   Open your browser and navigate to `http://localhost:1313`

The site will automatically rebuild as you make changes to the configuration or content.

## Configuration

All site content is configured in `config.toml`. This includes:

- **Profile Information:** Name, title, location, avatar
- **Skills:** Programming languages, statistics, and professional skills
- **Experience:** Work history with detailed achievements
- **Education:** Degrees and institutions
- **Projects:** Featured side projects and professional work
- **Publications:** Selected academic papers and research
- **Social Links:** GitHub, LinkedIn, Medium, Twitter, ResearchGate

### Customizing Your Profile

Edit `config.toml` to update:
- `[params.profile]` - Personal profile information
- `[params.experience.list]` - Work experience
- `[params.skills.list]` - Technical and professional skills
- `[params.projects.list]` - Projects and work samples
- `[params.social.list]` - Social media and professional links

## Deployment

The site is automatically deployed to Netlify whenever changes are pushed to the main branch.

### Manual Deployment

1. **Build the site:**
   ```bash
   hugo
   ```

2. **Deploy the `public/` directory to your hosting service**

### Netlify Deployment

The site is configured for automatic deployment on Netlify. Any push to the main branch triggers a new build and deployment.

**Netlify Site:** [kevin-cv.netlify.app](https://kevin-cv.netlify.app/)

## Content

### Experience

Kevin's professional background includes:
- **Data Scientist** at ASB Bank (2023 - Present)
- **Model Assurance Specialist** at ASB Bank (2021 - 2023)
- **Modelling Analyst** at New Zealand Treasury (2019 - 2021)
- **Statistical Consultant** at University of Auckland (2014 - 2019)

### Skills

- **Programming:** R, Python, SQL, SAS, dbt, Shiny, RMarkdown
- **Technologies:** Snowflake, Databricks
- **Statistics:** Experimental design, statistical modeling, survey analysis, machine learning, microsimulation

### Education

- Ph.D. in Statistics and Biological Sciences, University of Auckland (2017)
- B.Sc. (Hon) in Bioinformatics, University of Auckland (2008)
- B.Sc. in Bioinformatics, University of Auckland (2007)

## Development Tips

### Updating the Theme

The theme is included as a subdirectory. To update to the latest theme version:

```bash
git submodule update --remote
```

### Adding Blog Posts

To add new blog content:

```bash
hugo new post/my-post-title.md
```

Then edit the generated file in `content/post/`.

### Preview Before Publishing

Use `hugo server -D` to preview draft content before publishing.

## License

This project uses the [hugo-devresume-theme](https://github.com/KevinCochrane/hugo-devresume-theme), which is licensed under the [MIT License](themes/hugo-devresume-theme/LICENSE.md).

## Contact

- **Email:** kevin.ct.chang@gmail.com
- **Location:** Auckland, New Zealand
- **GitHub:** [@kcha193](https://github.com/kcha193)
- **LinkedIn:** [kevin-ct-chang](https://linkedin.com/in/kevin-ct-chang)

---

Built with ❤️ using Hugo and Netlify
