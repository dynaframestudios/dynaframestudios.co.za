/**
 * @fileoverview Project Titan - Foundation Utilities: Core Helpers Layer
 * Production-ready standard logical, mathematical, asynchronous, and structural helpers.
 * @module utils/helpers
 * @author Senior JavaScript Architect
 * @license Proprietary / Dynaframe Studios
 */

'use strict';

/**
 * Creates a debounced function that delays invoking the callback until after
 * wait milliseconds have elapsed since the last time the debounced function was invoked.
 * @param {Function} callback - The function to debounce.
 * @param {number} wait - The timeout in milliseconds.
 * @param {boolean} [immediate=false] - If true, trigger the function on the leading edge instead of the trailing.
 * @returns {Function} The new debounced function wrapper.
 */
export function debounce(callback, wait, immediate = false) {
  /** @type {number|null} */
  let timeout = null;

  return function(...args) {
    const context = this;
    
    const later = () => {
      timeout = null;
      if (!immediate) callback.apply(context, args);
    };

    const callNow = immediate && !timeout;
    
    if (timeout !== null) {
      window.clearTimeout(timeout);
    }
    
    timeout = window.setTimeout(later, wait);
    
    if (callNow) {
      callback.apply(context, args);
    }
  };
}

/**
 * Creates a throttled function that only invokes the callback at most once per 
 * every limit milliseconds.
 * @param {Function} callback - The function to throttle.
 * @param {number} limit - The structural limit threshold window in milliseconds.
 * @returns {Function} The new throttled function wrapper.
 */
export function throttle(callback, limit) {
  /** @type {number|null} */
  let lastRan = null;
  /** @type {number|null} */
  let lastFunc = null;

  return function(...args) {
    const context = this;
    const now = Date.now();

    if (lastRan === null || (now - lastRan >= limit)) {
      callback.apply(context, args);
      lastRan = now;
    } else {
      if (lastFunc !== null) {
        window.clearTimeout(lastFunc);
      }
      lastFunc = window.setTimeout(() => {
        if ((Date.now() - (lastRan || 0)) >= limit) {
          callback.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (now - lastRan));
    }
  };
}

/**
 * Performs deep cloning on standard JSON objects, Arrays, Dates, and structural primitives.
 * Avoids prototype pollution vectors and maintains reference decoupling.
 * @param {*} value - Target object structure to replicate.
 * @returns {*} Fully decoupled replica clone of the source.
 */
export function deepClone(value) {
  if (value === null || typeof value !== 'object') {
    return value;
  }

  if (value instanceof Date) {
    return new Date(value.getTime());
  }

  if (value instanceof RegExp) {
    return new RegExp(value.source, value.flags);
  }

  if (Array.isArray(value)) {
    return value.map(item => deepClone(item));
  }

  const clonedObj = Object.create(Object.getPrototypeOf(value));
  for (const key of Object.keys(value)) {
    clonedObj[key] = deepClone(value[key]);
  }

  return clonedObj;
}

/**
 * Merges properties of a source object deeply into a destination object structural plane.
 * Modifies target object recursively without altering structural source prototypes.
 * @param {Object} target - Target receiver object context.
 * @param {Object} source - Object containing data variants to override.
 * @returns {Object} Heavily populated modified target framework context.
 */
export function deepMerge(target, source) {
  if (!isObject(target) || !isObject(source)) {
    return source;
  }

  Object.keys(source).forEach(key => {
    const targetValue = target[key];
    const sourceValue = source[key];

    if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
      target[key] = targetValue.concat(sourceValue).map(item => deepClone(item));
    } else if (isObject(targetValue) && isObject(sourceValue)) {
      target[key] = deepMerge({ ...targetValue }, sourceValue);
    } else {
      target[key] = deepClone(sourceValue);
    }
  });

  return target;
}

/**
 * Generates RFC4122 version 4 compliant universally unique identifiers (UUIDv4) securely.
 * @returns {string} Fully structured, valid 36-character hyphenated UUIDv4 string.
 */
export function uuid() {
  const cryptoObj = window.crypto;
  if (cryptoObj && cryptoObj.randomUUID) {
    return cryptoObj.randomUUID();
  }

  // Fallback structural generation using cryptographically strong pseudo-random numbers
  const buf = new Uint32Array(4);
  cryptoObj ? cryptoObj.getRandomValues(buf) : (buf[0] = Math.random() * 0xFFFFFFFF);
  
  /** @type {string[]} */
  const parts = [];
  let idx = 0;
  
  for (let i = 0; i < 16; i++) {
    if (i === 4 || i === 6 || i === 8 || i === 10) parts.push('-');
    
    let r;
    if (idx < 4) {
      r = (buf[idx] >> ((i % 4) * 8)) & 0xFF;
      if ((i % 4) === 3) idx++;
    } else {
      r = Math.random() * 16;
    }

    if (i === 6) {
      parts.push(((r & 0x0F) | 0x40).toString(16));
    } else if (i === 8) {
      parts.push(((r & 0x3F) | 0x80).toString(16).padStart(2, '0'));
    } else {
      parts.push(r.toString(16).padStart(2, '0'));
    }
  }
  
  return parts.join('').substring(0, 36);
}

/**
 * Generates an incremental local runtime identity string unique within the active runtime context.
 * Useful for fast DOM mapping keys, IDs, and matching elements safely.
 * @param {string} [prefix='id_'] - Optional custom naming category layer.
 * @returns {string} Distinct text token.
 */
let idCounter = 0;
export function uniqueId(prefix = 'id_') {
  idCounter += 1;
  return `${prefix}${idCounter}_${Date.now()}`;
}

/**
 * Returns a pseudo-random integer between minimum and maximum bounds inclusive.
 * @param {number} min - Lower numeric integer boundary limit.
 * @param {number} max - Upper numeric integer boundary limit.
 * @returns {number} Evaluated uniform value.
 */
export function randomInt(min, max) {
  const minimum = Math.ceil(min);
  const maximum = Math.floor(max);
  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}

/**
 * Returns a pseudo-random float between specified minimum and maximum bounds.
 * @param {number} min - Lower bounding real number baseline.
 * @param {number} max - Upper bounding real number baseline.
 * @returns {number} Evaluated precise decimal value.
 */
export function randomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Restricts a given numeric input value cleanly inside minimum and maximum coordinate limits.
 * @param {number} value - Input number parameter targeted.
 * @param {number} min - Floor scaling constraint value.
 * @param {number} max - Ceiling scaling constraint value.
 * @returns {number} Normalized value constraint matching boundaries.
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Performs linear interpolation calculation across specific mathematical planes.
 * @param {number} start - Beginning point baseline.
 * @param {number} end - Endpoint tracking configuration baseline.
 * @param {number} amt - Linear balancing factor matching percentage rules from 0 up to 1.
 * @returns {number} Linear transition scalar evaluation outcome.
 */
export function lerp(start, end, amt) {
  return (1 - amt) * start + amt * end;
}

/**
 * Computes direct proportional calculation value out of standard parts maps.
 * Returns absolute percentage scales securely from 0 up to 100.
 * @param {number} value - Part matching metrics factor value.
 * @param {number} total - Whole target volume comparison point.
 * @returns {number} Proportional percentage metric calculation.
 */
export function percentage(value, total) {
  if (total === 0) return 0;
  return (value / total) * 100;
}

/**
 * Calculates mathematical average numbers smoothly across raw numeric arrays.
 * @param {number[]} numbers - Series data array values.
 * @returns {number} Aggregated midpoint average values.
 */
export function average(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) return 0;
  return sum(numbers) / numbers.length;
}

/**
 * Aggregates mathematical summation variables across complex real target arrays.
 * @param {number[]} numbers - Series tracking records arrays.
 * @returns {number} Aggregated absolute computation sum outcome.
 */
export function sum(numbers) {
  if (!Array.isArray(numbers)) return 0;
  return numbers.reduce((acc, curr) => acc + (Number(curr) || 0), 0);
}

/**
 * Categorizes and groups elements of an array according to a given key selector string or transformer.
 * @param {Array} collection - Target collection array stream to parse.
 * @param {string|Function} iteratee - Field mapping index parameter identity or conversion function.
 * @returns {Object.<string, Array>} Highly segmented data mapping dictionary matrix.
 */
export function groupBy(collection, iteratee) {
  if (!Array.isArray(collection)) return {};
  
  const getGroupKey = typeof iteratee === 'function' 
    ? iteratee 
    : (/** @type {*} */ item) => item?.[iteratee];

  return collection.reduce((storage, item) => {
    const key = String(getGroupKey(item));
    if (!Object.hasOwn(storage, key)) {
      storage[key] = [];
    }
    storage[key].push(item);
    return storage;
  }, {});
}

/**
 * Splits an array collection structure cleanly into smaller processing segments or batches.
 * @param {Array} array - Target processing source pipeline structural data plane.
 * @param {number} size - Structural batch grouping size limitation configuration values.
 * @returns {Array[]} Highly segmented sequence tracking map.
 */
export function chunk(array, size) {
  if (!Array.isArray(array) || size <= 0) return [];
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

/**
 * Flattens recursive nested array structures down into single execution planes safely.
 * @param {Array} array - Target nested matrix structure framework arrays.
 * @returns {Array} Linear plain array target pipeline structure.
 */
export function flatten(array) {
  if (!Array.isArray(array)) return [];
  return array.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatten(val) : val), []);
}

/**
 * Extracts unique scalar values safely by stripping duplication signatures using native structural engines.
 * @param {Array} array - Processing data pipeline collection targets.
 * @returns {Array} Distinct dataset records.
 */
export function unique(array) {
  if (!Array.isArray(array)) return [];
  return Array.from(new Set(array));
}

/**
 * Identical signature helper referencing core deduplication routines cleanly.
 * @param {Array} array - Processing structural arrays targets.
 * @returns {Array} Unified record sets tracking values.
 */
export function removeDuplicates(array) {
  return unique(array);
}

/**
 * Sanitizes input text, strings or variables cleanly into absolute parsing float numbers safely.
 * Automatically avoids NaN mutations by establishing rigid backup fallback numbers.
 * @param {*} value - The input target context parameter variable.
 * @param {number} [fallback=0] - Explicit replacement configuration value.
 * @returns {number} Standardized numerical real value outcome.
 */
export function safeNumber(value, fallback = 0) {
  const parsed = Number.parseFloat(value);
  return Number.isNaN(parsed) || !Number.isFinite(parsed) ? fallback : parsed;
}

/**
 * Safely parses structural string contents into native JSON graphs without throwing execution failures.
 * @param {string} jsonString - Text stream candidate payload targeted.
 * @param {*} [fallback=null] - Default recovery context mapping logic structural states.
 * @returns {*} Evaluated structural objects mappings, parameters or error recovery defaults.
 */
export function safeParseJSON(jsonString, fallback = null) {
  if (typeof jsonString !== 'string') return fallback;
  try {
    return JSON.parse(jsonString);
  } catch {
    return fallback;
  }
}

/**
 * Evaluates structural conditions to see if arrays, strings, datasets or structures map as empty.
 * @param {*} value - Structural execution variable target candidate context.
 * @returns {boolean} True if empty.
 */
export function isEmpty(value) {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string' || Array.isArray(value)) return value.length === 0;
  if (value instanceof Map || value instanceof Set) return value.size === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}

/**
 * Verifies if an input variable tracks specifically as a standard plain JavaScript object.
 * Excludes arrays, dates, and null allocations natively.
 * @param {*} value - Operational testing variable parameters.
 * @returns {boolean} True if structural candidate perfectly matches criteria.
 */
export function isObject(value) {
  return value !== null && typeof value === 'object' && Object.prototype.toString.call(value) === '[object Object]';
}

/**
 * Checks if a target value is structured as an array instance.
 * @param {*} value - Testing tracking target.
 * @returns {boolean} Outcome analysis flag results.
 */
export function isArray(value) {
  return Array.isArray(value);
}

/**
 * Validates if an input component maps cleanly down executable functional logic loops.
 * @param {*} value - Executable tracking reference target points.
 * @returns {boolean} Evaluation result flags matching requirements.
 */
export function isFunction(value) {
  return typeof value === 'function';
}

/**
 * Halts execution thread loop workflows cleanly using native asynchronous promises handles.
 * @param {number} ms - Intermission timeframe limit marker values track in milliseconds.
 * @returns {Promise<void>} Resolving lifecycle automation block.
 */
export function sleep(ms) {
  return new Promise(resolve => window.setTimeout(resolve, ms));
}

/**
 * Blocks execution pipelines asynchronously until specific condition checks evaluate into valid states.
 * @param {function(): boolean} predicate - State tracking verification checks callback logic.
 * @param {number} [timeout=10000] - Hard system timeout limit values tracked in milliseconds.
 * @param {number} [interval=50] - Periodic interrogation tracking step window timing.
 * @returns {Promise<boolean>} True upon validation match success, rejects if limit triggers first.
 */
export function waitUntil(predicate, timeout = 10000, interval = 50) {
  const startTime = Date.now();
  
  return new Promise((resolve, reject) => {
    function check() {
      if (predicate()) {
        return resolve(true);
      }
      if (Date.now() - startTime >= timeout) {
        return reject(new Error('Timeout limit reached while waiting on structural predicate validations.'));
      }
      window.setTimeout(check, interval);
    }
    check();
  });
}

/**
 * Extracts URL search string parameters safely converting inputs into dictionary maps.
 * Handles duplicate array parameters naturally.
 * @param {string} [url] - Optional query scope location string. Default references window location search parameters.
 * @returns {Object.<string, string|string[]>} Mapped query values graph index parameters.
 */
export function getUrlParams(url) {
  const searchString = url 
    ? url.substring(url.indexOf('?')) 
    : window.location.search;
    
  const params = new URLSearchParams(searchString);
  /** @type {Object.<string, string|string[]>} */
  const result = {};

  for (const [key, value] of params.entries()) {
    if (Object.hasOwn(result, key)) {
      if (!Array.isArray(result[key])) {
        result[key] = [/** @type {string} */ (result[key])];
      }
      (/** @type {string[]} */ (result[key])).push(value);
    } else {
      result[key] = value;
    }
  }
  return result;
}

/**
 * Encodes structural dictionary objects data parameters cleanly into valid safe url parameter query strings.
 * @param {Object.<string, *>} obj - Target attribute properties records dictionary map.
 * @returns {string} Fully encoded URL parameter search string fragment.
 */
export function buildQueryString(obj) {
  if (!obj || typeof obj !== 'object') return '';
  const params = new URLSearchParams();

  Object.entries(obj).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      if (Array.isArray(value)) {
        value.forEach(item => params.append(key, String(item)));
      } else {
        params.set(key, String(value));
      }
    }
  });

  const queryString = params.toString();
  return queryString ? `?${queryString}` : '';
}

/**
 * Writing target text parameters into physical client clipboards securely using modernized APIs.
 * @param {string} text - Plain text targeted to migrate.
 * @returns {Promise<boolean>} True upon absolute transmission validation verification success.
 */
export function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text).then(() => true).catch(() => false);
  }

  // Legacy fallback implementation layer for restricted sandboxed containers
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '-9999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(textArea);
    return Promise.resolve(!!success);
  } catch {
    return Promise.resolve(false);
  }
}