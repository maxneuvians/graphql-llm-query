import { CohereEmbeddings } from '@langchain/cohere'
import { Chroma } from '@langchain/community/vectorstores/chroma'
import { Document } from '@langchain/core/documents'
import { EmbeddingsInterface } from "@langchain/core/embeddings"
import { OpenAIEmbeddings } from '@langchain/openai'
import {Args, Command, Flags, } from '@oclif/core'
import fs from 'node:fs'

type DataObj = {
  description: string
  query: string
}


export default class Embed extends Command {
  static override args = {
    name: Args.string({description: 'name of the schema to use'}),
  }

  static override description = 'describe the command here'

  static override examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static override flags = {
    model: Flags.string({char: 'm', description: 'model to use in embedding. Currently only "cohere" and "openai" are supported'}),
  }

  getDataForSchema(name: string): DataObj[] {
    const data: DataObj[] = []
    
    // Load data from jsonl file in data directory
    const file = `data/${name}.jsonl`

    if (fs.existsSync(file)) {
      const lines = fs.readFileSync(file, 'utf8').split('\n')
      for (const line of lines) {
        if (line) {
          const obj: DataObj = JSON.parse(line)
          data.push(obj)
        }
      }
    }

    return data
  }

  async getEmbedding(model: EmbeddingsInterface, data: string): Promise<number[][]> {
    return model.embedDocuments([data])
  }

  getStore(model: EmbeddingsInterface, name: string): Chroma {
    return new Chroma(model, {
      collectionMetadata: {
        "hnsw:space": "cosine",
      },
      collectionName: name,
      url: "http://chroma:8000",
    })
  }


  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Embed)

    let model: EmbeddingsInterface;

    switch (flags.model) {
      case "openai": {
        model = new OpenAIEmbeddings({
          apiKey: process.env.OPENAI_KEY,
          model: "text-embedding-3-small",
        });
        break;
      }

      default: {
        model = new CohereEmbeddings({
          apiKey: process.env.COHERE_KEY,
          model: "embed-english-v3.0",
        });
        break;
      }
    }

    if (args.name === undefined) {
      this.error('Please provide a schema name')
    }

    // Get the data for the schema
    const data = this.getDataForSchema(args.name)
    const store = this.getStore(model, args.name)

    // Embed the data
    for (const [i, d] of data.entries()) {
      const embedding: number[][] = await this.getEmbedding(model, d.description)
      const doc: Document = {
        metadata: {
          description: d.description,
        },
        pageContent: d.query,
      }
      await store.addVectors(embedding,[doc])
      console.log(`Added document ${i+1}`)
    }
  }
}
