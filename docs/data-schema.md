# 📊 Data Feed Schema & Extraction Guide (`data.json`)

This document details the structure, properties, and usage of [`data.json`](file:///d:/DEVELOPMENT/all-bots/data.json), which contains parsed and enriched job openings, company profiles, and affiliate tracking URLs.

---

## 🗂️ Overview of `data.json`

`data.json` holds job listings captured from job aggregator feeds (e.g., micro1, Phenom, Appcast, GE Vernova, P&G). Each entry provides full rich HTML job descriptions, compensation details, skill tagging, and tracking metadata.

```text
{
  "items": [
    {
      "id": "53fe28cc-a572-4af3-956e-7f47c2e7f049",
      "title": "Director Of Infrastructure Engineering",
      "slug": "director-of-infrastructure-engineering-micro1-3edbafcb",
      "description": "<p><strong>Job Title:</strong> ...</p>",
      "company": "micro1",
      "logo": "https://cdn-static.artha.link/company-logos/micro1/...",
      "url": "https://r.artha.link/redirect/...",
      "job_type": "contract",
      "work_mode": "remote",
      "skills": ["Terraform", "CI/CD", "observability", "security by default", "SRE practices"],
      "company_info": { ... }
    },
    ...
  ]
}
```

---

## 📋 Entity Property Reference

### Top-Level Job Item Fields

| Field Name | Type | Description |
| :--- | :--- | :--- |
| `id` | `string (UUID)` | Unique global identifier for the job posting. |
| `title` | `string` | Official job title (e.g. `Senior Data Engineer`). |
| `slug` | `string` | URL-safe slug for the job page path. |
| `description` | `string (HTML)` | Rich text formatted job specification and requirements. |
| `company` | `string` | Display name of the hiring organization. |
| `logo` | `string (URL)` | High-resolution CDN webp image URL for the company logo. |
| `url` | `string (URL)` | Tracked affiliate redirect URL including HMAC signature and expiry. |
| `ref_id` | `string` | Partner/aggregator reference ID. |
| `aggregator_name` | `string` | Upstream feed source (e.g., `micro1`, `Appcast`, `Phenom`). |
| `city` / `state` / `country` | `string \| null` | Geographic location details (or `null` if remote). |
| `posted_date` | `string (ISO 8601)` | Timestamp when the position was indexed. |
| `salary_min` / `salary_max` | `number \| null` | Compensation bounds (annual or hourly). |
| `salary_curr` | `string` | ISO currency code (e.g., `USD`, `INR`, `EUR`). |
| `job_type` | `string` | Employment type: `full-time`, `contract`, `part-time`, `internship`. |
| `work_mode` | `string` | Work arrangement: `remote`, `hybrid`, `on-site`. |
| `category` | `string[]` | Domain categories (e.g., `["software technology"]`). |
| `skills` | `string[]` | Array of extracted technical skills (e.g., `["Terraform", "CI/CD"]`). |
| `keywords` | `string[]` | Search indexing tags. |
| `responsibilities` | `string[]` | Bulleted list of primary role duties. |
| `qualifications` | `string[]` | Bulleted list of required degrees/experience. |
| `company_info` | `object` | Extended metadata profile for the employer (see below). |

---

### `company_info` Sub-Object

```json
{
  "company_id": "2928adc6-66b3-5d1a-b0b9-4e0d488c3f0c",
  "name": "micro1",
  "normalized_name": "micro1",
  "domain": "micro1.ai",
  "industry": "Software Development",
  "headcount": 200,
  "revenue": "500M",
  "website_url": "https://www.micro1.ai/",
  "linkedin_url": "https://www.linkedin.com/company/micro1/",
  "glassdoor_rating": null,
  "status": "enriched"
}
```

---

## 🔄 Converting `data.json` into `JOB_QUEUE` for `browser_bot.js`

To extract jobs from `data.json` and generate an updated `JOB_QUEUE` for [`browser_bot.js`](file:///d:/DEVELOPMENT/all-bots/browser_bot.js), use either of the following scripts:

### Option A: Node.js Extractor Script

Save as `extract_queue.js` and run `node extract_queue.js`:

```javascript
const fs = require('fs');

// Read raw file
const raw = fs.readFileSync('data.json', 'utf8');

// Parse single or concatenated JSON chunks
let allJobs = [];
const chunks = raw.split(/}\s*\n\s*{/);

chunks.forEach((chunk, index) => {
  const jsonStr = (index === 0 ? '' : '{') + chunk + (index === chunks.length - 1 ? '' : '}');
  try {
    const data = JSON.parse(jsonStr);
    if (data.items && Array.isArray(data.items)) {
      allJobs.push(...data.items);
    }
  } catch (err) {
    console.error(`Failed parsing chunk ${index}:`, err.message);
  }
});

// Format into JOB_QUEUE items
const jobQueue = allJobs
  .filter(j => j.title && j.slug)
  .map(j => ({
    title: `${j.title} @ ${j.company || 'Direct'}`,
    url: `https://artha.link/@creator_feed/jobs/${j.slug}`
  }));

console.log(`Extracted ${jobQueue.length} jobs! Sample:`);
console.log(JSON.stringify(jobQueue.slice(0, 5), null, 2));
```

---

### Option B: Python Extractor Script

Save as `extract_queue.py` and run `python extract_queue.py`:

```python
import json
import re

with open("data.json", "r", encoding="utf-8") as f:
    content = f.read()

# Split concatenated JSON objects if present
chunks = re.split(r'\}\s*\n\s*\{', content)
all_jobs = []

for i, chunk in enumerate(chunks):
    json_str = ("" if i == 0 else "{") + chunk + ("" if i == len(chunks) - 1 else "}")
    try:
        data = json.loads(json_str)
        if "items" in data:
            all_jobs.extend(data["items"])
    except Exception as e:
        print(f"Error parsing chunk {i}: {e}")

queue = [
    {
        "title": f"{j.get('title')} @ {j.get('company', 'Direct')}",
        "url": f"https://artha.link/@creator_feed/jobs/{j.get('slug')}"
    }
    for j in all_jobs if j.get("slug") and j.get("title")
]

print(f"Total jobs extracted: {len(queue)}")
with open("extracted_queue.json", "w", encoding="utf-8") as out:
    json.dump(queue, out, indent=2)
```

---

## 📚 Related Documentation

- [Anti-Detection Architecture](file:///d:/DEVELOPMENT/all-bots/docs/anti-detection.md)
- [Browser Bot Engine Reference](file:///d:/DEVELOPMENT/all-bots/docs/browser-bot.md)
- [GitHub & jsDelivr CDN Setup](file:///d:/DEVELOPMENT/all-bots/docs/cdn-and-github-guide.md)
