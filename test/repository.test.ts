import { Repository } from 'typeorm';
import { mock } from 'jest-mock-extended';
import { Complaint } from '../src/entity/Complaint';
import { ComplaintRepository } from '../src/repositories/ComplaintRepository';
import { Category } from '../src/utils/Category';

jest.mock('typeorm', () => {
    const repositoryMock = mock<Repository<Complaint>>();
    repositoryMock.findOne.mockImplementation(async () => Promise.resolve({
        name: 'mockName',
        description: 'mockDescription',
        latitude: 10.0,
        longitude: 10.0,
        userId: 1,
        category: "Hole" as Category,
        picture: null,
        status: "open"
    } as Complaint));

    repositoryMock.find.mockImplementation(async () => {
        return [{
            "name": "Stronghold",
            "description": "suscipit nulla elit ac nulla sed vel enim sit amet nunc viverra dapibus nulla suscipit ligula in lacus",
            "latitude": 93.338,
            "longitude": 68.8749,
            "userId": 33,
            "category": "Hole",
            "picture": "http://dummyimage.com/221x100.png/5fa2dd/ffffff",
            "status": "wait"
            }, {
            "name": "Hatity",
            "description": "velit donec diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum",
            "latitude": 24.081,
            "longitude": 77.0881,
            "userId": 50,
            "category": "Hole",
            "picture": "http://dummyimage.com/102x100.png/cc0000/ffffff",
            "status": "wait"
        }] as Complaint[];
    });

    return {
        getRepository: () => repositoryMock,
        PrimaryGeneratedColumn: () => { null },
        Column: () => { null },
        Entity: () => { null },
        Unique: () => { null },
        CreateDateColumn: () => { null }
    }
});

describe("Get complaint by Id", () => {
    test("Should return complaint", async () => {
        const repository = new ComplaintRepository();
        const result = await repository.getById(1);
        expect(result).toStrictEqual({
            name: 'mockName',
            description: 'mockDescription',
            latitude: 10.0,
            longitude: 10.0,
            userId: 1,
            category: "Hole" as Category,
            picture: null,
            status: "open"
        });
    });
});

describe("Get wait complaints", () => {
    test("Should return complaints of type hole and with status waiting", async () => {
        const repository = new ComplaintRepository();
        const result = await repository.getWaitComplaints("Hole" as Category);
        expect(result).toBeTruthy();
    });
});