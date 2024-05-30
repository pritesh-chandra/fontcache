# FontCache

FontCache is a modern tool that downloads and manages Google Fonts locally, allowing you to use them in your projects without relying on third-party API calls. Ideal for environments with restricted internet access or for those aiming to improve performance and privacy.

## Features

- Download and manage Google Fonts locally
- Customize which fonts and weights to download
- Seamlessly integrate with popular build tools
- Optimize font loading for performance
- Ensure fonts are accessible and compatible across devices

## Installation

Install FontCache as a development dependency in your project:

```bash
npm install --save-dev fontcache
```

## Configuration
Create a fonts.config.json file in the root directory of your project to specify which fonts and weights you need:
```json
{
  "fonts": [
    {
      "family": "OpenSans",
      "weights": ["400", "700"]
    },
    {
      "family": "Roboto",
      "weights": ["400", "700"]
    }
  ]
}
```

## Usage
### Automatically Download Fonts
Add a script to your project's `package.json` to run the font downloader after dependencies are installed:
```json
{
  "scripts": {
    "postinstall": "download-fonts"
  }
}
```

This script will download the specified fonts and place them in the public/Fonts directory.

## Include Fonts in Your Project
Reference the downloaded fonts in your CSS file:
```css
@font-face {
  font-family: 'OpenSans';
  src: url('/Fonts/OpenSans/OpenSans-400.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: 'OpenSans';
  src: url('/Fonts/OpenSans/OpenSans-700.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
}

/* Add other @font-face rules as needed */
```

Then, use these fonts in your React components:

```jsx
import React from 'react';
import './App.css'; // Ensure this CSS file contains your @font-face definitions

const App = () => {
  return (
    <div style={{ fontFamily: 'OpenSans, sans-serif' }}>
      <h1>Hello, world!</h1>
      <p>This is a paragraph with dynamic fonts!</p>
    </div>
  );
};

export default App;
```

## Advanced Usage
### Customizing Font Download Directory
By default, FontCache downloads fonts to the `public/Fonts` directory. You can customize this by specifying a different directory in your `fonts.config.json` file:
```json
{
  "fonts": [
    {
      "family": "OpenSans",
      "weights": ["400", "700"]
    },
    {
      "family": "Roboto",
      "weights": ["400", "700"]
    }
  ],
  "outputDir": "static/fonts"
}
```

## License
FontCache is licensed under the MIT License. See the LICENSE(./LICENSE) file for more information.

### Summary
- **Title and Introduction**: Clearly state the package's name and purpose.
- **Features**: Highlight the key features of the package.
- **Installation**: Provide clear installation instructions.
- **Configuration**: Show how to configure the package with a `fonts.config.json` file.
- **Usage**: Explain how to download and use the fonts in a project.
- **Advanced Usage**: Include additional customization options.
- **Contributing**: Encourage contributions and provide a link to the repository.
- **License**: State the license under which the package is released.

By providing detailed and clear instructions, this `README.md` file will help users understand how to install, configure, and use FontCache effectively.
