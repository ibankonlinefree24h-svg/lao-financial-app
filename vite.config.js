import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'ibank-api-server',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          // Enable CORS for external form submissions (including file:// origin)
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

          if (req.method === 'OPTIONS') {
            res.statusCode = 204;
            res.end();
            return;
          }

          const parsedUrl = new URL(req.url, 'http://localhost');

          // POST /api/submit-form
          if (parsedUrl.pathname === '/api/submit-form' && req.method === 'POST') {
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', () => {
              try {
                const customer = JSON.parse(body);
                const filePath = path.resolve(__dirname, 'src/data/submissions.json');
                let existing = [];
                if (fs.existsSync(filePath)) {
                  try {
                    existing = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
                  } catch (e) {
                    existing = [];
                  }
                }
                
                // Set default fields if missing
                if (!customer.id) customer.id = 'CUST-' + Date.now();
                if (!customer.code) customer.code = (customer.country === '🇷🇺' ? 'R-' : 'L-') + Math.floor(100000 + Math.random() * 900000);
                if (!customer.status) customer.status = 'ລໍຖ້າກວດສອບ';
                if (!customer.submissionDate) customer.submissionDate = new Date().toISOString();

                existing.unshift(customer);
                fs.writeFileSync(filePath, JSON.stringify(existing, null, 2), 'utf-8');

                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 200;
                res.end(JSON.stringify({
                  success: true,
                  message: 'ຂໍ້ມູນລູກຄ້າຖືກບັນທຶກລົງໃນຖານຂໍ້ມູນສຳເລັດແລ້ວ',
                  customer
                }));
              } catch (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: err.message }));
              }
            });
            return;
          }

          // GET /api/submissions
          if (parsedUrl.pathname === '/api/submissions' && req.method === 'GET') {
            const filePath = path.resolve(__dirname, 'src/data/submissions.json');
            let data = [];
            if (fs.existsSync(filePath)) {
              try {
                data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
              } catch (e) {
                data = [];
              }
            }
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            res.end(JSON.stringify(data));
            return;
          }

          next();
        });
      }
    }
  ],
  base: './'
});
