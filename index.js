import fs from 'fs';
import inquirer from 'inquirer';

const licenses = {
    MIT: "(https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)",
    "Apache 2.0": "(https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/license/apache-2-0)",
    "GPL v3": "(https://img.shields.io/badge/License-GPLv3-blue.svg)](https://opensource.org/license/gpl-3-0)",
    "BSD 3-Clause": "(https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/license/bsd-3-clause)",
    "MPL 2.0": "(https://img.shields.io/badge/License-MPL_2.0-orange.svg)](https://opensource.org/license/mpl-2-0)",
    Unlicense: "(https://img.shields.io/badge/license-Unlicense-blue.svg)](https://opensource.org/license/unlicense)"
};

const licenseChoices = [...Object.keys(licenses),'No License'];

const askQuestions = () =>{
    return inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter the title of your project: '
        },
        {
            type: 'input',
            name: 'description',
            message: 'Enter a description of your project: '
        },
        {
            type: 'input',
            name: 'installation',
            message: 'Enter installation instructions for your project: '
        },
        {
            type: 'input',
            name: 'usage',
            message: 'Enter usage information for your project: '
        },
        {
            type: 'input',
            name: 'contribute',
            message: 'Enter contribution guidelines for your project: '
        },
        {
            type: 'input',
            name: 'tests',
            message: 'Enter test instructions for your project: '
        },
        {
            type: 'list',
            name: 'license',
            message: 'Choose a license for your project: ',
            choices: licenseChoices
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub username: '
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter your email address: '
        }
    ])
}

const generateREADMEContent = ({title,description,installation,usage,license,contribute,tests,github,email}) =>{
    const licenseBadge = licenses[license] || '';
    const licenseSection = license === 'No License' ? '':`## License

This project is covered under the ${license} license.`

    return `# ${title}

` 
+ (license === 'No License' ? '' : `[![License]${licenseBadge}

`) +

`## Description

${description}

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)`
+ (license === 'No License' ? '' : `
- [License](#license)
`) +
`- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation

${installation}

## Usage

${usage}

` + licenseSection + `

## Contributing

${contribute}

## Tests

${tests}

## Questions

GitHub: [${github}](https://github.com/${github})

If you have additional questions, please contact me by email at [${email}](mailto:${email})`
}

const init = () => {
    askQuestions()
        .then(answers => {
            //create dist folder if it doesn't exist
            if(!fs.existsSync('./dist')) fs.mkdirSync('./dist')
            
            return fs.promises.writeFile('./dist/README.md',generateREADMEContent(answers))
        })
        .then(() => console.log('Successfully wrote new README.md in dist directory...'))
        .catch(err => console.log(err))
}

init();
