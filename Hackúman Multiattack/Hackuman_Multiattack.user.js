// ==UserScript==
// @name         Hackúman Multiattack
// @namespace    http://hackforums.net
// @version      0.1
// @description  Allows multiple attacks through one click
// @author       Bossk
// @match        https://hackforums.net/hackuman.php?action=battle*
// @match        http://hackforums.net/hackuman.php?action=battle*
// @grant        GM_addStyle
// @require https://code.jquery.com/jquery-3.3.1.min.js
// @require https://code.jquery.com/ui/1.12.1/jquery-ui.js
// @require https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.js
// ==/UserScript==

var isSelecting = false;
var attackerID = null;
var targetID = null;
var numberOfAttacks = null;
var attackDelay = null;

function performAttack(attackerID, targetID) {
    let data = {
					action: "do_attack_mon",
					hid: targetID,
					hidattacker: attackerID,
					my_post_key: my_post_key
				}

				$.ajax({
					type: "POST",
					url: "hackuman.php?ajax=1",
					data: data,
					dataType: "json",
					error: function() {
						$.jGrowl('Unknown Error', { theme: 'jgrowl_error' });
					},
					complete: function() {
						$(".hum-mon-container-" + targetID).stop().css("background-color", "#ff333336").animate({ backgroundColor: "#333"}, 500);
					}
				});
};

$(".pro-adv-3d-button").click(function() { //Detect "Attack"-button click
    var selectedTargetID = $(this).attr('id').replace(/\D/g,'');
    targetID = selectedTargetID; //Assign targetID to global variable
    $("#attack_box_" + targetID).children().first().css("max-height", "");
    $("#attack_box_" + targetID).children().first().append('<fieldset><legend>Multi-attack settings (Made by <a href="https://hackforums.net/member.php?action=profile&uid=3364775">Bossk</a>)</legend><label for="numAttacksInput">Number of attacks: </label><input type="number" id="numAttacksInput" class="textbox hum-mon-namechange-input" value="1" style="width: 106px;max-width: 106px;min-width: 106px;flex: 1 0 20px;"><br><br><label for="delayInput">Delay between attacks (ms): </label><input type="number" id="delayInput" class="textbox hum-mon-namechange-input" value="500" style="width: 106px;max-width: 106px;min-width: 106px;flex: 1 0 20px;"><br><br><label for="selectAttacker">Attacker: </label><button class="button game-button-smallhacks" title="" id="selectAttacker">Not selected</button><br><hr><a href="javascript:void(0)" id="launchAttackBtn" class="button rate_user_button" style="background-color: #a74646; padding: 7px 25px; margin-left: 30%; margin-right: 30%; transition: background-color 0.2s;"><span>Launch attack</span></a></fieldset>'); //Summons UI
});

$(document).on("click", "#selectAttacker", function() {
    if($(this).text() !== "Not selected") {
        isSelecting = false;
        $(this).text("Not selected");
        $('.hum-attack-modal-choice').each(function() {
            $(this).attr('onclick', $(this).attr('onclick').replace('//', '')); //Enable default onclick attribute
        });
    } else {
        isSelecting = true;
        $(this).text("NOW SELECTING");
        $('.hum-attack-modal-choice').each(function() {
            $(this).attr('onclick', '//' + $(this).attr('onclick')); //Disable default onclick attribute
        });
    };
});

$(document).on("click", ".hum-attack-modal-choice", function() {
    if(isSelecting == true) {
        let selectedAttackerName = $(this).find(".hum-mon-name").text();
        attackerID = $(this).attr('onclick').split(',')[1].trim(); //Get ID of attacker
        //attackerID = $(this).attr('onclick').substring($(this).attr('onclick').lastIndexOf(", ") + 1, $(this).attr('onclick').lastIndexOf(")")); <--- Good(???) alternative(???)
        $("#selectAttacker").text(selectedAttackerName);
    }
});

$(document).on("click", "#launchAttackBtn", function() {
    numberOfAttacks = $("#numAttacksInput").val();
    attackDelay = $("#delayInput").val();
    (function attackLoop (i) {
        setTimeout(function () {
            performAttack(attackerID, targetID);
            if (--i) attackLoop(i);
        }, attackDelay)
    })(numberOfAttacks);

});

GM_addStyle ( `
    #launchAttackBtn:hover {
        background-color: #822727 !important;
    }
` );