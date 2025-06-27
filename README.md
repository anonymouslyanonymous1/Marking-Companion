![image](public/bg.png)
# [Marking Companion](https://marking-companion.vercel.app/)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE) <br>
<img src="https://skillicons.dev/icons?i=nextjs,react,tailwind&theme=dark" />

## Reason behind making it
Back when I was in IGCSE, I used to face a difficulty when doing past papers. 

The issue being the halt in my progress of doing past papers due to the *inability to seek feedback* on the essays I used to write. 

I didn't have an English teacher, at least not one to whom I could send my essays for review. 

So I used to search for AI checkers. It's not like there were no AI Checkers, but **none were specific** to the Edexcel 4EB1 Paper. These papers have *specific markschemes with certain points which all need to be covered* for attaining good marks. 

Thus I made Marking Companion. It has a vast library (June 2018 - October 2023, these are the ones Edexcel has made available to) of 4EB1 Papers with all the corresponding marking schemes analysed. 

Irrespective of where you are, what device you are using, you would be able to sit for any of the 4EB1 Papers and get rapid validation about your attempt at the paper. 

## Fundamental Structure and routes of the site
```yaml
    Marking Companion
    ├───public
    │   ├───Data
    │   │   ├───ExtractPDFs : These are the PDFs of the Source Booklets for the user to view while sitting out an exam
    │   │   ├───Extracts : These are the text files containing the texts - which will be fed to Gemini
    │   │   ├───Raw MS : These are the text files containing the rubrics on how to mark - which will be fed to Gemini
    │   │   └───Raw QP : These are the text files containing the questions for every year - which are fetched for display and also fed to Gemini
    │   └───fonts
    └───src
        └───app
            ├───api
            │   ├───data
            │   └───gemini
            │       ├───analysis
            │       ├───comparison
            │       ├───secB
            │       ├───secC
            │       └───small
            ├───exam
            │   └───[year]
            ├───results
            │   └───[choice]
            └───wait
```
### `/api` Endpoints
- This is mainly used in the backend
- `/api/data` : This is used to fetch either of Question Papers, Mark Schemes or Extracts
    - The query parameters being: `year=[insert year]&desire=[qp/ms/ec]`
- `/api/gemini` : This is used to make requests to the Gemini API
    - The routes are self-explanatory 
    - Open `route.js` files in each folder to see the prompts
### Routes
- `exam/[year]` : This is a dynamic route, i.e. it is generated for every single year in the library accordingly
- `results/[choice]` : This is where you can view the evaluations made by Gemini
    - `[choice]` is for the tabs within the results page. It is dynamically fed
## Changelog: v2 
- Redesigned the whole project
    - Moved from Flask (Python) to NextJS (JavaScript)
    - Moved from raw HTML, CSS to using:
        - Tailwind CSS
        - React
        - ShadCN's Components and Blocks
        - These helped speed up the redesign process astronomically
- Upgraded to Gemini-2.0-Flash from Gemini-1.5-Flash
- Rewrote the prompts so that they are more verbose 
- In the `exams/[year]` route **added**:
    - Timer : So that students can adapt to exam conditions
    - Ability to view (desktop) or download (mobile/tablet) the extracts/source booklets/ insert
    - OCR : So that if any student has answers written on pen and paper already they can just take pictures of it in order to get curated feedback
        - Uses [Tesseract JS](https://tesseract.projectnaptha.com/)
        - React helps render the text on client side so that student can make further edits (incase Tesseract makes mistakes, which is possible as it's not trained on all handwritings)
- `results` route was completely overhauled
    - All the information that used to be shown in v1 before is still there but just more nicely placed
    - Pie Charts at each page however were removed as they didn't add much of an element and generally slowed FCP
