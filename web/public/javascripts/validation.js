/**
 * @fileoverview Validation functions used to validate forms. This depends on jQuery.
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

function validateGroupCreation() {
    var messages = '';
    if (!($('#name').val())) {
        messages += 'Name cannot be empty.\n';
    }
    if (!($('#description').val())) {
        messages += 'Description cannot be empty.\n';
    }

    if (messages) {
        alert(messages);
        return false;
    }

    return true;
}
