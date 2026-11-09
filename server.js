require('dotenv').config();
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Minificação leve em memória para CSS e JS e compressão Brotli/Gzip nativa (Lighthouse Performance)
 */
function minifyCss(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}:;,>~])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim();
}

function minifyJs(js) {
  return js
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/^\s*\/\/.*$/gm, '')
    .replace(/\n\s*\n/g, '\n')
    .trim();
}

function sendCompressed(req, res, contentType, bufferOrString, cacheControl) {
  const rawBuffer = Buffer.isBuffer(bufferOrString)
    ? bufferOrString
    : Buffer.from(bufferOrString, 'utf8');

  res.setHeader('Content-Type', contentType);
  res.setHeader('Vary', 'Accept-Encoding');
  if (cacheControl) {
    res.setHeader('Cache-Control', cacheControl);
  }

  const acceptEncoding = req.headers['accept-encoding'] || '';
  if (acceptEncoding.includes('br')) {
    res.setHeader('Content-Encoding', 'br');
    return res.send(zlib.brotliCompressSync(rawBuffer));
  }
  if (acceptEncoding.includes('gzip')) {
    res.setHeader('Content-Encoding', 'gzip');
    return res.send(zlib.gzipSync(rawBuffer));
  }
  return res.send(rawBuffer);
}

app.get(['/', '/index.html'], (req, res) => {
  const html = fs.readFileSync(path.join(PUBLIC_DIR, 'index.html'), 'utf8');
  return sendCompressed(req, res, 'text/html; charset=utf-8', html, 'no-cache');
});

app.get('/styles.css', (req, res) => {
  const css = fs.readFileSync(path.join(PUBLIC_DIR, 'styles.css'), 'utf8');
  return sendCompressed(req, res, 'text/css; charset=utf-8', minifyCss(css), 'public, max-age=3600');
});

app.get('/app.js', (req, res) => {
  const js = fs.readFileSync(path.join(PUBLIC_DIR, 'app.js'), 'utf8');
  return sendCompressed(req, res, 'application/javascript; charset=utf-8', minifyJs(js), 'public, max-age=3600');
});

app.use(
  express.static(PUBLIC_DIR, {
    maxAge: '7d',
    etag: true
  })
);

/**
 * Verifica se todas as variáveis de ambiente necessárias para o envio real via Zoho SMTP estão configuradas.
 */
function hasZohoSmtpConfig() {
  const host = (process.env.SMTP_HOST || '').trim();
  const user = (process.env.SMTP_USER || '').trim();
  const pass = (process.env.SMTP_PASS || '').trim();
  const to = (process.env.MAIL_TO || '').trim();
  return Boolean(host && user && pass && to);
}

app.post('/api/contato', async (req, res) => {
  try {
    const {
      objetivo = 'Solicitar um Projeto',
      perfil = 'Cliente Final (Proprietário / Empresa)',
      nome = '',
      telefone = '',
      email = '',
      cidade = '',
      ambiente = '',
      mensagem = ''
    } = req.body || {};

    const cleanNome = String(nome).trim();
    const cleanTelefone = String(telefone).trim();
    const cleanEmail = String(email).trim();
    const cleanCidade = String(cidade).trim();
    const cleanAmbiente = String(ambiente).trim();
    const cleanMensagem = String(mensagem).trim();

    if (!cleanNome || !cleanTelefone || !cleanCidade || !cleanAmbiente) {
      return res.status(400).json({
        ok: false,
        error: 'Por favor, preencha nome, WhatsApp/telefone, cidade e o ambiente principal.'
      });
    }

    const recipient = (process.env.MAIL_TO || 'contato@atelierveral.com.br').trim();
    const subject = `[Atelier Veral] ${objetivo} — ${cleanAmbiente} | ${cleanCidade}`;
    const timestamp = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

    const textBody = [
      '============================================================',
      'NOVA SOLICITAÇÃO PELO SITE — ATELIER VERAL',
      '============================================================',
      `Data/Hora:   ${timestamp}`,
      `Para:        ${recipient}`,
      `Assunto:     ${subject}`,
      '------------------------------------------------------------',
      `Objetivo:    ${objetivo}`,
      `Perfil:      ${perfil}`,
      `Nome:        ${cleanNome}`,
      `WhatsApp:    ${cleanTelefone}`,
      `E-mail:      ${cleanEmail || 'Não informado'}`,
      `Cidade:      ${cleanCidade}`,
      `Ambiente:    ${cleanAmbiente}`,
      '------------------------------------------------------------',
      'Mensagem / Detalhes:',
      cleanMensagem || '(Sem observações adicionais)',
      '============================================================'
    ].join('\n');

    if (!hasZohoSmtpConfig()) {
      console.log('\n' + textBody);
      console.log('[Modo Simulação] Variáveis Zoho SMTP ausentes — pedido registrado no terminal sem envio de e-mail.\n');

      return res.status(200).json({
        ok: true,
        mode: 'simulacao',
        recipient,
        subject,
        ambiente: cleanAmbiente,
        cidade: cleanCidade
      });
    }

    const smtpPort = Number(process.env.SMTP_PORT) || 465;
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST.trim(),
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: process.env.SMTP_USER.trim(),
        pass: process.env.SMTP_PASS.trim()
      }
    });

    const htmlBody = `
      <div style="font-family: Georgia, serif; background-color: #0F0F0E; color: #F5EFE6; padding: 36px; border: 1px solid #C5A56E;">
        <p style="font-family: sans-serif; font-size: 11px; letter-spacing: 0.2em; color: #C5A56E; text-transform: uppercase; margin: 0 0 8px;">
          ATELIER VERAL • MARCENARIA DE MÓVEIS DE LUXO SOB MEDIDA
        </p>
        <h2 style="font-weight: 500; font-size: 24px; margin: 0 0 24px; color: #F5EFE6;">
          ${objetivo} — ${cleanAmbiente} (${cleanCidade})
        </h2>
        <table style="width: 100%; border-collapse: collapse; font-family: sans-serif; font-size: 14px; color: #F5EFE6;">
          <tr><td style="padding: 8px 0; color: #C5A56E; width: 160px;">Objetivo:</td><td style="padding: 8px 0;">${objetivo}</td></tr>
          <tr><td style="padding: 8px 0; color: #C5A56E;">Perfil:</td><td style="padding: 8px 0;">${perfil}</td></tr>
          <tr><td style="padding: 8px 0; color: #C5A56E;">Nome:</td><td style="padding: 8px 0;">${cleanNome}</td></tr>
          <tr><td style="padding: 8px 0; color: #C5A56E;">WhatsApp / Telefone:</td><td style="padding: 8px 0;">${cleanTelefone}</td></tr>
          <tr><td style="padding: 8px 0; color: #C5A56E;">E-mail:</td><td style="padding: 8px 0;">${cleanEmail || 'Não informado'}</td></tr>
          <tr><td style="padding: 8px 0; color: #C5A56E;">Cidade:</td><td style="padding: 8px 0;"><strong>${cleanCidade}</strong></td></tr>
          <tr><td style="padding: 8px 0; color: #C5A56E;">Ambiente Principal:</td><td style="padding: 8px 0;"><strong>${cleanAmbiente}</strong></td></tr>
        </table>
        <hr style="border: none; border-top: 1px solid rgba(197,165,110,0.3); margin: 20px 0;" />
        <p style="font-family: sans-serif; font-size: 12px; color: #C5A56E; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px;">
          Detalhes do Projeto / Agendamento:
        </p>
        <p style="font-family: sans-serif; font-size: 14px; line-height: 1.6; color: #F5EFE6; white-space: pre-wrap;">${cleanMensagem || 'Sem observações adicionais.'}</p>
      </div>
    `;

    await transporter.sendMail({
      from: `"Atelier Veral Site" <${process.env.SMTP_USER.trim()}>`,
      to: recipient,
      replyTo: cleanEmail || undefined,
      subject,
      text: textBody,
      html: htmlBody
    });

    console.log(`\n[Zoho SMTP] E-mail enviado com sucesso para ${recipient} | Assunto: ${subject}\n`);

    return res.status(200).json({
      ok: true,
      mode: 'zoho-smtp',
      recipient,
      subject,
      ambiente: cleanAmbiente,
      cidade: cleanCidade
    });
  } catch (err) {
    console.error('[Erro no envio do formulário]:', err);
    return res.status(500).json({
      ok: false,
      error: 'Não foi possível processar sua solicitação no momento. Tente novamente ou fale pelo WhatsApp Concierge.'
    });
  }
});

app.listen(PORT, () => {
  console.log(`============================================================`);
  console.log(`Atelier Veral — Servidor ativo em http://localhost:${PORT}`);
  console.log(`Modo de E-mail: ${hasZohoSmtpConfig() ? 'PRODUÇÃO (Zoho Mail SMTP ativo)' : 'SIMULAÇÃO (Log no terminal — .env não configurado)'}`);
  console.log(`Destinatário padrão: ${(process.env.MAIL_TO || 'contato@atelierveral.com.br').trim()}`);
  console.log(`============================================================`);
});
