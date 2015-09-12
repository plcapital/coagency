/**
 * @fileoverview Validation functions used to validate forms. This depends on jQuery.
 */

/**
 * Validates the registration form.
 */
function validateRegistration() {
    var messages = '';
    if ($('#password').val() != $('#passwordConfirm').val()) {
        messages += 'Passwords do not match.\n';
    }
    if ($('#email').val() != $('#emailConfirm').val()) {
        messages += 'Emails do not match.\n';
    }

    if (messages) {
        alert(messages);
        return false;
    }

    return true;
}