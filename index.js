import fs from 'fs';
import inquirer from 'inquirer';

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
            name: 'liscense',
            message: 'Choose a liscense for your project: ',
            choices: ['none','MIT Liscense','GNU GPLv3','GNU AGPLv3','GNU LGPLv3','Mozilla Public License 2.0','Apache License 2.0','Boost Software Liscense 1.0','The Unlicense']
        }
    ])
}

//TODO: verify table of contents is working
const generateMD = ({title,description,installation,usage,liscense,contribute,tests, github, email}) =>{
    return `# ${title}

## Description

${description}

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation

${installation}

## Usage

${usage}

## License

${liscense}

## Contributing

${contribute}

## Tests

${tests}

## Questions

GitHub: ${github}
If you have additional questions, please contact me by email at ${email}`
}

const init = () => {
    askQuestions()
        .then(answers => {
            //create dist folder if it doesn't exist
            if(!fs.existsSync('./dist')) fs.mkdirSync('./dist')
            
            fs.promises.writeFile('./dist/README.md',generateMD(answers))
        })
        .then(() => console.log('Successfully wrote new README.md in dist directory...'))
        .catch(err => console.log(err))
}

init();
