# Chat with PDF - RAG
## 🔗 Frameworks
### ⇉⟭`Server`
- [NestJs](https://nestjs.com/)(Express), [rxjs](https://rxjs.dev/), [prisma](https://www.prisma.io/), [openai](https://beta.openai.com/), [Redis](https://redis.io/), [BullMQ](https://docs.bullmq.io/), [Postgres](https://www.postgresql.org/), [Vector Embeddings](https://docs.pinecone.io/docs/vector-embeddings), [Pinecone](https://www.pinecone.io/), [Pgvector](https://github.com/pgvector/pgvector), [Docker](https://www.docker.com/)

### ⇉⟭`Client`
- [Next.js](https://nextjs.org/), [TailwindCSS](https://tailwindcss.com/), [React Query](https://tanstack.com/query/v3/), [Redux](https://redux.js.org/), [axios](https://axios-http.com/), [lucide-react](https://lucide.dev/), [sonner](https://sonner.emilkowal.ski/), [shadcn](https://ui.shadcn.com/)
## 🔗 keynote
1. `NestJS` - NestJS offers a solid MVC architecture and excellent scalability, provides built-in features like dependency injection and a modular architecture, making it ideal for production-grade enterprise applications. It supports microservices and ensures maintainability, unlike traditional Node.js setups, which can struggle with these aspects.
> Under the hood, NestJS uses Express (Node.js) in a very optimal way, which isn't easily achievable with a traditional setup.

2. All backend APIs are protected by your Clerk session token. Without this logic, we cannot access the backend, making it challenging to test with Postman. If you wish to test the backend API solely from Postman, you can temporarily remove or comment out the following line in `server/src/app.module.ts`
   ```ts
    providers: [
      {
      provide: APP_GUARD,
      useClass: ClerkAuthGuard,
      }
    ]
   ```
3. Note that all processing occurs within BullMQ workers, making it highly scalable.
4. We leverage Redis for data caching. You can either use this locally or connect to the production URL.

## 🔗 Environment Setup
### ⇉⟭`Server`
> Make `.env` - `server\.env`
```dotenv
#server port
PORT=3333
DATABASE_URL="postgresql://neondb_owner:********/neondb?sslmode=require"

#s3
AWS_ACCESS_KEY_ID=A********P**T********VN
AWS_SECRET_ACCESS_KEY=M********U9J********aYr4********Yostzb
AWS_S3_REGION=us-east-1
AWS_S3_BUCKET_NAME=********

#Rate Limit
UPLOAD_RATE_TTL=60
UPLOAD_RATE_LIMIT=3

#https://app.pinecone.io/organizations/******/projects/******/keys
PINECONE_API_KEY=e1******-56**-43**-8f**-f**7**3**2**
#https://platform.openai.com/api
OPENAI_API_KEY=sk-p******j-f******og******Nr0P******FJt******JiBl******EvExEK

#Cleark
CLERK_SECRET_KEY=sk_t******rL5******BkF******7******2hF******aL
```
#### `src`

1. DATABASE_URL - [**CockroachDB**](https://www.cockroachlabs.com/) / [**Neon**](https://neon.tech/) / [**Supabase**](https://supabase.com/) / [**Tembo**](https://tembo.io/) / [**Crunchy Bridge**](https://www.crunchybridge.com/) / [**EdgeDB**](https://www.edgedb.com/)
2. s3
    - AWS_ACCESS_KEY_ID,AWS_SECRET_ACCESS_KEY - https://us-east-1.console.aws.amazon.com/iam/home#/security_credentials
    - AWS_S3_REGION,AWS_S3_BUCKET_NAME - https://ap-south-1.console.aws.amazon.com/s3/home?region=ap-south-1
3. PINECONE - https://app.pinecone.io/organizations -> API Keys
4. OPENAI_API_KEY -https://platform.openai.com/api
5. Clerk - https://clerk.com
### ⇉⟭`Client`
> Make `.env.local` - `client/.env.local`
```dotenv
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_******reWx******M******su******b3******uZG******A
CLERK_SECRET_KEY=sk_test_SI******B******Kw******Qgdx7V******9aL

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_OUT_URL=/
```
#### `src`
- https://clerk.com


## 🔗 Helper Notes
```md
npx prisma studio

npx prisma migrate dev --name init
```
- `s3 policy` - `arn:aws:s3:::<bucket-name>/<key-name-prefix>`
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:{bucket-name}:::{key-name-prefix}/*"
        }
    ]
}
```
- `Cors`
```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": [
      "PUT", "POST", "DELETE", "GET"
    ],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": []
  }
]
```

## 🔗 How To Run
