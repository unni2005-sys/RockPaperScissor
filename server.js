const http = require('http');
const fs = require('fs');
const path = require('path');

const root = __dirname;

function loadLocalEnv() {
  const envPath = path.join(root, '.env');
  if (!fs.existsSync(envPath)) return;
  const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/);
  for (const line of lines) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (match && !process.env[match[1]]) process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, '');
  }
}

loadLocalEnv();
const port = Number(process.env.PORT || 3000);
const localReasonTemplates = [
  '{ai} wins because {user} triggered the lab\'s emergency rule about suspiciously confident hand gestures.',
  'The committee selected {ai} after determining that {user} has never recovered from a serious paperwork disadvantage.',
  '{ai} was the only move approved by our highly credentialed panel of people who enjoy being technically correct.',
  'According to the official chart, {user} creates a measurable confidence leak that {ai} is trained to exploit.',
  '{ai} became inevitable the moment {user} entered the arena with that much unlicensed optimism.',
  'The lab\'s antique calculator compared {user} and {ai}, then printed a result that was rude but legally binding.',
  '{ai} has seniority in this matchup, plus a suspiciously well-organized folder containing evidence against {user}.',
  'Your {user} was compelling, but {ai} arrived with a stamped permit from the Department of Unfair Advantages.',
  'A regional expert confirmed that {ai} is more aerodynamic in theory, especially when {user} is holding the confidence.',
  'The scoreboard prefers {ai}; researchers call this bias, while the scoreboard calls it excellent taste.'
];
const localUserWinTemplates = [
  '{user} won because {ai} briefly violated the lab\'s anti-overconfidence protocol.',
  'The committee has confirmed that {user} was correct by accident, which is still legally a victory.',
  '{ai} allowed {user} to win as part of a long-term experiment in misplaced confidence.',
  'The result favors {user}; three calculators objected, but none of them could produce paperwork.',
  '{user} slipped past the prediction engine while {ai} was distracted by its own impressive statistics.'
];

function sendJson(response, status, payload) {
  response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify(payload));
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = '';
    request.on('data', chunk => {
      body += chunk;
      if (body.length > 10000) reject(new Error('Request too large'));
    });
    request.on('end', () => resolve(JSON.parse(body || '{}')));
    request.on('error', reject);
  });
}

function generateLocalReason({ userChoice, aiChoice, outcome = '', recentReasons = [] }) {
  const templates = outcome.includes('user unexpectedly wins') ? localUserWinTemplates : localReasonTemplates;
  const available = templates.filter(template => {
    const reason = template.replaceAll('{user}', userChoice).replaceAll('{ai}', aiChoice);
    return !recentReasons.includes(reason);
  });
  const pool = available.length ? available : templates;
  const template = pool[Math.floor(Math.random() * pool.length)];
  return template.replaceAll('{user}', userChoice).replaceAll('{ai}', aiChoice);
}

async function generateReason({ userChoice, aiChoice, outcome, recentReasons = [] }) {
  if (!process.env.OPENAI_API_KEY) return generateLocalReason({ userChoice, aiChoice, recentReasons });

  const recent = recentReasons.length
    ? `Avoid repeating these recent lines: ${recentReasons.join(' | ')}`
    : 'There are no previous lines to avoid.';

  const prompt = [
    'Write one funny fake logical justification for a rigged rock-paper-scissors AI.',
    `The human played ${userChoice}; the AI played ${aiChoice}; ${outcome}.`,
    'Make it one sentence, 14 to 26 words, specific to this matchup, confidently absurd, and medium-length.',
    'Do not mention prompts, language models, policies, randomness, or that you are generating text.',
    'Do not start with a label such as “Reason:” and do not use quotation marks.',
    recent
  ].join('\n');

  const apiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      temperature: 1.15,
      max_tokens: 60,
      messages: [
        { role: 'system', content: 'You are the suspiciously confident comedy voice of a cheating game show.' },
        { role: 'user', content: prompt }
      ]
    })
  });

  if (!apiResponse.ok) throw new Error(`OpenAI request failed: ${apiResponse.status}`);
  const data = await apiResponse.json();
  const reason = data.choices?.[0]?.message?.content?.trim();
  if (!reason) throw new Error('OpenAI returned an empty reason');
  return reason.replace(/^reason:\s*/i, '').replace(/^['“”"]|['“”"]$/g, '');
}

async function handleReason(request, response) {
  let input = {};
  try {
    input = await readBody(request);
    const reason = await generateReason(input);
    sendJson(response, 200, { reason });
  } catch (error) {
    console.error(error.message);
    sendJson(response, 200, { reason: generateLocalReason(input), source: 'local-fallback' });
  }
}

function serveIndex(response) {
  fs.readFile(path.join(root, 'index.html'), (error, content) => {
    if (error) {
      response.writeHead(500);
      response.end('Unable to load the game.');
      return;
    }
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    response.end(content);
  });
}

const server = http.createServer((request, response) => {
  if (request.method === 'POST' && request.url === '/api/reason') {
    handleReason(request, response);
    return;
  }
  if (request.method === 'GET' && (request.url === '/' || request.url === '/index.html')) {
    serveIndex(response);
    return;
  }
  response.writeHead(404);
  response.end('Not found');
});

server.on('error', error => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use. Stop the existing server or choose another port with PORT=3001.`);
    process.exit(1);
  }
  throw error;
});

server.listen(port, () => {
  console.log(`RPS Unfair Advantage running at http://localhost:${port}`);
  if (!process.env.OPENAI_API_KEY) {
    console.warn('OPENAI_API_KEY is not configured; using fallback reasoning.');
  }
});
