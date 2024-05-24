//local

import { backend_pdf_prefix } from "@/links/backend-path-link.constant";

const PDF_SERVER_BASE_URL = "http://localhost:3333";
export const BASE_URLS = [
  //1. PDF
  `${PDF_SERVER_BASE_URL}${backend_pdf_prefix}`,
  //2. example
  "https://api2.example.com",
];
