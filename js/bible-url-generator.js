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
   * @access public
   */
  var generator = new Object();

  /**
   * Generate the URL based on the given request.  We can add support for multiple formats, but currently supports
   * the following format: {bible-version} {book} {first-chapter}.{first-verse}-{last-chapter}.{last-verse}
   *
   * @param  {String} request The requested passage
   * @return {String}         The URL to read the passage
   * @access public
   */
  generator.generate = function(request) {
    var url = 'http://google.com';

    return url;
  };

  /**
   * Return the generator object
   */
  return generator;
};
