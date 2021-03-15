import { createConnection, getConnection } from "typeorm";
import { ComplaintSeed } from '../db/seeds/ComplaintSeed';
import { Complaint } from './entity/Complaint';


export async function  initializeDB(): Promise<void> {
    await createConnection().then(connection => {
        const complaintSeed = new ComplaintSeed();
        const seed = complaintSeed.seedDatabase();
        connection.transaction(async transactionalEntityManager => {
            const size = await transactionalEntityManager.count(Complaint);
            if (size == 0) {
                console.log(">>>>>> POPULATE DB");
                await transactionalEntityManager.save(seed);
            }
        })
    });
}