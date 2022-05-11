const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());

const { interface, bytecode } = require('../compile');

let accounts;
let inbox;
let INIT_STRING = 'Initial Message';

beforeEach(async () => {
    //Get a list of all accounts
    accounts = await web3.eth.getAccounts();

    //Use an account to deploy contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: [INIT_STRING] })
        .send({ from: accounts[0], gas: '1000000' });

});

describe('Inbox', () => {

    it('deploys a contract', () => {
        assert.ok(inbox.options.address);
    });

    it('has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, INIT_STRING);
    });

    it('can update message', async () => {
        const newMessage = 'New Message 123'

        await inbox.methods.setMessage(newMessage)
            .send({ from: accounts[0], gas: '1000000' });

        const message = await inbox.methods.message().call();

        assert.equal(message, newMessage);
    });

});
