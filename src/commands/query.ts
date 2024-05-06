import { CohereEmbeddings } from '@langchain/cohere'
import { Chroma } from '@langchain/community/vectorstores/chroma'
import { Document } from '@langchain/core/documents'
import { EmbeddingsInterface } from "@langchain/core/embeddings"
import { OpenAIEmbeddings } from '@langchain/openai'
import {Args, Command, Flags, } from '@oclif/core'

export default class Query extends Command {
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
    const {args, flags} = await this.parse(Query)

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
    const store = this.getStore(model, args.name)

    const query = `How do I get all the DMARC records for a domain?`

    const embedding: number[][] = await this.getEmbedding(model, query)

    const result = await store.similaritySearchVectorWithScore(embedding[0], 3)

    console.log(result)
  }
}
