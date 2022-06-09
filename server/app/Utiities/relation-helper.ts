import {Knex} from "knex";
import CreateTableBuilder = Knex.CreateTableBuilder;

type Config = {
  references?: string
  key: string
  on: string
}

export function relationHelper(table: CreateTableBuilder, {references = 'id', key, on}: Config){
  table
    .foreign(key)
    .references(references)
    .inTable(on)
    .onUpdate('cascade')
    .onDelete('cascade')
}
