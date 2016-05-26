/**
 * Generates Bible URLS based on a given string.
 * @requires JQuery Library
 *
 * @access public
 */
function BibleUrlGenerator() {
  /**
   * The generator Object
   *
   * @param {Object}
   * @access public
   */
  var generator = new Object();

  /**
   * The Regex to capture the request data
   *
   * @param  {[RegEx}
   * @access public
   */
  var requestRegEx = /(\w*)\s+(\w*)\s+(\d*)\.+(\d*)\-*(\d*)/i;

  /**
   * Generate the URL based on the given request.  We can add support for multiple formats, but currently supports
   * the following format: {bible-version} {book} {chapter}.{first-verse}-{last-verse}
   *
   * @param  {String} request The requested passage
   * @return {String}         The URL to read the passage
   * @access public
   */
  generator.generate = function(request) {
    var deferred = $.Deferred();
    var matches = request.match(requestRegEx);
    if (matches) {
      var version = matches[1].toLowerCase();
      var book = matches[2].toLowerCase();
      var chapter = matches[3].toLowerCase();
      var firstVerse = matches[4].toLowerCase();
      var lastVerse = matches[5].toLowerCase();
      /**
       * Get the correct JSON file
       */
      $.ajax({
        url: '/data/'+ version + '.json'
      })
      .done(function(data) {
        if (data) {
          /**
           * We have the JSON data
           */
          var bookCode = getBookCode(book, data.book.lookup);
          if (data.chapter.padded) {
            chapter = pad(chapter, 2);
          }
          if (data.verse.padded) {
            firstVerse = pad(firstVerse, 2);
            if (lastVerse !== '') {
              lastVerse = pad(lastVerse, 2);
            }
          }
          /**
           * Construct the URL
           */
          if (lastVerse === '') {
            /**
             * Remove the last verse
             */
            /**
             * The 13 is the number of characters in {first-verse} to grab directly after it and remove it.
             */
            var index = data.baseUrl.indexOf('{first-verse}') + 13;
            var url = data.baseUrl.substring(0, index);
          } else {
            var url = data.baseUrl;
          }
          url = url.replace('{book-code}', bookCode);
          url = url.replace('{chapter}', chapter);
          url = url.replace('{first-verse}', firstVerse);
          if (lastVerse !== '') {
            url = url.replace('{last-verse}', lastVerse);
          }
          deferred.resolve(url);
        } else {
          deferred.reject(null);
        }
      })
      .fail(function() {
        deferred.reject(null);
      });

    } else {
      deferred.reject(null);
    }
    return deferred.promise();
  };

  /**
   * Private Methods
   */

  /**
   * Find the book code using the lookup array
   *
   * @param  {String} book    The book to lookup
   * @param  {Array}  lookups An array of JSON objects containing lookup data
   * @return {String}         The code to use in the URL
   *
   * @access private
   */
  function getBookCode(book, lookups) {
    var bookCode = '';
    for (var i = 0; i < lookups.length; i++) {
      if ($.inArray(book, lookups[i].possibilities) !== -1) {
        bookCode = lookups[i].code;
        break;
      }
    }
    return bookCode;
  };

  /**
   * Pad a number in a string with z
   *
   * @param  {String} n     The number to pad
   * @param  {Number} width Width of the number
   * @param  {String} z     What to pad with
   * @return {String}       The padded number
   *
   * @link http://stackoverflow.com/a/10073788
   * @access private
   */
  function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  };

  /**
   * Return the generator object
   */
  return generator;
};
