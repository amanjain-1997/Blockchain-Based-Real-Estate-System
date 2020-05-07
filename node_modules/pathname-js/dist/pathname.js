/** @extends Array */
class Pathname extends Array {

  static replace(parameter, value, string) {
    return value === null ? string : string.replace(new RegExp(':' + parameter, 'g'), value);
  }

  /**
   * Create a {@link Pathname} object.
   * @param {...(string|Array)} parts Same value as {@link Pathname#concat}'s parameters.
   */
  constructor(...parts) {
    super();

    /**
     * <code>true</code> if the pathname is absolute, <code>false</code> in the other case.
     * @type {boolan}
     */
    this.root = false;

    this.concat(...parts);
  }

  /**
   * The path parameter keys.
   * @readonly
   * @type {string[]}
   */
  get keys() {
    return Object.getOwnPropertyNames(this);
  }

  /**
   * A clone of the path.
   * @readonly
   * @type {Pathname}
   */
  get clone() {
    return new this.constructor(this);
  }

  /**
   * Path string value, without replacing parameters by values.
   * @readonly
   * @type {string}
   */
  get raw() {
    return (this.root ? '/' : '') + this.join('/');
  }

  /**
   * Path string value, with parameters replaced by values. When set, it can have new parameters.
   * @type {string}
   */
  get string() {
    var string = this.raw;
    var value;

    for(var parameter in this) {
      if(this.hasOwnProperty(parameter)) string = this.constructor.replace(parameter, this[parameter], string);
    }

    return string;
  }

  set string(v) {
    this.clear().concat(v);
  }

  /**
   * @returns {string} Value of {@link Patname#string}
   */
  toString() {
    return this.string;
  }

  /**
   * Match a pattern on the path.
   * @param {RegExp} pattern The pattern to match.
   * @returns {Array} The match result.
   */
  match(pattern) {
    return this.raw.match(pattern);
  }

  /**
   * Replace a pattern on the path.
   * @param {RegExp} pattern The pattern to replace.
   * @returns {Pathname} The replaced path.
   */
  replace(pattern, replace) {
    return new this.constructor(this.raw.replace(pattern, replace));
  }

  /**
   * Same as {@link Patname#concat}
   * @param {...(Pathname|Array|string)} parts The parts to add to the path.
   * @return {Pathname} Itself.
   */
  push(...parts) {
    return this.concat(...parts);
  }

  /**
   * Adds parts to the path.
   * @param {...(Pathname|Array|string)} parts The parts to add to the path.
   * @return {Pathname} Itself.
   */
  concat(...parts) {
    parts.forEach(part => {
      if(part instanceof Array) this.push(...part);
      else {
        part = part + '';
        if(this.length === 0 && part[0] === '/') this.root = true;
        part = part.replace(/^\/+/, '').replace(/\/+$/, '').split('/');

        if(part.length === 1) {
          part = part[0];
          if(part.length) super.push(part.replace(/\//));
        }
        else this.push(...part);
      }
    });

    return this;
  }

  /**
   * Empty the path.
   * @return {Pathname} Itself.
   */
  clear() {
    this.splice(0, this.length);
    return this;
  }

  /**
   * Set all the path parameters to null.
   * @return {Pathname} Itself.
   */
  reset() {
    for(var parameter in this) {
      if(this.hasOwnProperty(parameter)) this[parameter] = null;
    }
  }
}
