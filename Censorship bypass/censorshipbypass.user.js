// ==UserScript==
// @name         HF Censorship Bypass
// @namespace    http://hackforums.net
// @version      1337
// @description  A free speech movement
// @author       Bossk
// @match        https://hackforums.net/*
// @match        http://hackforums.net/*
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==

var messageArea;

if ($("#content").find(".sceditor-container.ltr.sourceMode textarea").length) {
    messageArea = $("#content").find(".sceditor-container.ltr.sourceMode textarea");
} else {
    messageArea = $("#message");
}

function AntiCensor() {
    let possiblyCensoredMessage = messageArea.val();
    let certainlyNotCensoredMessage = possiblyCensoredMessage.replace(/(f)(uck)/ig, "[size=medium]$1[/size]$2");
    messageArea.val(certainlyNotCensoredMessage);
}

messageArea.on('keyup paste', AntiCensor);

//  _____ _   _  ____ _  __  _____ _   _ _____   _____ ___ _   _____ _____ ____
// |  ___| | | |/ ___| |/ / |_   _| | | | ____| |  ___|_ _| | |_   _| ____|  _ \
// | |_  | | | | |   | ' /    | | | |_| |  _|   | |_   | || |   | | |  _| | |_) |
// |  _| | |_| | |___| . \    | | |  _  | |___  |  _|  | || |___| | | |___|  _ <
// |_|    \___/ \____|_|\_\   |_| |_| |_|_____| |_|   |___|_____|_| |_____|_| \_\
//