# TFR Brand Identity Guidelines: Colors & Fonts

## 1. Color Palette

| Color Name         | Hex Code     | Usage Example                                      |
|--------------------|-------------|----------------------------------------------------|
| Primary Green      | #004116     | Main text, headings, important highlights          |
| Background Green   | #eff6f2     | Page background                                    |
| Card Gray          | #d9d9d9     | Project card backgrounds                           |
| Card Shadow Green  | #397e58     | Project card shadow                                |
| Metadata Gray      | #ebebeb     | Metadata section backgrounds                       |

**Usage Notes:**
- Use **Primary Green (#004116)** for all main text, headings, and key highlights.
- **Background Green (#eff6f2)** is the default page background for a clean, fresh look.
- **Card Gray (#d9d9d9)** and **Metadata Gray (#ebebeb)** are used for cards and metadata backgrounds, providing subtle contrast.
- **Card Shadow Green (#397e58)** is used for card shadows, adding depth and a branded accent.

---

## 2. Typography

| Font Family         | Weight/Style | Usage Example                |
|---------------------|--------------|------------------------------|
| Space Grotesk       | Bold         | Main headings, section titles|
| Inter               | Regular      | Body text, descriptions      |
| Inter               | Bold         | Metadata titles, highlights  |

**Font Details:**
- **Headings:**  
  - Font: `Space Grotesk, Bold, sans-serif`  
  - Example: Main name/title, section headers  
  - Size Example: 64px (main heading), 32px (section heading)
- **Body Text:**  
  - Font: `Inter, Regular, sans-serif`  
  - Example: Descriptive paragraphs, metadata  
  - Size Example: 24px (main body), 16px (metadata)
- **Metadata/Highlights:**  
  - Font: `Inter, Bold, sans-serif`  
  - Example: Project titles, metadata labels

---

## 3. Example CSS Snippets

```css
:root {
  --color-primary-green: #004116;
  --color-background-green: #eff6f2;
  --color-card-gray: #d9d9d9;
  --color-card-shadow-green: #397e58;
  --color-metadata-gray: #ebebeb;
}

body {
  background: var(--color-background-green);
  color: var(--color-primary-green);
  font-family: 'Inter', sans-serif;
}

h1, .main-heading {
  font-family: 'Space Grotesk', sans-serif;
  font-weight: bold;
  color: var(--color-primary-green);
  font-size: 64px;
}

h2, .section-heading {
  font-family: 'Space Grotesk', sans-serif;
  font-weight: bold;
  color: var(--color-primary-green);
  font-size: 32px;
}

.card {
  background: var(--color-card-gray);
  box-shadow: 8px 8px 8px 0px var(--color-card-shadow-green);
}

.metadata {
  background: var(--color-metadata-gray);
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: bold;
}
```

---

## 4. Summary Table

| Element         | Font Family         | Font Weight | Font Size | Color         |
|-----------------|--------------------|-------------|-----------|--------------|
| Main Heading    | Space Grotesk      | Bold        | 64px      | #004116      |
| Section Heading | Space Grotesk      | Bold        | 32px      | #004116      |
| Body Text       | Inter              | Regular     | 24px      | #004116      |
| Metadata        | Inter              | Bold        | 16px      | #004116      |
| Card BG         | —                  | —           | —         | #d9d9d9      |
| Card Shadow     | —                  | —           | —         | #397e58      |
| Metadata BG     | —                  | —           | —         | #ebebeb      |
| Page BG         | —                  | —           | —         | #eff6f2      |

---

These guidelines are directly derived from the code and Figma UI, ensuring consistency across your brand's digital presence. 