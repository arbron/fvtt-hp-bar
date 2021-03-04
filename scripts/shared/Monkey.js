/*
 * Adapted from The Furnace module developed by KaKaRoTo.
 * https://github.com/League-of-Foundry-Developers/fvtt-module-furnace
 */

import { log, makeError } from './messages.js';


const ORIG_PREFIX = "__hp_bar_original_"

export class Monkey {
  /**
   * Patch the specified function or method with the provided changes
   * and return the updated function or method.
   *
   * Patch Format: {
   *   line: Line to replace
   *   original: Version of line as appears in code
   *   replacement: Replacement code
   * }
   */
  static patchClass(klass, func, patches) {
    // Check in case the class/function had been deprecated/removed
    if (func === undefined)
        return;
    let funcStr = func.toString()
    // Check for newlines so it can work on minified content too
    const splitChar = funcStr.indexOf("\n") >= 0 ? "\n" : ";";
    let lines = funcStr.split(splitChar)
    for (const patch of patches) {
      if (lines[patch.line] !== undefined && lines[patch.line].trim() == patch.original.trim()) {
          lines[patch.line] = lines[patch.line].replace(patch.original, patch.replacement);
      } else {
        throw new makeError(
          `Cannot patch function. It has the wrong content at line ${patch.line} : ${lines[patch.line] && lines[patch.line].trim()} != ${patch.original.trim()}\n${funcStr}`
        );
      }
    }
    let fixed = lines.join(splitChar)
    if (klass !== undefined) {
        let classStr = klass.toString()
        fixed = classStr.replace(funcStr, fixed)
    } else {
        // Check if it's a method instead of a function, add 'function' as we define it, but don't do it for 'async function'
        if (!fixed.startsWith("function") && !fixed.match(/^async\s+function/))
            fixed = "function " + fixed
        if (fixed.startsWith("function async"))
            fixed = fixed.replace("function async", "async function");
    }
    return Function('"use strict";return (' + fixed + ')')();
  }

  static patchFunction(func, patches) {
    return Monkey.patchClass(undefined, func, patches);
  }
  static patchMethod(klass, func, patches) {
    return Monkey.patchClass(klass, klass.prototype[func], patches);
  }

  static replaceFunction(klass, name, func) {
    klass[ORIG_PREFIX + name] = klass[name];
    klass[name] = func;
  }
  static replaceMethod(klass, name, func) {
    return Monkey.replaceFunction(klass.prototype, name, func);
  }
  static replaceStaticGetter(klass, name, func) {
    let getterProperty = Object.getOwnPropertyDescriptor(klass, name);
    if (getterProperty == undefined) return false;
    Object.defineProperty(klass, ORIG_PREFIX + name, getterProperty);
    Object.defineProperty(klass, name, { get: func });
    return true;
  }
  static replaceGetter(klass, name, func) {
    return Monkey.replaceStaticGetter(klass.prototype, name, func);
  }

  // Would be the same code for callOriginalMethod as long as 'klass' is actually the instance
  static callOriginalFunction(klass, name, ...args) {
    return klass[ORIG_PREFIX + name].call(klass, ...args);
  }
  static callOriginalGetter(klass, name) {
    return klass[ORIG_PREFIX + name];
  }
}
