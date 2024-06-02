# Chat with PDF - RAG
## 🔗 How to Use

1. **Sign In**: Start by signing in from the landing page. Once signed in, you'll see a `Let's Start` button. Click on this button to begin.

2. **Create a Project**: After clicking `Let's Start`, you can create a project. Provide a title, description, and upload a PDF file. The PDF will be uploaded to a cloud bucket (such as S3) and stored in PostgreSQL.

3. **PDF Processing**: On the backend, the PDF file is processed to generate vector embeddings of the content. These embeddings are then stored for future use.

4. **Asynchronous Processing**: The entire processing is handled asynchronously using BullMQ, ensuring that it is efficient and does not block other operations, allowing you to proceed without waiting for the chat interface to be ready.

5. **Dashboard Monitoring**: You can view all your projects on the frontend dashboard. Each project will display a status: 'creating', 'failed', or 'created'. This allows you to track the progress and know when your project is ready. If any issues occur, you will be able to see the status and take appropriate action.

6. **Chat Interface**: Once a project is ready, you can open it to access a user-friendly chat interface. Here, you can ask questions and receive relevant answers based on the content of your PDF.
## 🔗 How to Run

### Without Docker
1. Install Node.js from [Node.js Downloads](https://nodejs.org/en/download/package-manager).
2. Install dependencies:
   ```sh
   cd client
   pnpm i

   cd server
   yarn
   ```
3. Run the code:
   ```sh
   cd client
   pnpm run dev

   cd server
   yarn start:dev
   ```

### With Docker
1. Run the following command:
   ```sh
   docker compose up
   ```
   > Note: We use both server actions and a NestJS server. Occasionally, Docker may throw an error. If you encounter an issue, please raise an issue.

## 🔗 Environment Setup

### ⇉⟭ Server
1. Create a `.env` file in the `server` directory (`server/.env`):
   ```dotenv
   # Server port
   PORT=3333
   DATABASE_URL="postgresql://neondb_owner:********/neondb?sslmode=require"

   # S3
   AWS_ACCESS_KEY_ID=A********P**T********VN
   AWS_SECRET_ACCESS_KEY=M********U9J********aYr4********Yostzb
   AWS_S3_REGION=us-east-1
   AWS_S3_BUCKET_NAME=********

   # Rate Limit
   UPLOAD_RATE_TTL=60
   UPLOAD_RATE_LIMIT=3

   # Pinecone
   PINECONE_API_KEY=e1******-56**-43**-8f**-f**7**3**2**

   # OpenAI
   OPENAI_API_KEY=sk-p******j-f******og******Nr0P******FJt******JiBl******EvExEK

   # Clerk
   CLERK_SECRET_KEY=sk_t******rL5******BkF******7******2hF******aL

   # Redis
   REDIS_HOST="redis-*****tysub*****1-8*****.a.aivencloud.com"
   REDIS_PORT=*****
   REDIS_USERNAME="*****"
   REDIS_PASSWORD="AVNS_*****Mi*****S*****a"
   ```
2. Set up the following services:
   - **DATABASE_URL**: Supported options include [CockroachDB](https://www.cockroachlabs.com/), [Neon](https://neon.tech/), [Supabase](https://supabase.com/), [Tembo](https://tembo.io/), [Crunchy Bridge](https://www.crunchybridge.com/), or [EdgeDB](https://www.edgedb.com/).
   - **S3**:
      - AWS credentials: [AWS Security Credentials](https://us-east-1.console.aws.amazon.com/iam/home#/security_credentials)
      - S3 region and bucket: [S3 Console](https://ap-south-1.console.aws.amazon.com/s3/home?region=ap-south-1)
   - **Pinecone**: [Pinecone API Keys](https://app.pinecone.io/organizations)
   - **OpenAI**: [OpenAI API](https://platform.openai.com/api)
   - **Clerk**: [Clerk](https://clerk.com)
   - **Redis**: [Aiven Redis](https://aiven.io/caching)

### ⇉⟭ Client
1. Create a `.env.local` file in the `client` directory (`client/.env.local`):
   ```dotenv
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_******reWx******M******su******b3******uZG******A
   CLERK_SECRET_KEY=sk_test_SI******B******Kw******Qgdx7V******9aL

   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
   NEXT_PUBLIC_CLERK_AFTER_SIGN_OUT_URL=/

   # OpenAI
   OPENAI_API_KEY=sk-p******j-f******og******Nr0P******FJt******JiBl******EvExEK
   ```
2. Set up Clerk: [Clerk](https://clerk.com)

## 🔗 Frameworks

### ⇉⟭ Server
- [NestJS](https://nestjs.com/) (Express)
- [RxJS](https://rxjs.dev/)
- [Prisma](https://www.prisma.io/)
- [OpenAI](https://beta.openai.com/)
- [Redis](https://redis.io/)
- [BullMQ](https://docs.bullmq.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Vector Embeddings](https://docs.pinecone.io/docs/vector-embeddings)
- [Pinecone](https://www.pinecone.io/)
- [pgvector](https://github.com/pgvector/pgvector)
- [Docker](https://www.docker.com/)

### ⇉⟭ Client
- [Next.js](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [React Query](https://tanstack.com/query/v3/)
- [Redux](https://redux.js.org/)
- [Axios](https://axios-http.com/)
- [Lucide React](https://lucide.dev/)
- [Sonner](https://sonner.emilkowal.ski/)
- [Shadcn UI](https://ui.shadcn.com/)

## 🔗 Features
1. Chat
2. User Dashboard
3. Authentication
4. Landing Page

## 🔗 Key Notes
1. **NestJS**: NestJS provides a robust MVC architecture and excellent scalability, incorporating built-in features like dependency injection and a modular structure. It's ideal for production-grade enterprise applications, supporting microservices and ensuring maintainability, which traditional Node.js setups often lack.
   > NestJS optimally utilizes Express (Node.js), achieving performance and scalability not easily attained with a conventional setup.
2. All backend APIs are protected by your Clerk session token. Without this, backend access is restricted, complicating Postman testing. To test with Postman, temporarily remove or comment out the following line in `server/src/app.module.ts`:
   ```ts
   providers: [
     {
       provide: APP_GUARD,
       useClass: ClerkAuthGuard,
     }
   ]
   ```
3. All processing occurs within BullMQ workers, ensuring high scalability.
4. We use Redis for data caching. You can use it locally or connect to the production URL.

## 🔗 Helper Notes
1. Use Prisma commands:
   ```sh
   npx prisma studio
   npx prisma migrate dev --name init
   ```
2. S3 policy (`arn:aws:s3:::<bucket-name>/<key-name-prefix>`):
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::<bucket-name>/<key-name-prefix>/*"
       }
     ]
   }
   ```
3. CORS configuration:
   ```json
   [
     {
       "AllowedHeaders": ["*"],
       "AllowedMethods": ["PUT", "POST", "DELETE", "GET"],
       "AllowedOrigins": ["*"],
       "ExposeHeaders": []
     }
   ]
   ```