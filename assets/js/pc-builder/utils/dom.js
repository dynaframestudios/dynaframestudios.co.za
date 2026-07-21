/**
 * @fileoverview Project Titan - Foundation Utilities: DOM Layer
 * Production-ready DOM and event manipulation utility module.
 * @module utils/dom
 * @author Senior JavaScript Architect
 * @license Proprietary / Dynaframe Studios
 */

'use strict';

/**
 * Selects a single DOM element matching the selector within a given context.
 * @param {string} selector - CSS selector string.
 * @param {ParentNode} [context=document] - The context element to search within.
 * @returns {Element|null} The matched element or null if not found.
 */
export function qs(selector, context = document) {
  return context.querySelector(selector);
}

/**
 * Selects all DOM elements matching the selector within a given context.
 * @param {string} selector - CSS selector string.
 * @param {ParentNode} [context=document] - The context element to search within.
 * @returns {Element[]} An array of matched elements.
 */
export function qsa(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

/**
 * Creates a new DOM element with optional attributes and children.
 * @param {string} tagName - The type of element to create.
 * @param {Object.<string, *>} [attributes={}] - Key-value map of attributes to set.
 * @param {...(string|Node)} [children] - Children elements or strings to append.
 * @returns {HTMLElement} The newly created element.
 */
export function create(tagName, attributes = {}, ...children) {
  const element = document.createElement(tagName);
  setAttributes(element, attributes);
  
  children.forEach(child => {
    if (child !== null && child !== undefined) {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      } else {
        element.appendChild(child);
      }
    }
  });
  
  return element;
}

/**
 * Removes a node from its parent element safely.
 * @param {Node} node - The DOM node to remove.
 * @returns {Node|null} The removed node, or null if it had no parent.
 */
export function remove(node) {
  if (node && node.parentNode) {
    return node.parentNode.removeChild(node);
  }
  return null;
}

/**
 * Safely removes all child nodes from an element.
 * @param {Element} element - The target element to empty.
 * @returns {Element} The emptied element.
 */
export function empty(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  return element;
}

/**
 * Appends children nodes or text strings to a parent element.
 * @param {Element} parent - The target parent element.
 * @param {...(string|Node)} children - The child elements or strings to append.
 * @returns {Element} The parent element.
 */
export function append(parent, ...children) {
  children.forEach(child => {
    if (typeof child === 'string') {
      parent.appendChild(document.createTextNode(child));
    } else {
      parent.appendChild(child);
    }
  });
  return parent;
}

/**
 * Prepends children nodes or text strings to a parent element.
 * @param {Element} parent - The target parent element.
 * @param {...(string|Node)} children - The child elements or strings to prepend.
 * @returns {Element} The parent element.
 */
export function prepend(parent, ...children) {
  const fragment = document.createDocumentFragment();
  children.forEach(child => {
    if (typeof child === 'string') {
      fragment.appendChild(document.createTextNode(child));
    } else {
      fragment.appendChild(child);
    }
  });
  parent.insertBefore(fragment, parent.firstChild);
  return parent;
}

/**
 * Inserts a node or HTML string directly before a target reference element.
 * @param {Element} referenceElement - The reference DOM element.
 * @param {Node|string} nodeOrString - The content to insert before the reference.
 * @returns {void}
 */
export function before(referenceElement, nodeOrString) {
  if (typeof nodeOrString === 'string') {
    referenceElement.insertAdjacentHTML('beforebegin', nodeOrString);
  } else {
    referenceElement.parentNode?.insertBefore(nodeOrString, referenceElement);
  }
}

/**
 * Inserts a node or HTML string directly after a target reference element.
 * @param {Element} referenceElement - The reference DOM element.
 * @param {Node|string} nodeOrString - The content to insert after the reference.
 * @returns {void}
 */
export function after(referenceElement, nodeOrString) {
  if (typeof nodeOrString === 'string') {
    referenceElement.insertAdjacentHTML('afterend', nodeOrString);
  } else {
    referenceElement.parentNode?.insertBefore(nodeOrString, referenceElement.nextSibling);
  }
}

/**
 * Replaces an existing DOM element with a new element or HTML content structure.
 * @param {Element} oldElement - The DOM element to replace.
 * @param {Element|string} newContent - The new DOM element or HTML string.
 * @returns {Element|null} The old element that was removed, or null on failure.
 */
export function replace(oldElement, newContent) {
  if (!oldElement.parentNode) return null;
  
  if (typeof newContent === 'string') {
    const template = document.createElement('template');
    template.innerHTML = newContent.trim();
    const newElement = template.content.firstChild;
    if (newElement) {
      oldElement.parentNode.replaceChild(newElement, oldElement);
    }
    return oldElement;
  }
  
  oldElement.parentNode.replaceChild(newContent, oldElement);
  return oldElement;
}

/**
 * Displays an element by cleaning inline hidden styles. 
 * Reverts to standard layout configurations if previously hidden.
 * @param {HTMLElement} element - Target HTML Element.
 * @returns {HTMLElement} The targeted element.
 */
export function show(element) {
  if (element.style.display === 'none') {
    element.style.display = '';
  }
  element.removeAttribute('hidden');
  return element;
}

/**
 * Hides an element using standard CSS hidden states and attributes.
 * @param {HTMLElement} element - Target HTML Element.
 * @returns {HTMLElement} The targeted element.
 */
export function hide(element) {
  element.style.display = 'none';
  element.setAttribute('hidden', '');
  return element;
}

/**
 * Toggles visibility states based on standard displays or explicit logic conditions.
 * @param {HTMLElement} element - Target HTML Element.
 * @param {boolean} [force] - Explicit flag state to force show (true) or hide (false).
 * @returns {HTMLElement} The targeted element.
 */
export function toggle(element, force) {
  const shouldHide = force !== undefined ? !force : (element.style.display !== 'none' && !element.hasAttribute('hidden'));
  return shouldHide ? hide(element) : show(element);
}

/**
 * Adds one or more class names to a target element.
 * @param {Element} element - Target DOM Element.
 * @param {...string} classNames - Class names to add.
 * @returns {Element} The targeted element.
 */
export function addClass(element, ...classNames) {
  element.classList.add(...classNames);
  return element;
}

/**
 * Removes one or more class names from a target element.
 * @param {Element} element - Target DOM Element.
 * @param {...string} classNames - Class names to strip out.
 * @returns {Element} The targeted element.
 */
export function removeClass(element, ...classNames) {
  element.classList.remove(...classNames);
  return element;
}

/**
 * Toggles an element class name conditionally or strictly.
 * @param {Element} element - Target DOM Element.
 * @param {string} className - Single class token targeted.
 * @param {boolean} [force] - Explicit state tracking flag matching ClassList.toggle signature.
 * @returns {boolean} Outcome state (true if class is present, false if removed).
 */
export function toggleClass(element, className, force) {
  return element.classList.toggle(className, force);
}

/**
 * Verifies if an element maintains a specific class configuration.
 * @param {Element} element - Target DOM Element.
 * @param {string} className - Class name to seek.
 * @returns {boolean} True if the element contains the class.
 */
export function hasClass(element, className) {
  return element.classList.contains(className);
}

/**
 * Applies multi-attribute configurations to any targeted DOM node structure.
 * Handles styles as objects, event maps, datasets, and complex bindings natively.
 * @param {Element} element - Target DOM element.
 * @param {Object.<string, *>} attributes - Key-value pair configuration map.
 * @returns {Element} The mutation target element reference.
 */
export function setAttributes(element, attributes) {
  Object.entries(attributes).forEach(([key, value]) => {
    if (value === null || value === undefined || value === false) {
      element.removeAttribute(key);
    } else if (key === 'style' && typeof value === 'object') {
      Object.assign((/** @type {HTMLElement} */ (element)).style, value);
    } else if (key === 'dataset' && typeof value === 'object') {
      Object.entries(value).forEach(([dataKey, dataValue]) => {
        (/** @type {HTMLElement} */ (element)).dataset[dataKey] = String(dataValue);
      });
    } else if (key === 'className') {
      element.className = String(value);
    } else {
      element.setAttribute(key, String(value));
    }
  });
  return element;
}

/**
 * Removes a series of specified attribute names from an element.
 * @param {Element} element - Target DOM Element.
 * @param {...string} attributeNames - Attributes names to strip.
 * @returns {Element} The targeted element.
 */
export function removeAttributes(element, ...attributeNames) {
  attributeNames.forEach(attr => element.removeAttribute(attr));
  return element;
}

/**
 * Assigns metadata values into data attributes securely.
 * @param {HTMLElement} element - Target HTML Element.
 * @param {string} key - CamelCase key representation matching element.dataset.
 * @param {*} value - Value payload parsed cleanly into strings.
 * @returns {HTMLElement} The modified element.
 */
export function setDataset(element, key, value) {
  element.dataset[key] = value === Object(value) ? JSON.stringify(value) : String(value);
  return element;
}

/**
 * Extracts, and conditionally parses structural metadata objects hidden on DOM points.
 * @param {HTMLElement} element - Target HTML Element.
 * @param {string} key - Structural target parameter identity name.
 * @returns {string|null|Object} Evaluated dataset string payload, parsed objects, or null structural fallback markers.
 */
export function getDataset(element, key) {
  const value = element.dataset[key];
  if (value === undefined) return null;
  
  if ((value.startsWith('{') && value.endsWith('}')) || (value.startsWith('[') && value.endsWith(']'))) {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }
  return value;
}

/**
 * Injects structured string fragments into structural layers securely.
 * Automatically handles string structural cleanups across inner nodes safely.
 * @param {Element} element - Target container element.
 * @param {string} htmlString - Valid parsing contextual fragments.
 * @returns {Element} Target element housing mutated components.
 */
export function html(element, htmlString) {
  element.innerHTML = htmlString;
  return element;
}

/**
 * Serializes standard multi-input forms safely into uniform payload maps.
 * Automatically builds modern arrays on multi-field assignments.
 * @param {HTMLFormElement} formElement - Form DOM element reference.
 * @returns {Object.<string, string|string[]>} Flat object map data graph representing filled fields.
 */
export function serializeForm(formElement) {
  const formData = new FormData(formElement);
  /** @type {Object.<string, string|string[]>} */
  const payload = {};

  for (const [key, value] of formData.entries()) {
    const stringValue = String(value);
    if (Object.hasOwn(payload, key)) {
      if (!Array.isArray(payload[key])) {
        payload[key] = [/** @type {string} */ (payload[key])];
      }
      (/** @type {string[]} */ (payload[key])).push(stringValue);
    } else {
      payload[key] = stringValue;
    }
  }
  return payload;
}

/**
 * Activates functional elements across forms, buttons and tracking points.
 * @param {Element} element - Target target DOM Node.
 * @returns {Element} Mutated focus layout element.
 */
export function enable(element) {
  element.removeAttribute('disabled');
  return element;
}

/**
 * Safeguards nodes by blocking standard mouse, tracking, and structural actions.
 * @param {Element} element - Target element node.
 * @returns {Element} Disabled interactive object structure.
 */
export function disable(element) {
  element.setAttribute('disabled', 'true');
  return element;
}

/**
 * Standardizes layout focusing points safely across standard UI targets.
 * @param {HTMLElement} element - Target target element node.
 * @returns {HTMLElement} Focused element pointer.
 */
export function focus(element) {
  element.focus();
  return element;
}

/**
 * Standardizes standard smooth cross-axis geometric scroll behaviors.
 * @param {Element} element - Target target container block.
 * @param {ScrollIntoViewOptions} [options] - Explicit layout rules engine settings.
 * @returns {Element} Target execution reference framework node.
 */
export function scrollIntoView(element, options = { behavior: 'smooth', block: 'start' }) {
  element.scrollIntoView(options);
  return element;
}

/**
 * Orchestrates broad delegated event capture pipelines down complex DOM structural scopes.
 * @param {Element} element - Root wrapper monitoring layer scope.
 * @param {string} selector - CSS structural standard match configuration query parameter.
 * @param {string} eventName - Standard system targeting identity tag (e.g. 'click').
 * @param {function(Event, Element): void} handler - Processing execution strategy loop parameter.
 * @param {boolean|AddEventListenerOptions} [options=false] - Context capturing mechanics configurations options.
 * @returns {function(): void} Cancellation teardown wrapper mechanism function.
 */
export function delegate(element, selector, eventName, handler, options = false) {
  /** @param {Event} event */
  const listener = function(event) {
    const targetNode = event.target;
    if (!(targetNode instanceof Node)) return;
    
    const delegateTarget = targetNode.closest(selector);
    if (delegateTarget && element.contains(delegateTarget)) {
      handler.call(delegateTarget, event, delegateTarget);
    }
  };

  element.addEventListener(eventName, listener, options);
  return () => element.removeEventListener(eventName, listener, options);
}

/**
 * Binds systematic standard functional logic structures onto real nodes securely.
 * @param {EventTarget} element - Root interactive binding platform.
 * @param {string} eventName - Normal targeted state event identifiers.
 * @param {EventListenerOrEventListenerObject} handler - Targeted runtime processing steps engine context.
 * @param {boolean|AddEventListenerOptions} [options=false] - Capture and processing engine settings parameter.
 * @returns {void}
 */
export function on(element, eventName, handler, options = false) {
  element.addEventListener(eventName, handler, options);
}

/**
 * Detaches structural logic paths smoothly away from explicit system hooks.
 * @param {EventTarget} element - Active structural connection target platform.
 * @param {string} eventName - Explicit identity string tracking markers.
 * @param {EventListenerOrEventListenerObject} handler - Target executable to disconnect.
 * @param {boolean|EventListenerOptions} [options=false] - Scope and matching structural layer logic maps.
 * @returns {void}
 */
export function off(element, eventName, handler, options = false) {
  element.removeEventListener(eventName, handler, options);
}

/**
 * Attaches self-destructing transactional logic blocks down designated lifecycle points.
 * @param {EventTarget} element - Active execution node target layer context.
 * @param {string} eventName - System identifier mapping hook.
 * @param {EventListenerOrEventListenerObject} handler - Runtime business processing engine logic layer block.
 * @param {boolean|AddEventListenerOptions} [options=false] - Event setup structural tracking configuration.
 * @returns {void}
 */
export function once(element, eventName, handler, options = false) {
  const optionsObject = typeof options === 'object' ? { ...options, once: true } : { capture: options, once: true };
  element.addEventListener(eventName, handler, optionsObject);
}

/**
 * Standardizes window and document interactive ready tracking layers securely.
 * Executes immediately if DOM layout states have already passed initialization phases.
 * @param {function(): void} handler - Functional processing logic roadmap execution targets.
 * @returns {void}
 */
export function ready(handler) {
  if (document.readyState !== 'loading') {
    handler();
  } else {
    document.addEventListener('DOMContentLoaded', handler);
  }
}

/**
 * Wraps DOM-bound execution points in clean debounce timers.
 * @param {function(Event): void} callback - High frequency layout tracking function.
 * @param {number} delay - Execution stabilization gap time frame in milliseconds.
 * @returns {function(Event): void} Managed structural processing boundary loop function.
 */
export function debounceEvent(callback, delay) {
  /** @type {number|undefined} */
  let timeoutId;
  return function(event) {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => callback(event), delay);
  };
}

/**
 * Caps event processing frame executions strictly within controlled window spaces.
 * @param {function(Event): void} callback - Tracking update execution block.
 * @param {number} limit - Frame timing baseline limit settings boundary tracking values.
 * @returns {function(Event): void} Regulated streaming callback execution handler loop.
 */
export function throttleEvent(callback, limit) {
  /** @type {number|undefined} */
  let lastRan;
  /** @type {number|undefined} */
  let lastFunc;
  
  return function(event) {
    const now = Date.now();
    if (!lastRan || (now - lastRan >= limit)) {
      callback(event);
      lastRan = now;
    } else {
      window.clearTimeout(lastFunc);
      lastFunc = window.setTimeout(() => {
        if ((Date.now() - (lastRan || 0)) >= limit) {
          callback(event);
          lastRan = Date.now();
        }
      }, limit - (now - lastRan));
    }
  };
}