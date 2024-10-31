import {licenses} from '../index.js';

// If there is no license, return an empty string
const renderLicenseBadge = (license) => {
    const licenseInfo = licenses[license] || null;
    return licenseInfo ? licenseInfo.badge + licenseInfo.url : '';
}

const renderLicenseLink = (license) => {
   return license === 'No License' ? '' : licenses[license].url;
}

// If there is no license, return an empty string
const renderLicenseSection = (license) => {
    const licenseLink = renderLicenseLink(license);
    return license === 'No License' ? '':`## License

This project is covered under the [${license}]${licenseLink} license.

`
}

const generateMarkdown = ({title,description,installation,usage,license,contribute,tests,github,email}) => {
    const licenseBadge = renderLicenseBadge(license);
    const licenseSection = renderLicenseSection(license);

    return `# ${title}

${licenseBadge === 'No License' ? '' : `${licenseBadge}

`}## Description

${description}

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
${license === 'No License' ? '' : `- [License](#license)
`}- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation

${installation}

## Usage

${usage}

${licenseSection}## Contributing

${contribute}

## Tests

${tests}

## Questions

GitHub: [${github}](https://github.com/${github})

If you have additional questions, please contact me by email at [${email}](mailto:${email})`
}

export default generateMarkdown;
