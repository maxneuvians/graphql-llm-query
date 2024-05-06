import {Args, Command, Flags} from '@oclif/core'
import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

export default class Generate extends Command {
  static override args = {
    file: Args.string({description: 'path to GraphQL file to read'}),
  }

  static override description = 'Generates sample queries for an existing GraphQL schema'

  static override examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static override flags = {
    depth: Flags.integer({char: 'd', description: 'query depth to generate', max: 5, min: 1}),
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Generate)

    // Create a queries directory if it doesn't exist
    if (!fs.existsSync('queries')) {
      this.log('Creating queries directory')
      fs.mkdirSync('queries', { recursive: true })
    }

    // Set a default depth of 3
    const depth = flags.depth || 3

    if (args.file && depth) {
      // If file path does not end in .graphql, append it
      if (args.file && !args.file.endsWith('.graphql')) {
        args.file += '.graphql'
      }

      // Parse the base filename from the file path
      const baseFilename = path.parse(args.file).name

      this.log(`Generating queries for ${args.file} with depth ${depth}`)
      // Execute the gql-generator command in the shell
      execSync(`npx gql-generator --schemaFilePath ${args.file} --depthLimit ${depth} --destDirPath ./queries/${baseFilename}_d${depth}`)
    }
  }
}
