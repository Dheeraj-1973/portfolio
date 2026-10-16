# Dheeraj Nallamotu — Portfolio

A static portfolio site: plain HTML, CSS and JavaScript. There is no build step and nothing to install.

## Folder structure

```
portfolio/
├── index.html                          All page content
├── css/styles.css                      Colors, fonts and layout
├── js/main.js                          Escalation demo at the top of the page
└── assets/
    ├── Dheeraj_Nallamotu_Resume.pdf    Linked from the "Résumé" buttons
    └── favicon.svg                     Browser tab icon
```

## Run it locally in Cursor

1. Unzip the folder and open it in Cursor (**File → Open Folder**).
2. Install the **Live Server** extension (by Ritwick Dey) from the Extensions panel.
3. Right-click `index.html` and choose **Open with Live Server**. The site opens in your browser and reloads every time you save a file.

You can also double-click `index.html` to open it directly in a browser.

## Common edits

- **Text:** everything visible is in `index.html`, with one section per comment block (`INTRO`, `WORK`, `EXPERIENCE`, `EDUCATION`, `SKILLS`, `CONTACT`).
- **Résumé:** replace `assets/Dheeraj_Nallamotu_Resume.pdf` with a new PDF of the same name.
- **Colors:** change the variables at the top of `css/styles.css`. The second block (`prefers-color-scheme: dark`) holds the dark-mode colors.
- **Demo examples:** edit the `examples` list at the top of `js/main.js`.
- **Project repository links:** when a project's GitHub repo is public, add a line like this inside that project's `<article>` in `index.html`:

  ```html
  <p><a href="https://github.com/Dheeraj-1973/REPO-NAME" target="_blank" rel="noopener">View code on GitHub</a></p>
  ```

## Deploy (free options)

**Vercel (simplest)**
1. Push this folder to a new GitHub repository.
2. Sign in at vercel.com with GitHub, choose **Add New → Project**, and import the repository.
3. Leave the framework preset as **Other** and click **Deploy**.

**Netlify**
Sign in at app.netlify.com and drag the unzipped `portfolio` folder onto the **Sites** page.

**GitHub Pages**
1. Create a repository named `Dheeraj-1973.github.io` and push these files to the root.
2. In the repository, go to **Settings → Pages**, set the source to the `main` branch, and save.
3. The site goes live at `https://dheeraj-1973.github.io`.

After deploying, add the site link to your résumé header, LinkedIn and GitHub profile.
