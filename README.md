# AI Site Builder

A modern AI-powered website builder with authentication, payment integration, and database management.

## Features

- 🤖 AI-powered website generation using OpenRouter
- 🔐 User authentication with Better Auth
- 💳 Stripe payment integration
- 🗄️ Database support (Neon/Supabase)
- 📱 Responsive React frontend
- ⚡ Fast API with Express & TypeScript
- 🎨 Modern UI with Tailwind CSS

## Tech Stack

### Frontend
- React 19
- TypeScript
- Vite
- Tailwind CSS
- Lucide Icons
- Better Auth Client

### Backend
- Node.js
- Express
- TypeScript
- Prisma ORM
- Better Auth
- OpenAI API
- Stripe

### Database
- PostgreSQL (Neon or Supabase)

## Deployment

### Vercel Deployment

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy Project**
   ```bash
   vercel
   ```

4. **Set Environment Variables in Vercel Dashboard**
   - Go to your project settings in Vercel
   - Add all environment variables from `.env.example`

### Database Setup

#### Option 1: Neon Database (Default)
1. Create a Neon account at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string
4. Add to Vercel environment variables as `DATABASE_URL`

#### Option 2: Supabase Database
1. Create a Supabase account at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings > Database
4. Copy the connection string
5. Add to Vercel environment variables as `DATABASE_URL`

### Environment Variables Required

```bash
# Database
DATABASE_URL="your-postgres-connection-string"

# Authentication
BETTER_AUTH_SECRET="your-secret-key"
BETTER_AUTH_URL="https://your-domain.vercel.app"

# AI Service
AI_API_KEY="sk-or-v1-your-openrouter-key"

# Payment
STRIPE_SECRET_KEY="sk_test_your-stripe-key"
STRIPE_WEBHOOK_SECRET="whsec_your-webhook-secret"

# Frontend
TRUSTED_ORIGINS="https://your-domain.vercel.app"
NODE_ENV="production"
```

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/prnvmishra/ai-Site-builder.git
   cd ai-Site-builder
   ```

2. **Install dependencies**
   ```bash
   # Server
   cd server
   npm install
   
   # Client
   cd ../client
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your variables
   ```

4. **Setup database**
   ```bash
   cd server
   npx prisma generate
   npx prisma db push
   ```

5. **Start development servers**
   ```bash
   # Server (in terminal 1)
   cd server
   npm run start
   
   # Client (in terminal 2)
   cd client
   npm run dev
   ```

## Project Structure

```
ai-Site-builder/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── lib/           # Utilities
│   │   └── configs/       # Configuration files
│   ├── package.json
│   └── vite.config.ts
├── server/                # Express backend
│   ├── controllers/       # Route controllers
│   ├── routes/           # API routes
│   ├── middlewares/      # Express middlewares
│   ├── lib/              # Server utilities
│   ├── prisma/           # Database schema
│   ├── package.json
│   └── server.ts
├── .env.example          # Environment variables template
├── README.md
└── vercel.json          # Vercel deployment config
```

## API Endpoints

### Authentication
- `POST /api/auth/sign-up` - User registration
- `POST /api/auth/sign-in` - User login
- `GET /api/auth/session` - Get current session

### User Routes
- `GET /api/user/credits` - Get user credits
- `GET /api/user/projects` - Get user projects
- `POST /api/user/project` - Create new project
- `GET /api/user/project/:id` - Get specific project

### Project Routes
- `GET /api/project/published` - Get published projects
- `GET /api/project/published/:id` - Get published project
- `POST /api/project/revision/:id` - Generate AI revision
- `PUT /api/project/save/:id` - Save project code

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
