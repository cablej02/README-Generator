import fs from 'fs';
import inquirer from 'inquirer';
import generateMarkdown from './utils/generateMarkdown.js';

export const licenses = {
    MIT: {badge:'[![License](https://img.shields.io/badge/License-MIT-blue.svg)]',url:'(https://choosealicense.com/licenses/mit/)'},
    "Apache 2.0": {badge:'[![License](https://img.shields.io/badge/License-Apache_2.0-%23007FFF.svg)]',url:'(https://choosealicense.com/licenses/apache-2.0/)'},
    "GPL v3": {badge:'[![License](https://img.shields.io/badge/License-GPLv3-blue.svg)]',url:'(https://choosealicense.com/licenses/gpl-3.0/)'},
    "AGPL v3": {badge:'[![License](https://img.shields.io/badge/License-AGPLv3-blue.svg)]',url:'(https://choosealicense.com/licenses/agpl-3.0/)'},
    "LGPL v3": {badge:'[![License](https://img.shields.io/badge/License-LGPLv3-blue.svg)]',url:'(https://choosealicense.com/licenses/lgpl-3.0/)'},
    "BSD 3": {badge:'[![License](https://img.shields.io/badge/License-BSD_3-green.svg)]',url:'(https://choosealicense.com/licenses/bsd-3-clause-clear/)'},
    "MPL 2.0": {badge:'[![License](https://img.shields.io/badge/License-MPL_2.0-orange.svg)]',url:'(https://choosealicense.com/licenses/mpl-2.0/)'},
    "BSL 1.0": {badge:'[![License](https://img.shields.io/badge/License-BSL_1.0-blue.svg)]',url:'(https://choosealicense.com/licenses/bsl-1.0/)'},
    Unlicense: {badge:'[![License](https://img.shields.io/badge/License-Unlicense-blue.svg)]',url:'(https://choosealicense.com/licenses/unlicense/)'}
};

const licenseChoices = [...Object.keys(licenses),'No License'];

const questions = [
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
]    

const writeToFile = (fileName, data) => {
    //create dist folder if it doesn't exist
    if (!fs.existsSync('./dist')) fs.mkdirSync('./dist');
    return fs.promises.writeFile(`./dist/${fileName}`,generateMarkdown(data))
}

const init = () => {
    inquirer.prompt(questions)
        .then(answers => writeToFile('README.md',answers))
        .then(() => console.log('Successfully wrote new README.md in dist directory...'))
        .catch(err => console.log(err))
}

init();
