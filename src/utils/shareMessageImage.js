/**
 * Generates a PNG image of an anonymous message formatted for WhatsApp Status (1080x1920).
 * Uses HTML5 Canvas to render a card with a gradient background and branding.
 * 
 * @param {string} messageText - The text content of the message to share.
 * @returns {Promise<File>} - A Promise that resolves to a PNG File object.
 */
export async function generateMessageImage(messageText) {
    // 1. Setup Canvas (WhatsApp Status format: 1080x1920)
    const width = 1080;
    const height = 1920;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // 2. Draw Background (Brand Gradient: Purple to Pink)
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#9333EA'); // purple-600
    gradient.addColorStop(1, '#DB2777'); // pink-600
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // 3. Draw Message Card Configuration
    const cardWidth = 900;
    const cardPadding = 80;
    const cardX = (width - cardWidth) / 2;
    const cardY = 600; // Centered vertically-ish for Status feel
    const cornerRadius = 40;

    // Helper to draw rounded rectangle
    const drawRoundedRect = (x, y, w, h, r) => {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
        ctx.fill();
    };

    // 4. Text Wrapping Logic
    ctx.font = '500 48px Inter, system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#1F2937'; // gray-800
    ctx.textAlign = 'center';

    const words = messageText.split(' ');
    const lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
        const word = words[i];
        const width = ctx.measureText(currentLine + " " + word).width;
        if (width < (cardWidth - cardPadding * 2)) {
            currentLine += " " + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    lines.push(currentLine);

    // 5. Calculate Dynamic Card Height
    const lineHeight = 65;
    const cardContentHeight = lines.length * lineHeight;
    const totalCardHeight = cardContentHeight + (cardPadding * 2);
    const finalCardY = (height / 2) - (totalCardHeight / 2);

    // 6. Draw the Card
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
    ctx.shadowBlur = 30;
    ctx.shadowOffsetY = 15;
    drawRoundedRect(cardX, finalCardY, cardWidth, totalCardHeight, cornerRadius);
    ctx.shadowColor = 'transparent'; // Reset shadow for text

    // 7. Draw the Text
    ctx.fillStyle = '#1F2937';
    lines.forEach((line, index) => {
        ctx.fillText(
            line,
            width / 2,
            finalCardY + cardPadding + (lineHeight / 2) + (index * lineHeight) + 15 // +15 for vertical centering tweak
        );
    });

    // 8. Footer Branding
    ctx.font = 'bold 40px Inter, system-ui, sans-serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.globalAlpha = 0.9;
    ctx.fillText('KALA', width / 2, height - 150);

    ctx.font = '400 32px Inter, system-ui, sans-serif';
    ctx.fillText('mensagens anónimas', width / 2, height - 100);
    ctx.globalAlpha = 1.0;

    // 9. Convert Canvas to File
    return new Promise((resolve) => {
        canvas.toBlob((blob) => {
            const file = new File([blob], `kala-mensage-${Date.now()}.png`, { type: 'image/png' });
            resolve(file);
        }, 'image/png');
    });
}
