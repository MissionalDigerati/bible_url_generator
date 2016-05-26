/**
 * The Bible URL generator
 *
 * @access public
 */
var generator = new BibleUrlGenerator();

jQuery(document).ready(function($) {
  $('#submit-passage-form').submit(function(event) {
    event.stopPropagation();
    var request = $('#passage-input').val();
    if (request) {
      generator.generate(request).then(function(url) {
        if (url) {
          $('#url-value').html('').append($('<a/>').attr({href: url, target: '_blank'}).text(url));
        } else {
          $('#message-holder').html('').append($('<div/>').addClass('alert alert-danger').text('Sorry, unable to generate the URL.'));
        }
      }, function() {
        $('#message-holder').html('').append($('<div/>').addClass('alert alert-danger').text('Sorry, unable to generate the URL.'));
      });
    } else {
      $('#message-holder').html('').append($('<div/>').addClass('alert alert-danger').text('Please enter a valid URL.'));
    }
    return false;
  });
});
