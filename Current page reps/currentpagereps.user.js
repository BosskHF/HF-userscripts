// ==UserScript==
// @name         CurrentPageReps
// @namespace    http://hackforums.net
// @version      0.1
// @description  Shows reputation on each page or something
// @author       Bossk
// @match        http://hackforums.net/reputation.php?uid=*
// @match        https://hackforums.net/reputation.php?uid=*
// @require https://code.jquery.com/jquery-3.3.1.min.js
// @require https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.js
// ==/UserScript==

var pageReputation = '';

$('table > tbody > tr > .trow_reputation_positive, .trow_reputation_neutral, .trow_reputation_negative').each(function() {
var rowText = $(this).text()
var parsedText = rowText.substring(
    rowText.lastIndexOf("(") + 1,
    rowText.lastIndexOf("):")
);
    pageReputation = pageReputation.concat("+" + parsedText).replace("++","+");
});

$(".repbox").text($(".repbox").text() + " | " + eval(pageReputation));