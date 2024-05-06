import {Args, Command, Flags} from '@oclif/core'
import { buildClientSchema, getIntrospectionQuery, printSchema  } from 'graphql'
import fs from 'node:fs'

export default class Fetch extends Command {
  static override args = {
    url: Args.string({description: 'URL to fetch the GraphQL schema from'}),
  }

  static override description = 'Fetches and saves a GraphQL schema from a remote source'

  static override examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static override flags = {
    method: Flags.string({char: 'm', description: 'HTTP method to use', options: ['GET', 'POST', 'PUT', 'DELETE']}),
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Fetch)

    if (args.url) {
      this.log(`Downloading schema from ${args.url}`)

      // Default flags
      const method = flags.method || 'POST'

      const { data, errors } = await fetch(args.url, {
        body: JSON.stringify({ query: getIntrospectionQuery() }),
        headers: {
          'Content-Type': 'application/json',
        },
        method
      }).then(res => res.json())

      if (errors) {
        this.log(JSON.stringify(errors, null, 2))
        return
      }

      // Create a schema directory if it doesn't exist
      if (!fs.existsSync('schema')) {
        this.log('Creating schema directory')
        fs.mkdirSync('schema', { recursive: true })
      }

      // Write the schema to a file with spear cased domain name
      const domain = new URL(args.url).hostname.replaceAll('.', '-').toLowerCase()

      fs.writeFileSync(`schema/${domain}.graphql`, printSchema(buildClientSchema(data)))

      this.log('Schema downloaded successfully')

    } else {
      this.log('No URL provided')
    }
  }
}
