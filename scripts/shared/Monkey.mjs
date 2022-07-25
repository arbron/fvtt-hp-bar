/*
 * Adapted from The Furnace module developed by KaKaRoTo.
 * https://github.com/League-of-Foundry-Developers/fvtt-module-furnace
 */

import constants from './constants.mjs';
import { log, makeError } from './messages.mjs';


const ORIG_PREFIX = `__${constants.moduleName}_original_`;

export class Monkey {
  /**
   * Modify the named function using the provided patches and then replace the original using libWrapper.
   */
  static patch(target, patches) {
    const original = this.#getFunction(target);
    if ( !original ) return;
    const patched = this.#patchFunction(original.value, patches);
    return libWrapper.register(constants.moduleName, target, patched, libWrapper.OVERRIDE);
  }

  /* ----------------------------- */

  static replace(target, func) {
    return libWrapper.register(constants.moduleName, target, func, libWrapper.OVERRIDE);
  }

  /* ----------------------------- */

  static mix(target, func) {
    return libWrapper.register(constants.moduleName, target, func, libWrapper.MIXED);
  }

  /* ----------------------------- */

  static wrap(target, func) {
    return libWrapper.register(constants.moduleName, target, func, libWrapper.WRAPPER);
  }

  /* ----------------------------- */

  static #getFunction(target) {
    const is_setter = target.endsWith('#set');
    target = !is_setter ? target : target.slice(0, -4);
    const split = target.match(TGT_SPLIT_RE).map((x)=>x.replace(/\\(.)/g, '$1').replace(TGT_CLEANUP_RE,''));
    const root_nm = split.splice(0,1)[0];

    let obj, fn_name;
    if ( split.length == 0 ) {
      obj = globalThis;
      fn_name = root_nm;
    } else {
      const _eval = eval;
      fn_name = split.pop();
      obj = split.reduce((x,y)=>x[y], globalThis[root_nm] ?? _eval(root_nm));
    }

    let iObj = obj;
    let descriptor = null;
    while ( iObj ) {
      descriptor = Object.getOwnPropertyDescriptor(iObj, fn_name);
      if ( descriptor ) break;
      iObj = Object.getPrototypeOf(iObj);
    }

    if( !descriptor || (descriptor?.configurable === false) ) return;

    return descriptor;
  }

  /**
   * Patch the specified function with the provided changes and return the updated function.
   *
   * Patch Format: {
   *   line: Line to replace
   *   original: Version of line as appears in code
   *   replacement: Replacement code
   * }
   */
  static #patchFunction(original, patches) {
    if ( original === undefined ) return;
    const funcStr = original.toString();

    // Check for newlines so it can work on minified content too
    const splitChar = funcStr.indexOf("\n") >= 0 ? "\n" : ";";
    const lines = funcStr.split(splitChar);

    // Apply patches
    for ( const patch of patches ) {
      if ( (lines[patch.line] !== undefined) && (lines[patch.line].trim() == patch.original.trim()) ) {
          lines[patch.line] = lines[patch.line].replace(patch.original, patch.replacement);
      } else {
        throw new makeError(
          `Cannot patch function. It has the wrong content at line ${patch.line} : ${lines[patch.line] && lines[patch.line].trim()} != ${patch.original.trim()}\n${funcStr}`
        );
      }
    }

    // Recreate function
    let fixed = lines.join(splitChar);
    if ( !fixed.startsWith("function") && !fixed.match(/^async\s+function/) ) fixed = "function " + fixed;
    if ( fixed.startsWith("function async") ) fixed = fixed.replace("function async", "async function");

    return Function(`"use strict";return (${fixed})`)();
  }
}



/* ----------------------------- */
/*    libWrapper Compatibility   */
/* ----------------------------- */
// SPDX-License-Identifier: MIT
// Copyright © 2021 fvtt-lib-wrapper Rui Pinheiro

// A shim for the libWrapper library
export let libWrapper = undefined;

export const VERSIONS       = [1,12,1];
export const TGT_SPLIT_RE   = new RegExp("([^.[]+|\\[('([^'\\\\]|\\\\.)+?'|\"([^\"\\\\]|\\\\.)+?\")\\])", 'g');
export const TGT_CLEANUP_RE = new RegExp("(^\\['|'\\]$|^\\[\"|\"\\]$)", 'g');

// Main shim code
Hooks.once('init', () => {
  // Check if the real module is already loaded - if so, use it
  if(globalThis.libWrapper && !(globalThis.libWrapper.is_fallback ?? true)) {
    libWrapper = globalThis.libWrapper;
    return;
  }

  // Fallback implementation
  libWrapper = class {
    static get is_fallback() { return true };

    static get WRAPPER()  { return 'WRAPPER'  };
    static get MIXED()    { return 'MIXED'    };
    static get OVERRIDE() { return 'OVERRIDE' };

    static register(package_id, target, fn, type="MIXED", {chain=undefined, bind=[]}={}) {
      const is_setter = target.endsWith('#set');
      target = !is_setter ? target : target.slice(0, -4);
      const split = target.match(TGT_SPLIT_RE).map((x)=>x.replace(/\\(.)/g, '$1').replace(TGT_CLEANUP_RE,''));
      const root_nm = split.splice(0,1)[0];

      let obj, fn_name;
      if ( split.length == 0 ) {
        obj = globalThis;
        fn_name = root_nm;
      } else {
        const _eval = eval;
        fn_name = split.pop();
        obj = split.reduce((x,y)=>x[y], globalThis[root_nm] ?? _eval(root_nm));
      }

      let iObj = obj;
      let descriptor = null;
      while(iObj) {
        descriptor = Object.getOwnPropertyDescriptor(iObj, fn_name);
        if(descriptor) break;
        iObj = Object.getPrototypeOf(iObj);
      }
      if(!descriptor || descriptor?.configurable === false) throw new Error(`libWrapper Shim: '${target}' does not exist, could not be found, or has a non-configurable descriptor.`);

      let original = null;
      const wrapper = (chain ?? (type.toUpperCase?.() != 'OVERRIDE' && type != 3)) ?
        function(...args) { return fn.call(this, original.bind(this), ...bind, ...args); } :
        function(...args) { return fn.call(this, ...bind, ...args); }
      ;

      if(!is_setter) {
        if(descriptor.value) {
          original = descriptor.value;
          descriptor.value = wrapper;
        }
        else {
          original = descriptor.get;
          descriptor.get = wrapper;
        }
      }
      else {
        if(!descriptor.set) throw new Error(`libWrapper Shim: '${target}' does not have a setter`);
        original = descriptor.set;
        descriptor.set = wrapper;
      }

      descriptor.configurable = true;
      Object.defineProperty(obj, fn_name, descriptor);
    }
  }
});