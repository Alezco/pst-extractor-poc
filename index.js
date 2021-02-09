const resolve = require('path').resolve;
const {PSTFile} = require('pst-extractor');
const {printPstTree} = require('./print-pst-tree');
const {printPstAppointments} = require('./print-pst-calendar');

const filePath = process.argv.length === 3
    ? process.argv[process.argv.length - 1]
    : './appointments.pst';

const pstFile = new PSTFile(resolve(filePath));
printPstTree(pstFile.getRootFolder());
/*const appointmentsPstFile = new PSTFile(resolve('./appointments.pst'));
printPstAppointments(appointmentsPstFile);*/
