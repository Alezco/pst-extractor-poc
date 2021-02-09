const fs = require("fs")

let depth = -1;
let col = 0;

const printPstTree = (folder) => {
    depth++;

    // the root folder doesn't have a display name
    if (depth > 0) {
        console.log(getDepth(depth) + folder.displayName);
    }

    // go through the folders...
    if (folder.hasSubfolders) {
        let childFolders = folder.getSubFolders();
        for (let childFolder of childFolders) {
            printPstTree(childFolder);
        }
    }

    // and now the emails for this folder
    if (folder.contentCount > 0) {
        depth++;
        let email = folder.getNextChild();
        while (email != null) {
            printData(email);
            email = folder.getNextChild();
        }
        depth--;
    }
    depth--;
}

const printData = email => {
    //getEmailTree(email)
};

const getMetadata = email => {
    console.log(email.subject, email.clientSubmitTime, email.messageSize)
}

const getSenderReceiver = email => {
    console.log(email.senderName, "(", email.senderEmailAddress,')', "==>", email.receivedByName, "(", email.receivedByAddress,")")
}

const getEmailTree = email => {
    console.log(getDepth(depth) +
        'Sender: ' + email.senderName +
        ', Subject: ' + email.subject);
}

const getBody = email => {
    console.log(email.body)
}

let attachmentIndex = 0;

const getAttachments = email => {
    if (email.hasAttachments) {
        const numberOfAttachments = email.numberOfAttachments;
        [...Array(numberOfAttachments).keys()].map((index) => {
            const currentAttachment = email.getAttachment(index)
            if (!currentAttachment.longFilename) {
                console.log(currentAttachment.embeddedPSTMessage)
            }
            try {
                const fd = fs.openSync(
                    "./outputs/attachments/" + (currentAttachment.longFilename.trim() || attachmentIndex++), 'w'
                )
                const attachmentStream = currentAttachment.fileInputStream
                if (attachmentStream) {
                    const bufferSize = 8176
                    const buffer = Buffer.alloc(bufferSize)
                    let bytesRead
                    do {
                        bytesRead = attachmentStream.read(buffer)
                        fs.writeSync(fd, buffer, 0, bytesRead)
                    } while (bytesRead === bufferSize)
                    fs.closeSync(fd)
                }
            } catch (err) {
                console.error(err)
            }
        });
    }
}

const getDepth = (depth) => {
    let sdepth = '';
    if (col > 0) {
        col = 0;
        sdepth += '\n';
    }
    for (let x = 0; x < depth - 1; x++) {
        sdepth += ' | ';
    }
    sdepth += ' |- ';
    return sdepth;
}

exports.printPstTree = printPstTree
