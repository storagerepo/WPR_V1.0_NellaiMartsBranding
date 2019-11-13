
(function ($) {
    'use strict';
  
    /* Contact Form */
    $("#contactForm").validator().on("submit", function(event) {
    	if (event.isDefaultPrevented()) {
            // handle the invalid form...
            cformError();
            csubmitMSG(false);
        } else {
            // everything looks good!
            csubmitMSG(true,"Submitting...");
            event.preventDefault();
            csubmitForm();
        }
    });
    function csubmitForm() {
        // initiate variables with form content
		var name = $("#cname").val();
        var email = $("#cemail").val();
        var phonenumber = $("#cphonenumber").val();
        var message = $("#cmessage").val();
        var terms = $("#csubject").val();
        $.ajax({
            type: "POST",
            url: "php/contactform-process.php",
            data: "name=" + name + "&email=" + email + "&phonenumber=" + phonenumber + "&message=" + message + "&terms=" + terms, 
            success: function(text) {
                if (text == "Message has been sent") {
                    cformSuccess();
                } else {
                    cformError();
                    csubmitMSG(false, text);
                }
            }
        });
	}

    function cformSuccess() {
        $("#contactForm")[0].reset();
        csubmitMSG(true, "Message has been sent!");
        $("input").removeClass('notEmpty'); // resets the field label after submission
        $("textarea").removeClass('notEmpty'); // resets the field label after submission
    }

    function cformError() {
        $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(this).removeClass();
        });
	}

    function csubmitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center tada animated";
        } else {
            var msgClasses = "h3 text-center";
        }
        $("#cmsgSubmit").removeClass().addClass(msgClasses).text(msg);
    }
  
  
  })(jQuery);