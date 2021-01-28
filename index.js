const resolve = require('path').resolve;
const {PSTFile} = require('pst-extractor');
const {printPstTree} = require('./print-pst-tree');
const {printPstAppointments} = require('./print-pst-calendar');

const pstFile = new PSTFile(resolve('./appointments.pst'));
printPstTree(pstFile.getRootFolder());

/*const appointmentsPstFile = new PSTFile(resolve('./appointments.pst'));
printPstAppointments(appointmentsPstFile);*/
