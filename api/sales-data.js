import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  try {
    // Read the sales data JSON file
    const dataPath = path.join(process.cwd(), 'public', 'sales_data.json');
    const fileContents = fs.readFileSync(dataPath, 'utf8');
    const data = JSON.parse(fileContents);

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Error reading sales data:', error);
    res.status(500).json({ error: 'Failed to load sales data' });
  }
}
