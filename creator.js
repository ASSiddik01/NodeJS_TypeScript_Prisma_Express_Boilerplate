/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs')
const path = require('path')

if (process.argv.length < 2) {
  console.error('Command will be: node modulesGenerator.js your_folder_name')
  process.exit(1)
}

// Get folder and file names from command-line arguments
const name = process.argv[2]
// const folderName = process.argv[3]
// Define the target directory
const targetDirectory = path.join(__dirname, 'src', 'app', 'modules', name)
// Create the target directory
fs.mkdirSync(targetDirectory, { recursive: true })
// Create and write the files in the target directory
const controllerTemplate = `
// Your controller code here
`
fs.writeFileSync(
  path.join(targetDirectory, `${name}.controller.ts`),
  controllerTemplate
)
const serviceTemplate = `
// Your service code here
`
fs.writeFileSync(
  path.join(targetDirectory, `${name}.service.ts`),
  serviceTemplate
)
const routesTemplate = `
// Define your routes here
`
fs.writeFileSync(
  path.join(targetDirectory, `${name}.routes.ts`),
  routesTemplate
)
const interfacesTemplate = `
// Define your interfaces here
`
fs.writeFileSync(
  path.join(targetDirectory, `${name}.interfaces.ts`),
  interfacesTemplate
)
const constantsTemplate = `
export const ${name} = ['']
`
fs.writeFileSync(
  path.join(targetDirectory, `${name}.constants.ts`),
  constantsTemplate
)
const validationTemplate = `
// Define your validations here
`
fs.writeFileSync(
  path.join(targetDirectory, `${name}.validation.ts`),
  validationTemplate
)

console.log(
  `Folder '${name}' and files created successfully in 'src/app/modules'.`
)
