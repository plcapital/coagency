/**
 * @fileoverview Validation for user registration. This depends on jQuery and jQuery Validation (plugin).
 */

$(document).ready(function() {
    $("#register").validate({
        errorLabelContainer: $(".error ul"),
        wrapper: "li",
        rules: {
            username: "required",
            password: "required",
            password_confirm: {
                equalTo: "#password"
            },
            email: {
                required: true,
                email: true
            },
            email_confirm: {
                equalTo: "#email"
            }
        },
        messages: {
            username: "An username is required.",
            password: "A password is required.",
            password_confirm: {
                equalTo: "Please check the passwords, they do not match."
            },
            email: {
                required: "An email address is required.",
                email: "Please check the email address format."
            },
            email_confirm: {
                equalTo: "Please check the email addresses, they do not match."
            }
        }
    });
});