import { readFile } from 'fs/promises'

const readFileAsString = (filePath: string) => readFile(filePath, 'utf8')

export default readFileAsString
