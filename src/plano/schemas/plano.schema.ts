import * as mongoose from 'mongoose'

export const PlanoSchema = new mongoose.Schema({
    descricao: String,
    maxBlocos: Number,
    maxApartamentos: Number,
    maxEncomendas: Number,
    preco: Number,
    statusAtive: Boolean,
}, {
    timestamps: true,
    versionKey: false
})