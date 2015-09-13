/**
 * @fileoverview Validation functions used to validate forms. This depends on jQuery.
 */

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
