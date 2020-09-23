const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const Concert = require('../../../models/concert.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {

    before(async () => {
        const testDepOne = new Concert({ _id: '5d9f1140f10a81216cfd4408', performer: 'Doe', genre: 'Rock', price: 25, day: 1, image: '/img/uploads/1fsd324fsdg.jpg'  });
        await testDepOne.save();
      
        const testDepTwo = new Concert({ _id: '5d9f1159f81ce8d1ef2bee48', performer: 'Parker', genre: 'R&B', price: 30, day: 2, image: '/img/uploads/2f342s4fsdg.jpg' });
        await testDepTwo.save();
    });

    it('/:performer should return one performer by name', async () => {
        const res = await request(server).get('/api/concerts/performer/Doe');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.length).to.not.be.null;
    });

    it('/:genre should return performers by genre', async () => {
        const res = await request(server).get('/api/concerts/genre/Rock');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.length).to.not.be.null;
    });

    it('/:price should return performers by price', async () => {
        const res = await request(server).get('/api/concerts/price/25/30');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.length).to.not.be.null;
    });

    it('/:day should return performer by day', async () => {
        const res = await request(server).get('/api/concerts/day/1');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.length).to.not.be.null;
    });

    after(async () => {
        await Concert.deleteMany();
    });


});