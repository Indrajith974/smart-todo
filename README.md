# Smart Todo List with AI

Modern full-stack todo manager powered by Django REST, Next.js, Tailwind and optional AI helpers.

## Prerequisites

* **Backend**: Python 3.11, PostgreSQL 14+
* **Frontend**: Node.js 18+

## Quick Start

```bash
# 1. Backend
cd backend
python -m venv .venv && source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
# Edit the existing .env file with your database credentials
python manage.py migrate
python manage.py loaddata sample_data.json  # optional demo data
python manage.py runserver 8000

# 2. Frontend
cd ../frontend
npm install
npm run dev  # http://localhost:3000
```

## Features

* Responsive glass UI with light / dark mode toggle (preferences saved).
* Quick add tasks, AI priority indicator, detailed modal view.
* Import / Export tasks as JSON from the dashboard.
* RESTful API powered by Django REST Framework.
* Upcoming deadlines sidebar & stats bar.

## Environment Variables

Frontend reads `NEXT_PUBLIC_API_BASE` (defaults to `http://localhost:8000`).
Backend uses `.env` for database and any API keys.

## REST API Endpoints

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| GET    | /api/tasks/ | List tasks |
| POST   | /api/tasks/ | Create task |
| PUT/PATCH | /api/tasks/{id}/ | Update task |
| DELETE | /api/tasks/{id}/ | Delete task |
| GET    | /api/categories/ | List categories |
| POST   | /api/categories/ | Create category |
| GET    | /api/context/ | List context entries |
| POST   | /api/context/ | Add context entry |

## Frontend Pages

* `/dashboard` – greeting, stats, quick add, task grid, upcoming sidebar.
* `/tasks/create` – full task creation form.
* `/context/input` – add context entry.

## Contributing

1. Fork & clone.
2. Create a new branch.
3. Commit & open PR.

---
Made with ❤️ using Django, Next.js and Tailwind CSS.
