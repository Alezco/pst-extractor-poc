const {PSTFile} = require("pst-extractor/dist/PSTFile.class");
const {PSTAppointment} = require("pst-extractor");

const printPstAppointments = (pstFile) => {
    let childFolders = pstFile.getRootFolder().getSubFolders()
    folder = childFolders[0] // Root - Mailbox
    childFolders = folder.getSubFolders()
    console.log("==========", childFolders.length)
    console.log("==========", childFolders[0].displayName)
    console.log("==========", childFolders[1].displayName)
    console.log("==========", childFolders[2].displayName)
    folder = childFolders[4] // IPM_SUBTREE
    childFolders = folder.getSubFolders()
    folder = childFolders[11] // Calendar
    const appointment = folder.getNextChild()
    console.log(">>>>>>>", appointment.startTime)
}

exports.printPstAppointments = printPstAppointments
