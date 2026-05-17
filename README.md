# Aman Asgola — Portfolio

Personal portfolio site targeting Working Student and Junior AI/Data Engineer roles.
Pure HTML / CSS / JS — no build step, no dependencies, deploy anywhere.

---

## Editing Content

All content lives in **`index.html`**. Each section is clearly labelled with a comment:

| Section    | Comment in `index.html`             |
|------------|-------------------------------------|
| Hero       | `<!-- ===== HERO ===== -->`          |
| About      | `<!-- ===== ABOUT ===== -->`         |
| Impact     | `<!-- ===== IMPACT ===== -->`        |
| Experience | `<!-- ===== EXPERIENCE ===== -->`    |
| Projects   | `<!-- ===== PROJECTS ===== -->`      |
| Skills     | `<!-- ===== SKILLS ===== -->`        |
| Languages  | `<!-- ===== LANGUAGES ===== -->`     |
| Education  | `<!-- ===== EDUCATION ===== -->`     |
| Contact    | `<!-- ===== CONTACT ===== -->`       |

### Adding a project

Copy an existing `.project-card` block inside `<div class="projects-grid">` and fill in:
- `.project-metric` — key result pill (e.g. "+15% accuracy")
- `.project-link` + `href` — external link
- `.project-title` — project name
- Three `.pal-item` blocks — Problem / Approach / Impact
- `.tag-row` spans — tech stack

### Adding an experience entry

Copy a `.timeline-item` block inside `<div class="timeline">` and update:
- `.tl-role`, `.tl-company`, `.tl-location`
- `.tl-badges` — tech stack pills
- `.tl-metrics` — four key numbers in `.mini-metric` blocks
- `.tl-bullets` — three impact bullets

### Adding a skill category

Copy a `.skill-card` block inside `<div class="skills-grid">` and update the
`.skill-group` heading and the `.tag` spans.

---

## GitHub Integration

Repositories are fetched automatically from the GitHub API at page load.
To change the user, edit **`main.js`**:

```js
const GITHUB_USER = 'AmanAsgola';  // ← change this
```

Forks and the profile-readme repo are filtered out. Up to 6 repos are shown,
sorted by most recently updated. If the API is unavailable a fallback message
is displayed — no error is thrown to the console.

---

## Theme Customisation

### Accent colour

Edit `--accent` and `--accent-gradient` in **`style.css`**:

```css
/* Light mode */
:root {
  --accent:          #7c3aed;
  --accent-gradient: linear-gradient(135deg, #7c3aed 0%, #2563eb 100%);
}

/* Dark mode */
[data-theme="dark"] {
  --accent:          #8b5cf6;
  --accent-gradient: linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%);
}
```

### Default theme

Change the `data-theme` on `<html>` in `index.html` and the fallback in the
inline `<script>` in `<head>`:

```html
<html data-theme="light">
<script>(function(){var t=localStorage.getItem('theme')||'light';...})();</script>
```

User preference is persisted to `localStorage` under the key `theme`.

---

## Deployment

No build required — upload as-is.

**GitHub Pages:** Settings → Pages → source: `main` branch, root folder.

**Netlify:** `npx netlify deploy --dir . --prod`

**Any static host (nginx, S3, Cloudflare Pages):** upload all files directly.

---

---

# Project README Templates

Use these as starting points for individual project repos.

---

## Template 1 — DOPC Pricing API

```markdown
# DOPC — Delivery Order Price Calculator API

Sub-millisecond delivery pricing and distance calculation service.

## Impact
- Sub-ms deterministic calculations with 100% pricing accuracy
- Zero environment failures across all deployments
- Fully containerised for portable, reproducible deploys

## Stack
| Layer       | Technology          |
|-------------|---------------------|
| Backend     | FastAPI (Python)    |
| Distance    | Haversine formula   |
| Container   | Docker              |
| Validation  | Pydantic schemas    |

## How to Run

```bash
# Clone
git clone https://github.com/AmanAsgola/Delivery-Order-Price-Calculator-API-DOPC-
cd Delivery-Order-Price-Calculator-API-DOPC-

# Run with Docker
docker build -t dopc-api .
docker run -p 8000:8000 dopc-api

# Or run locally
pip install -r requirements.txt
uvicorn main:app --reload
```

API docs available at `http://localhost:8000/docs`

## Architecture
```
Request → FastAPI router → Haversine distance engine → price calculation → JSON response
```
```

---

## Template 2 — BERT Discourse Classifier

```markdown
# BERT Discourse Classifier (Paper B)

Fine-tuned BERT model for detecting topic shifts in political discourse datasets.

## Impact
- +15% accuracy over baseline models
- Reproducible evaluation framework with MLflow tracking
- Sliding-window training strategy for long-form text

## Stack
| Layer       | Technology              |
|-------------|-------------------------|
| Model       | BERT (HuggingFace)      |
| Training    | PyTorch + Transformers  |
| Tracking    | MLflow                  |
| Data        | Custom curation pipeline|

## How to Run

```bash
git clone <repo>
pip install -r requirements.txt

# Train
python train.py --config config.yaml

# Evaluate
python evaluate.py --checkpoint checkpoints/best_model.pt
```

## Results

| Model    | Accuracy | F1    |
|----------|----------|-------|
| Baseline | 72.3%    | 0.71  |
| BERT     | **87.3%**| **0.86** |
```

---

## Template 3 — Olympic Data Analysis

```markdown
# Olympic Data Analysis

Automated data engineering pipeline for extracting patterns from 120+ years
of Olympic Games data.

## Impact
- Streamlined multi-step data processing into a single automated pipeline
- Statistical visualisations covering 120+ years of performance data
- Repeatable, documented workflow for fast iteration

## Stack
| Layer         | Technology          |
|---------------|---------------------|
| Processing    | Python, Pandas      |
| Numerics      | NumPy               |
| Visualisation | Matplotlib, Seaborn |

## How to Run

```bash
git clone https://github.com/AmanAsgola/Olympic-Data-Analysis
cd Olympic-Data-Analysis
pip install -r requirements.txt

# Run full pipeline
python pipeline.py

# Or open the notebook
jupyter notebook analysis.ipynb
```

## Pipeline Steps
1. Raw CSV ingestion
2. Schema validation and type enforcement
3. Null-handling and deduplication
4. Feature engineering (medals per capita, event trends, etc.)
5. Statistical visualisation export
```

---

## Template 4 — Movie Recommendation System

```markdown
# Movie Recommendation System

Recommendation engine that suggests movies based on user taste and title-level similarity.

## Impact
- Personalized top-N movie recommendations for faster content discovery
- Reusable recommendation pipeline for experimentation and tuning
- Clear offline evaluation workflow for iterative model improvements

## Stack
| Layer          | Technology             |
|----------------|------------------------|
| Processing     | Python, Pandas         |
| Recommendation | Scikit-learn           |
| Text Features  | TF-IDF / Cosine Similarity |
| Interface      | Notebook / Script      |

## How to Run

```bash
git clone https://github.com/AmanAsgola/Movie-Recommendation-System
cd Movie-Recommendation-System
pip install -r requirements.txt

# Run recommendation workflow
python main.py
```

## Pipeline Steps
1. Ingest and clean movie metadata
2. Engineer content features (genres, keywords, overviews)
3. Build similarity matrix
4. Rank and return top-N recommendations
5. Evaluate and iterate on recommendation quality
```
