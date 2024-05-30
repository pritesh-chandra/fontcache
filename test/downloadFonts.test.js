const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

describe('FontCache', () => {
  it('should download fonts correctly', () => {
    // Run the font download script
    execSync('node bin/downloadFonts.js');

    // Check if fonts are downloaded
    const fontDir = path.join(__dirname, '..', 'public', 'Fonts');
    const fontsExist = fs.existsSync(fontDir);

    expect(fontsExist).to.be.true;

    // Check for specific font files
    const fontFilesExist = fs.existsSync(path.join(fontDir, 'Roboto', 'Roboto-400.woff2')) &&
      fs.existsSync(path.join(fontDir, 'Roboto', 'Roboto-700.woff2'));

    expect(fontFilesExist).to.be.true;
  });
});