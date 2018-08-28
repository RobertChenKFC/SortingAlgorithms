/* exported Sorter */
/**
 * An abstract class to provide an interface for
 * sorting algorithms and visualizations
 */
class Sorter {
  /**
   * Provides error when creating abstract class "Sorter"
   * @constructor
   */
  constructor() {
    if (new.target === Sorter) {
      throw new TypeError('Cannot construct abstract class \"Sorter\"');
    }

    /* virtual methods */
    if (this.draw === undefined) {
      throw new TypeError('Must override virtual method \"draw\"');
    }
    if (this.sort === undefined) {
      throw new TypeError('Must override virtual method \"sort\"');
    }
  }
}
