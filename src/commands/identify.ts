import { Cohere } from "@langchain/cohere";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { OpenAI } from "@langchain/openai";
import {Args, Command, Flags} from '@oclif/core'
import fs from 'node:fs'

export default class Identify extends Command {
  static override args = {
    name: Args.string({description: 'name of the schema to use'}),
  }

  static override description = 'Uses and LLM to identify the queries and save their description'

  static override examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static override flags = {
    model: Flags.string({char: 'm', description: 'model to use in indentification. Currently only "cohere", "openai-3.5-turbo", and "openai-4-turbo" are supported'}),
  }

  getQueriesForSchema(name: string): string[] {
    const queries: string[] = []
    // Get all the directories in the queries directory that start with the schema name
    const directories = fs.readdirSync('queries').filter(file => file.startsWith(name))
    // For each directory, open all .gql files in the queries directory for directories with the schema name
    for (const directory of directories) {
      const files = fs.readdirSync(`queries/${directory}/queries`).filter(file => file.endsWith('.gql'))
      for (const file of files) {
        const query = fs.readFileSync(`queries/${directory}/queries/${file}`, 'utf8')
        queries.push(query)
      }
    }

    return queries
  }

  async identifyQuery(query: string, model: any): Promise<string> {
    const generateQueryPrompt = ChatPromptTemplate.fromMessages([
      ["system", `You are an expert in GraphQL APIs. You will be provided example GraphQL queries and asked to provide descriptions for each query.`],
      ["user", `
        Please describe the following GraphQL query and when you would use it and what you would use it for. Do not use lists but full sentences to describe the query.
      
        {query}
      `]])

    const outputParser = new StringOutputParser();
    const chain = generateQueryPrompt.pipe(model).pipe(outputParser);

    return chain.invoke({query});
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Identify)

    if (args.name === undefined) {
      this.error('Please provide a schema name')
    }

    // Set the default model to cohere
    let model;

    switch (flags.model) {
      case "openai-3.5-turbo": {
        model = new OpenAI({
          apiKey: process.env.OPENAI_KEY,
          model: "openai-3.5-turbo",
        });
        break;
      }

      case "openai-4-turbo": {
        model = new OpenAI({
          apiKey: process.env.OPENAI_KEY,
          model: "openai-4-turbo",
        });
        break;
      }

      default: {
        model = new Cohere({
          apiKey: process.env.COHERE_KEY,
        });
        break;
      }
    }

    // Create the data directory if it doesn't exist
    if (!fs.existsSync('data')) {
      fs.mkdirSync('data', { recursive: true })
    }

    // Get all the queries for the schema
    const queries = this.getQueriesForSchema(args.name)

    // Identify each query
    for (const query of queries) {
      this.log(`Identifying query: ${query}`)
      const description = await this.identifyQuery(query, model)
      
      const jsonLRow = {
        description,
        query,
      }
      
      // Write the query and description to a file as JSONL
      fs.appendFileSync(`data/${args.name}.jsonl`, JSON.stringify(jsonLRow) + "\n")

      // Sleep 15 seconds to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 15_000));
    }

  }
}
