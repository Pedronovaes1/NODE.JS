import { randomUUID } from "crypto"
import { validateHeaderValue } from "http"
import { sql } from "./sql.js"

export class DatabasePostgres {

    async list(search){
        let videos;
        if(search){
            videos = await sql`SELECT * FROM videos WHERE title ILIKE "%${search}%"`
        }else{
            videos = await sql`SELECT * FROM videos`
        }

        return videos
    }

    async create(video){
        const videoId = randomUUID()
        const {title, description, duration} = video

        await sql `
            INSERT INTO videos
            (id, title, description, duration)
            VALUES
            (${videoId}, ${title}, ${description}, ${duration})
        `
    }

    update(id, video){

    }

    delete(id){
        
    }
}