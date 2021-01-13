const resolve = require('path').resolve;
const {PSTFile} = require('pst-extractor');
const {printPstTree} = require('./print-pst-tree');

const pstFile = new PSTFile(resolve('./fichier_test.pst'));
console.log(pstFile.getMessageStore().displayName);
printPstTree(pstFile.getRootFolder());
//const rootFolder = pstFile.getRootFolder();
//const child = rootFolder.getSubFolders()[1].getNextChild()

//console.log(">>>>>>>>", child);
