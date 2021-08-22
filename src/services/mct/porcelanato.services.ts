import db from '../../config/database'
import { Porcelanato } from '../../models/mct/porcelanato.model'

class PorcelanatoServices {

    async listPorcelanatos(): Promise<any[]> {
        try { 
            const conn = await db.getConnection()
            let [data]: any = await conn.query('SELECT * FROM MCT_PORCELANATO')

            if(data[0] != undefined)
                return data
            else
                return null

        } catch(error) {
            console.log(error)
            return null
        }
    }

    async getPorcelanato(porcelanato_id: number): Promise<Porcelanato>{
        try { 
            const conn = await db.getConnection()
            let [data]: any = await conn.query('SELECT * FROM MCT_PORCELANATO WHERE porcelanato_id = ?', [porcelanato_id])

            if(data[0] != undefined)
                return data[0]
            else
                return null

        } catch(error) {
            console.log(error)
            return null
        }
    }

    async createPorcelanato(porcelanato: Porcelanato): Promise<boolean> {
        try {
            const conn = await db.getConnection()
            const sql = 'INSERT INTO MCT_PORCELANATO (porcelanato_nome, porcelanato_descricao, porcelanato_valor, porcelanato_imagem) VALUES (?, ?, ?, BINARY(?))'
            const values = [porcelanato.porcelanato_nome, porcelanato.porcelanato_descricao, porcelanato.porcelanato_valor, porcelanato.porcelanato_imagem]

            let data = await conn.query(sql, values)

            if(data != null)
                return true
            else
                return false
        } catch(error) {
            console.log(error)
            return false
        }
    }

    async updatePorcelanato(porcelanato: Porcelanato, porcelanato_id: number): Promise<boolean> {
        try {
            const conn = await db.getConnection()
            const sql = 'UPDATE MCT_PORCELANATO SET porcelanato_nome = ?, porcelanato_descricao = ?, porcelanato_valor = ?, porcelanato_imagem = ? WHERE porcelanato_id = ?'
            const values = [porcelanato.porcelanato_nome, porcelanato.porcelanato_descricao, porcelanato.porcelanato_valor, porcelanato.porcelanato_imagem, porcelanato_id]

            let data = await conn.query(sql, values)

            if(data != null)
                return true
            else
                return false
        } catch(error) {
            console.log(error)
            return false
        }
    }
}

export default new PorcelanatoServices()