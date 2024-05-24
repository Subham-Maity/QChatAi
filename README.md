# second_brain_labs

## 🔗 Task 

1. User can create a project on the frontend, providing - Title, Description and a PDF file (uploaded to cloud bucket like s3) stored in Postgres.

2. On the backend we process the pdf file to generate Vector Embeddings of the content inside the PDF and store that in Postgres. Note that the processing should happen in BullMQ worker.

3. User could view all the projects from the frontend dashboard with the status -> 'creating', 'failed', 'created'.

4. Users can open up any project where they will be shown a chat interface like ChatGPT to ask questions and get the relevant answers from the Vectors stored in Postgres with proper context. (You could use any LLM APIs).

5. Finally, dockerized the app. Creating docker containers for api backend and bullmq worker.

## 🔗 Basic Approach 

- Frameworks : NestJs (Scalable that's why) , Next.js 

- Architecture: Let's follow microservice architecture.

1. **Frontend**:
    - Form for users to input project details (Title, Description) and upload a PDF file.
    - Upon submission, send a request to the backend API with the project details and the uploaded PDF file.
    - Display a list of all projects with their status ('creating', 'failed', 'created').
    - When a user clicks on a project, show a chat interface similar to ChatGPT.

2. **Backend API**:
    - Set up a REST API endpoint to receive project creation requests from the frontend.
    - Store the project details (Title, Description) in a PostgreSQL database.
    - Upload the PDF file to a cloud storage service (e.g., AWS S3).
    - Add a job to the BullMQ queue for processing the PDF file and generating vector embeddings.

3. **BullMQ Worker**:
    - Set up a BullMQ worker to process jobs from the queue.
    - When a job is received, fetch the PDF file from the cloud storage service.
    - Process the PDF file to generate vector embeddings using a library like `pdf-parse` or `pdf-lib`.
    - Store the generated vector embeddings in the PostgreSQL database, associated with the corresponding project.
    - Update the project status in the database ('creating', 'failed', 'created').

4. **Chat Interface**:
    - In the frontend, when a user opens a project, fetch the project details and vector embeddings from the backend API.
    - Implement a chat interface similar to ChatGPT, where users can ask questions.
    - When a user asks a question, send a request to the backend API with the question and project details.
    - In the backend API, use an LLM API (e.g., OpenAI, Cohere, or Anthropic) to generate a relevant answer based on the question and the vector embeddings stored for that project.
    - Return the generated answer to the frontend and display it in the chat interface.

5. **Dockerization**:
    - Create a Dockerfile for the backend API and another for the BullMQ worker.
    - Build Docker images for the backend API and BullMQ worker.
    - Create a Docker Compose file to define and run the containers for the backend API, BullMQ worker, and PostgreSQL database.

## 🔗 Quick Notes - What I need to research for this one

- `Edge Runtime` - A system that deploys our application code onto Content Delivery Networks (CDNs) around the world. CDNs are small machines distributed across different geographic regions. In a traditional setup, our server is hosted in one central location. Users far away from that location experience slower response times due to the distance their requests have to travel. With the Edge Runtime, our code is replicated and deployed on CDNs worldwide. When a user makes a request, it's served by the nearest CDN, providing lightning-fast response times, no matter where the user is located. The trade-off is that the Edge Runtime has limitations on package size and available APIs compared to a traditional server environment. We can't use all Node.js APIs and npm packages, but if our application can work with the supported APIs, we can achieve superior user experience with minimal latency globally.
  
- `Retrieval Augmented Generation` - Retrieval augmented generation (RAG) is a natural language processing (NLP) technique that combines the strengths of both retrieval- and generative-based artificial intelligence (AI) models.

## 🔗 Stat
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