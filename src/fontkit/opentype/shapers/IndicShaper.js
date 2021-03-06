/* eslint-disable */

import * as Script from '../../layout/Script';
import GlyphInfo from '../GlyphInfo';
import {
  CATEGORIES,
  POSITIONS,
  CONSONANT_FLAGS,
  JOINER_FLAGS,
  HALANT_OR_COENG_FLAGS, INDIC_CONFIGS,
  INDIC_DECOMPOSITIONS
} from './indic-data';
import DefaultShaper from './DefaultShaper';
import * as StateMachine from 'dfa';
import * as UnicodeTrie from 'unicode-trie';
import unicode from '../../unicode-properties'
const useData = { "categories": ["O", "IND", "S", "GB", "B", "FM", "CGJ", "VMAbv", "VMPst", "VAbv", "VPst", "CMBlw", "VPre", "VBlw", "H", "VMBlw", "CMAbv", "MBlw", "CS", "R", "SUB", "MPst", "MPre", "FAbv", "FPst", "FBlw", "SMAbv", "SMBlw", "VMPre", "ZWNJ", "ZWJ", "WJ", "VS", "N", "HN", "MAbv"], "decompositions": { "2507": [2503, 2494], "2508": [2503, 2519], "2888": [2887, 2902], "2891": [2887, 2878], "2892": [2887, 2903], "3018": [3014, 3006], "3019": [3015, 3006], "3020": [3014, 3031], "3144": [3142, 3158], "3264": [3263, 3285], "3271": [3270, 3285], "3272": [3270, 3286], "3274": [3270, 3266], "3275": [3270, 3266, 3285], "3402": [3398, 3390], "3403": [3399, 3390], "3404": [3398, 3415], "3546": [3545, 3530], "3548": [3545, 3535], "3549": [3545, 3535, 3530], "3550": [3545, 3551], "3635": [3661, 3634], "3763": [3789, 3762], "3955": [3953, 3954], "3957": [3953, 3956], "3958": [4018, 3968], "3959": [4018, 3953, 3968], "3960": [4019, 3968], "3961": [4019, 3953, 3968], "3969": [3953, 3968], "6971": [6970, 6965], "6973": [6972, 6965], "6976": [6974, 6965], "6977": [6975, 6965], "6979": [6978, 6965], "69934": [69937, 69927], "69935": [69938, 69927], "70475": [70471, 70462], "70476": [70471, 70487], "70843": [70841, 70842], "70844": [70841, 70832], "70846": [70841, 70845], "71098": [71096, 71087], "71099": [71097, 71087] }, "stateTable": [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [2, 2, 3, 4, 4, 5, 0, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 0, 17, 18, 11, 19, 20, 21, 22, 0, 0, 23, 0, 0, 2, 0, 24, 0, 25], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 26, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 27, 28, 0, 0, 0, 0, 27, 0, 0, 0], [0, 0, 0, 0, 0, 29, 0, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 0, 0, 41, 35, 42, 43, 44, 45, 0, 0, 46, 0, 0, 0, 39, 0, 0, 47], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 5, 0, 6, 7, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 20, 21, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 5, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 21, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 5, 0, 6, 7, 8, 9, 0, 0, 12, 0, 14, 0, 0, 0, 0, 0, 0, 0, 20, 21, 22, 0, 0, 23, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 5, 0, 6, 7, 0, 9, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 20, 21, 22, 0, 0, 23, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 5, 0, 6, 7, 8, 9, 10, 11, 12, 13, 14, 0, 16, 0, 0, 18, 11, 19, 20, 21, 22, 0, 0, 23, 0, 0, 0, 0, 0, 0, 25], [0, 0, 0, 0, 0, 5, 0, 6, 7, 8, 9, 0, 11, 12, 0, 14, 0, 0, 0, 0, 0, 0, 0, 20, 21, 22, 0, 0, 23, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 5, 0, 6, 7, 0, 9, 0, 0, 12, 0, 14, 0, 0, 0, 0, 0, 0, 0, 20, 21, 22, 0, 0, 23, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 5, 0, 0, 7, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 20, 21, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 5, 0, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 0, 0, 18, 11, 19, 20, 21, 22, 0, 0, 23, 0, 0, 0, 0, 0, 0, 25], [0, 0, 0, 0, 0, 5, 0, 6, 7, 8, 9, 0, 11, 12, 0, 14, 0, 0, 0, 0, 0, 11, 0, 20, 21, 22, 0, 0, 23, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 4, 4, 5, 0, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 0, 0, 18, 11, 19, 20, 21, 22, 0, 0, 23, 0, 0, 0, 0, 0, 0, 25], [0, 0, 0, 0, 0, 5, 0, 6, 7, 8, 9, 48, 11, 12, 13, 14, 48, 16, 0, 0, 18, 11, 19, 20, 21, 22, 0, 0, 23, 0, 0, 0, 49, 0, 0, 25], [0, 0, 0, 0, 0, 5, 0, 6, 7, 8, 9, 0, 11, 12, 0, 14, 0, 16, 0, 0, 0, 11, 0, 20, 21, 22, 0, 0, 23, 0, 0, 0, 0, 0, 0, 25], [0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 21, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 5, 0, 6, 7, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 20, 21, 22, 0, 0, 23, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 50, 0, 51, 0], [0, 0, 0, 0, 0, 5, 0, 6, 7, 8, 9, 0, 11, 12, 0, 14, 0, 16, 0, 0, 0, 11, 0, 20, 21, 22, 0, 0, 23, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 27, 28, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 28, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 29, 0, 30, 31, 0, 0, 0, 0, 0, 0, 38, 0, 0, 0, 0, 0, 0, 0, 43, 44, 45, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 29, 0, 0, 31, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 43, 44, 45, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 29, 0, 30, 31, 32, 33, 0, 0, 36, 0, 38, 0, 0, 0, 0, 0, 0, 0, 43, 44, 45, 0, 0, 46, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 29, 0, 30, 31, 0, 33, 0, 0, 0, 0, 38, 0, 0, 0, 0, 0, 0, 0, 43, 44, 45, 0, 0, 46, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 29, 0, 30, 31, 32, 33, 34, 35, 36, 37, 38, 0, 40, 0, 0, 41, 35, 42, 43, 44, 45, 0, 0, 46, 0, 0, 0, 0, 0, 0, 47], [0, 0, 0, 0, 0, 29, 0, 30, 31, 32, 33, 0, 35, 36, 0, 38, 0, 0, 0, 0, 0, 0, 0, 43, 44, 45, 0, 0, 46, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 29, 0, 30, 31, 0, 33, 0, 0, 36, 0, 38, 0, 0, 0, 0, 0, 0, 0, 43, 44, 45, 0, 0, 46, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 41, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 29, 0, 0, 31, 0, 0, 0, 0, 0, 0, 38, 0, 0, 0, 0, 0, 0, 0, 43, 44, 45, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 29, 0, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 0, 0, 41, 35, 42, 43, 44, 45, 0, 0, 46, 0, 0, 0, 0, 0, 0, 47], [0, 0, 0, 0, 0, 29, 0, 30, 31, 32, 33, 0, 35, 36, 0, 38, 0, 0, 0, 0, 0, 35, 0, 43, 44, 45, 0, 0, 46, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 29, 0, 30, 31, 32, 33, 52, 35, 36, 37, 38, 52, 40, 0, 0, 41, 35, 42, 43, 44, 45, 0, 0, 46, 0, 0, 0, 53, 0, 0, 47], [0, 0, 0, 0, 0, 29, 0, 30, 31, 32, 33, 0, 35, 36, 0, 38, 0, 40, 0, 0, 0, 35, 0, 43, 44, 45, 0, 0, 46, 0, 0, 0, 0, 0, 0, 47], [0, 0, 0, 0, 0, 29, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 43, 44, 45, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 29, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 44, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 29, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 44, 45, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 29, 0, 30, 31, 0, 0, 0, 0, 0, 0, 38, 0, 0, 0, 0, 0, 0, 0, 43, 44, 45, 0, 0, 46, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 29, 0, 30, 31, 32, 33, 0, 35, 36, 0, 38, 0, 40, 0, 0, 0, 35, 0, 43, 44, 45, 0, 0, 46, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 5, 0, 6, 7, 8, 9, 48, 11, 12, 13, 14, 0, 16, 0, 0, 18, 11, 19, 20, 21, 22, 0, 0, 23, 0, 0, 0, 0, 0, 0, 25], [0, 0, 0, 0, 0, 5, 0, 6, 7, 8, 9, 48, 11, 12, 13, 14, 48, 16, 0, 0, 18, 11, 19, 20, 21, 22, 0, 0, 23, 0, 0, 0, 0, 0, 0, 25], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 51, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 54, 0, 0], [0, 0, 0, 0, 0, 29, 0, 30, 31, 32, 33, 52, 35, 36, 37, 38, 0, 40, 0, 0, 41, 35, 42, 43, 44, 45, 0, 0, 46, 0, 0, 0, 0, 0, 0, 47], [0, 0, 0, 0, 0, 29, 0, 30, 31, 32, 33, 52, 35, 36, 37, 38, 52, 40, 0, 0, 41, 35, 42, 43, 44, 45, 0, 0, 46, 0, 0, 0, 0, 0, 0, 47], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 50, 0, 51, 0]], "accepting": [false, true, true, true, true, true, true, true, true, true, true, true, true, false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true], "tags": [[], ["broken_cluster"], ["independent_cluster"], ["symbol_cluster"], ["standard_cluster"], ["broken_cluster"], ["broken_cluster"], ["broken_cluster"], ["broken_cluster"], ["broken_cluster"], ["broken_cluster"], ["broken_cluster"], ["broken_cluster"], [], ["broken_cluster"], ["broken_cluster"], ["broken_cluster"], ["broken_cluster"], ["broken_cluster"], ["broken_cluster"], ["broken_cluster"], ["broken_cluster"], ["broken_cluster"], ["broken_cluster"], ["numeral_cluster"], ["broken_cluster"], ["independent_cluster"], ["symbol_cluster"], ["symbol_cluster"], ["standard_cluster"], ["standard_cluster"], ["standard_cluster"], ["standard_cluster"], ["standard_cluster"], ["standard_cluster"], ["standard_cluster"], ["standard_cluster"], ["virama_terminated_cluster"], ["standard_cluster"], ["standard_cluster"], ["standard_cluster"], ["standard_cluster"], ["standard_cluster"], ["standard_cluster"], ["standard_cluster"], ["standard_cluster"], ["standard_cluster"], ["standard_cluster"], ["broken_cluster"], ["broken_cluster"], ["numeral_cluster"], ["number_joiner_terminated_cluster"], ["standard_cluster"], ["standard_cluster"], ["numeral_cluster"]] }
import indicMachine from './indic'

// let base64String = require('fs').readFileSync(__dirname + '/indic.trie')
let base64String = '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'
const trie = new UnicodeTrie(base64String);

/**
 * The IndicShaper supports indic scripts e.g. Devanagari, Kannada, etc.
 * Based on code from Harfbuzz: https://github.com/behdad/harfbuzz/blob/master/src/hb-ot-shape-complex-indic.cc
 */
export default class IndicShaper extends DefaultShaper {
  static zeroMarkWidths = 'NONE';
  static planFeatures(plan) {
    plan.addStage(setupSyllables);

    plan.addStage(['locl', 'ccmp']);

    plan.addStage(initialReordering);

    plan.addStage('nukt');
    plan.addStage('akhn');
    plan.addStage('rphf', false);
    plan.addStage('rkrf');
    plan.addStage('pref', false);
    plan.addStage('blwf', false);
    plan.addStage('abvf', false);
    plan.addStage('half', false);
    plan.addStage('pstf', false);
    plan.addStage('vatu');
    plan.addStage('cjct');
    plan.addStage('cfar', false);

    plan.addStage(finalReordering);

    plan.addStage({
      local: ['init'],
      global: ['pres', 'abvs', 'blws', 'psts', 'haln', 'dist', 'abvm', 'blwm', 'calt', 'clig']
    });

    // Setup the indic config for the selected script
    plan.unicodeScript = Script.fromOpenType(plan.script);
    plan.indicConfig = INDIC_CONFIGS[plan.unicodeScript] || INDIC_CONFIGS.Default;
    plan.isOldSpec = plan.indicConfig.hasOldSpec && plan.script[plan.script.length - 1] !== '2';

    // TODO: turn off kern (Khmer) and liga features.
  }

  static assignFeatures(plan, glyphs) {
    // Decompose split matras
    // TODO: do this in a more general unicode normalizer
    for (let i = glyphs.length - 1; i >= 0; i--) {
      let codepoint = glyphs[i].codePoints[0];
      const { decompositions } = useData;
      let d = INDIC_DECOMPOSITIONS[codepoint] || decompositions[codepoint];
      if (d) {
        let decomposed = d.map(c => {
          let g = plan.font.glyphForCodePoint(c);
          return new GlyphInfo(plan.font, g.id, [c], glyphs[i].features);
        });

        glyphs.splice(i, 1, ...decomposed);
      }
    }
  }
}

function indicCategory(glyph) {
  return trie.get(glyph.codePoints[0]) >> 8;
}

function indicPosition(glyph) {
  return 1 << (trie.get(glyph.codePoints[0]) & 0xff);
}

class IndicInfo {
  constructor(category, position, syllableType, syllable) {
    this.category = category;
    this.position = position;
    this.syllableType = syllableType;
    this.syllable = syllable;
  }
}

function setupSyllables(font, glyphs) {
  const stateMachine = new StateMachine(indicMachine);

  let syllable = 0;
  let last = 0;
  for (let [start, end, tags] of stateMachine.match(glyphs.map(indicCategory))) {
    if (start > last) {
      ++syllable;
      for (let i = last; i < start; i++) {
        glyphs[i].shaperInfo = new IndicInfo(CATEGORIES.X, POSITIONS.End, 'non_indic_cluster', syllable);
      }
    }

    ++syllable;

    // Create shaper info
    for (let i = start; i <= end; i++) {
      glyphs[i].shaperInfo = new IndicInfo(
        1 << indicCategory(glyphs[i]),
        indicPosition(glyphs[i]),
        tags[0],
        syllable
      );
    }

    last = end + 1;
  }

  if (last < glyphs.length) {
    ++syllable;
    for (let i = last; i < glyphs.length; i++) {
      glyphs[i].shaperInfo = new IndicInfo(CATEGORIES.X, POSITIONS.End, 'non_indic_cluster', syllable);
    }
  }
}

function isConsonant(glyph) {
  return glyph.shaperInfo.category & CONSONANT_FLAGS;
}

function isJoiner(glyph) {
  return glyph.shaperInfo.category & JOINER_FLAGS;
}

function isHalantOrCoeng(glyph) {
  return glyph.shaperInfo.category & HALANT_OR_COENG_FLAGS;
}

function wouldSubstitute(glyphs, feature) {
  for (let glyph of glyphs) {
    glyph.features = {[feature]: true};
  }

  let GSUB = glyphs[0]._font._layoutEngine.engine.GSUBProcessor;
  GSUB.applyFeatures([feature], glyphs);

  return glyphs.length === 1;
}

function consonantPosition(font, consonant, virama) {
  let glyphs = [virama, consonant, virama];
  if (wouldSubstitute(glyphs.slice(0, 2), 'blwf') || wouldSubstitute(glyphs.slice(1, 3), 'blwf')) {
    return POSITIONS.Below_C;
  } else if (wouldSubstitute(glyphs.slice(0, 2), 'pstf') || wouldSubstitute(glyphs.slice(1, 3), 'pstf')) {
    return POSITIONS.Post_C;
  } else if (wouldSubstitute(glyphs.slice(0, 2), 'pref') || wouldSubstitute(glyphs.slice(1, 3), 'pref')) {
    return POSITIONS.Post_C;
  }

  return POSITIONS.Base_C;
}

function initialReordering(font, glyphs, plan) {
  let indicConfig = plan.indicConfig;
  let features = font._layoutEngine.engine.GSUBProcessor.features;

  let dottedCircle = font.glyphForCodePoint(0x25cc).id;
  let virama = font.glyphForCodePoint(indicConfig.virama).id;
  if (virama) {
    let info = new GlyphInfo(font, virama, [indicConfig.virama]);
    for (let i = 0; i < glyphs.length; i++) {
      if (glyphs[i].shaperInfo.position === POSITIONS.Base_C) {
        glyphs[i].shaperInfo.position = consonantPosition(font, glyphs[i].copy(), info);
      }
    }
  }

  for (let start = 0, end = nextSyllable(glyphs, 0); start < glyphs.length; start = end, end = nextSyllable(glyphs, start)) {
    let {syllableType} = glyphs[start].shaperInfo;

    if (syllableType === 'symbol_cluster' || syllableType === 'non_indic_cluster') {
      continue;
    }

    if (syllableType === 'broken_cluster' && dottedCircle) {
      let g = new GlyphInfo(font, dottedCircle, [0x25cc]);
      g.shaperInfo = new IndicInfo(
        1 << indicCategory(g),
        indicPosition(g),
        glyphs[start].shaperInfo.syllableType,
        glyphs[start].shaperInfo.syllable
      );

      // Insert after possible Repha.
      let i = start;
      while (i < end && glyphs[i].shaperInfo.category === CATEGORIES.Repha) {
        i++;
      }

      glyphs.splice(i++, 0, g);
      end++;
    }

    // 1. Find base consonant:
    //
    // The shaping engine finds the base consonant of the syllable, using the
    // following algorithm: starting from the end of the syllable, move backwards
    // until a consonant is found that does not have a below-base or post-base
    // form (post-base forms have to follow below-base forms), or that is not a
    // pre-base reordering Ra, or arrive at the first consonant. The consonant
    // stopped at will be the base.

    let base = end;
    let limit = start;
    let hasReph = false;

    // If the syllable starts with Ra + Halant (in a script that has Reph)
    // and has more than one consonant, Ra is excluded from candidates for
    // base consonants.
    if (indicConfig.rephPos !== POSITIONS.Ra_To_Become_Reph &&
      features.rphf &&
      start + 3 <= end && (
        (indicConfig.rephMode === 'Implicit' && !isJoiner(glyphs[start + 2])) ||
        (indicConfig.rephMode === 'Explicit' && glyphs[start + 2].shaperInfo.category === CATEGORIES.ZWJ)
      )
    ) {
      // See if it matches the 'rphf' feature.
      let g = [glyphs[start].copy(), glyphs[start + 1].copy(), glyphs[start + 2].copy()];
      if (wouldSubstitute(g.slice(0, 2), 'rphf') || (indicConfig.rephMode === 'Explicit' && wouldSubstitute(g, 'rphf'))) {
        limit += 2;
        while (limit < end && isJoiner(glyphs[limit])) {
          limit++;
        }
        base = start;
        hasReph = true;
      }
    } else if (indicConfig.rephMode === 'Log_Repha' && glyphs[start].shaperInfo.category === CATEGORIES.Repha) {
      limit++;
      while (limit < end && isJoiner(glyphs[limit])) {
        limit++;
      }
      base = start;
      hasReph = true;
    }

    switch (indicConfig.basePos) {
      case 'Last': {
        // starting from the end of the syllable, move backwards
        let i = end;
        let seenBelow = false;

        do {
          let info = glyphs[--i].shaperInfo;

          // until a consonant is found
          if (isConsonant(glyphs[i])) {
            // that does not have a below-base or post-base form
            // (post-base forms have to follow below-base forms),
            if (info.position !== POSITIONS.Below_C && (info.position !== POSITIONS.Post_C || seenBelow)) {
              base = i;
              break;
            }

            // or that is not a pre-base reordering Ra,
            //
            // IMPLEMENTATION NOTES:
            //
            // Our pre-base reordering Ra's are marked POS_POST_C, so will be skipped
            // by the logic above already.
            //

            // or arrive at the first consonant. The consonant stopped at will
            // be the base.
            if (info.position === POSITIONS.Below_C) {
              seenBelow = true;
            }

            base = i;
          } else if (start < i && info.category === CATEGORIES.ZWJ && glyphs[i - 1].shaperInfo.category === CATEGORIES.H) {
            // A ZWJ after a Halant stops the base search, and requests an explicit
            // half form.
            // A ZWJ before a Halant, requests a subjoined form instead, and hence
            // search continues.  This is particularly important for Bengali
            // sequence Ra,H,Ya that should form Ya-Phalaa by subjoining Ya.
            break;
          }
        } while (i > limit);
        break;
      }

      case 'First': {
        // The first consonant is always the base.
        base = start;

        // Mark all subsequent consonants as below.
        for (let i = base + 1; i < end; i++) {
          if (isConsonant(glyphs[i])) {
            glyphs[i].shaperInfo.position = POSITIONS.Below_C;
          }
        }
        break
      }
  
      default: break
    }

    // If the syllable starts with Ra + Halant (in a script that has Reph)
    // and has more than one consonant, Ra is excluded from candidates for
    // base consonants.
    //
    //  Only do this for unforced Reph. (ie. not for Ra,H,ZWJ)
    if (hasReph && base === start && limit - base <= 2) {
      hasReph = false;
    }

    // 2. Decompose and reorder Matras:
    //
    // Each matra and any syllable modifier sign in the cluster are moved to the
    // appropriate position relative to the consonant(s) in the cluster. The
    // shaping engine decomposes two- or three-part matras into their constituent
    // parts before any repositioning. Matra characters are classified by which
    // consonant in a conjunct they have affinity for and are reordered to the
    // following positions:
    //
    //   o Before first half form in the syllable
    //   o After subjoined consonants
    //   o After post-form consonant
    //   o After main consonant (for above marks)
    //
    // IMPLEMENTATION NOTES:
    //
    // The normalize() routine has already decomposed matras for us, so we don't
    // need to worry about that.

    // 3.  Reorder marks to canonical order:
    //
    // Adjacent nukta and halant or nukta and vedic sign are always repositioned
    // if necessary, so that the nukta is first.
    //
    // IMPLEMENTATION NOTES:
    //
    // We don't need to do this: the normalize() routine already did this for us.

    // Reorder characters

    for (let i = start; i < base; i++) {
      let info = glyphs[i].shaperInfo;
      info.position = Math.min(POSITIONS.Pre_C, info.position);
    }

    if (base < end) {
      glyphs[base].shaperInfo.position = POSITIONS.Base_C;
    }

    // Mark final consonants.  A final consonant is one appearing after a matra,
    // like in Khmer.
    for (let i = base + 1; i < end; i++) {
      if (glyphs[i].shaperInfo.category === CATEGORIES.M) {
        for (let j = i + 1; j < end; j++) {
          if (isConsonant(glyphs[j])) {
            glyphs[j].shaperInfo.position = POSITIONS.Final_C;
            break;
          }
        }
        break;
      }
    }

    // Handle beginning Ra
    if (hasReph) {
      glyphs[start].shaperInfo.position = POSITIONS.Ra_To_Become_Reph;
    }

    // For old-style Indic script tags, move the first post-base Halant after
    // last consonant.
    //
    // Reports suggest that in some scripts Uniscribe does this only if there
    // is *not* a Halant after last consonant already (eg. Kannada), while it
    // does it unconditionally in other scripts (eg. Malayalam).  We don't
    // currently know about other scripts, so we single out Malayalam for now.
    //
    // Kannada test case:
    // U+0C9A,U+0CCD,U+0C9A,U+0CCD
    // With some versions of Lohit Kannada.
    // https://bugs.freedesktop.org/show_bug.cgi?id=59118
    //
    // Malayalam test case:
    // U+0D38,U+0D4D,U+0D31,U+0D4D,U+0D31,U+0D4D
    // With lohit-ttf-20121122/Lohit-Malayalam.ttf
    if (plan.isOldSpec) {
      let disallowDoubleHalants = plan.unicodeScript !== 'Malayalam';
      for (let i = base + 1; i < end; i++) {
        if (glyphs[i].shaperInfo.category === CATEGORIES.H) {
          let j;
          for (j = end - 1; j > i; j--) {
            if (isConsonant(glyphs[j]) || (disallowDoubleHalants && glyphs[j].shaperInfo.category === CATEGORIES.H)) {
              break;
            }
          }

          if (glyphs[j].shaperInfo.category !== CATEGORIES.H && j > i) {
            // Move Halant to after last consonant.
            let t = glyphs[i];
            glyphs.splice(i, 0, ...glyphs.splice(i + 1, j - i));
            glyphs[j] = t;
          }

          break;
        }
      }
    }

    // Attach misc marks to previous char to move with them.
    let lastPos = POSITIONS.Start;
    for (let i = start; i < end; i++) {
      let info = glyphs[i].shaperInfo;
      // 这里 去掉!!
      if (!!(info.category & (JOINER_FLAGS | CATEGORIES.N | CATEGORIES.RS | CATEGORIES.CM | HALANT_OR_COENG_FLAGS & info.category))) {
        info.position = lastPos;
        if (info.category === CATEGORIES.H && info.position === POSITIONS.Pre_M) {
          // Uniscribe doesn't move the Halant with Left Matra.
          // TEST: U+092B,U+093F,U+094DE
          // We follow.  This is important for the Sinhala
          // U+0DDA split matra since it decomposes to U+0DD9,U+0DCA
          // where U+0DD9 is a left matra and U+0DCA is the virama.
          // We don't want to move the virama with the left matra.
          // TEST: U+0D9A,U+0DDA
          for (let j = i; j > start; j--) {
            if (glyphs[j - 1].shaperInfo.position !== POSITIONS.Pre_M) {
              info.position = glyphs[j - 1].shaperInfo.position;
              break;
            }
          }
        }
      } else if (info.position !== POSITIONS.SMVD) {
        lastPos = info.position;
      }
    }

    // For post-base consonants let them own anything before them
    // since the last consonant or matra.
    let last = base;
    for (let i = base + 1; i < end; i++) {
      if (isConsonant(glyphs[i])) {
        for (let j = last + 1; j < i; j++) {
          if (glyphs[j].shaperInfo.position < POSITIONS.SMVD) {
            glyphs[j].shaperInfo.position = glyphs[i].shaperInfo.position;
          }
        }
        last = i;
      } else if (glyphs[i].shaperInfo.category === CATEGORIES.M) {
        last = i;
      }
    }

    let arr = glyphs.slice(start, end);
    arr.sort((a, b) => a.shaperInfo.position - b.shaperInfo.position);
    glyphs.splice(start, arr.length, ...arr);

    // Find base again
    for (let i = start; i < end; i++) {
      if (glyphs[i].shaperInfo.position === POSITIONS.Base_C) {
        base = i;
        break;
      }
    }

    // Setup features now

    // Reph
    for (let i = start; i < end && glyphs[i].shaperInfo.position === POSITIONS.Ra_To_Become_Reph; i++) {
      glyphs[i].features.rphf = true;
    }

    // Pre-base
    let blwf = !plan.isOldSpec && indicConfig.blwfMode === 'Pre_And_Post';
    for (let i = start; i < base; i++) {
      glyphs[i].features.half = true;
      if (blwf) {
        glyphs[i].features.blwf = true;
      }
    }

    // Post-base
    for (let i = base + 1; i < end; i++) {
      glyphs[i].features.abvf = true;
      glyphs[i].features.pstf = true;
      glyphs[i].features.blwf = true;
    }

    if (plan.isOldSpec && plan.unicodeScript === 'Devanagari') {
      // Old-spec eye-lash Ra needs special handling.  From the
      // spec:
      //
      // "The feature 'below-base form' is applied to consonants
      // having below-base forms and following the base consonant.
      // The exception is vattu, which may appear below half forms
      // as well as below the base glyph. The feature 'below-base
      // form' will be applied to all such occurrences of Ra as well."
      //
      // Test case: U+0924,U+094D,U+0930,U+094d,U+0915
      // with Sanskrit 2003 font.
      //
      // However, note that Ra,Halant,ZWJ is the correct way to
      // request eyelash form of Ra, so we wouldbn't inhibit it
      // in that sequence.
      //
      // Test case: U+0924,U+094D,U+0930,U+094d,U+200D,U+0915
      for (let i = start; i + 1 < base; i++) {
        if (glyphs[i].shaperInfo.category === CATEGORIES.Ra &&
          glyphs[i + 1].shaperInfo.category === CATEGORIES.H &&
          (i + 1 === base || glyphs[i + 2].shaperInfo.category === CATEGORIES.ZWJ)
        ) {
          glyphs[i].features.blwf = true;
          glyphs[i + 1].features.blwf = true;
        }
      }
    }

    let prefLen = 2;
    if (features.pref && base + prefLen < end) {
      // Find a Halant,Ra sequence and mark it for pre-base reordering processing.
      for (let i = base + 1; i + prefLen - 1 < end; i++) {
        let g = [glyphs[i].copy(), glyphs[i + 1].copy()];
        if (wouldSubstitute(g, 'pref')) {
          for (let j = 0; j < prefLen; j++) {
            glyphs[i++].features.pref = true;
          }

          // Mark the subsequent stuff with 'cfar'.  Used in Khmer.
          // Read the feature spec.
          // This allows distinguishing the following cases with MS Khmer fonts:
          // U+1784,U+17D2,U+179A,U+17D2,U+1782
          // U+1784,U+17D2,U+1782,U+17D2,U+179A
          if (features.cfar) {
            for (; i < end; i++) {
              glyphs[i].features.cfar = true;
            }
          }

          break;
        }
      }
    }

    // Apply ZWJ/ZWNJ effects
    for (let i = start + 1; i < end; i++) {
      if (isJoiner(glyphs[i])) {
        let nonJoiner = glyphs[i].shaperInfo.category === CATEGORIES.ZWNJ;
        let j = i;

        do {
          j--;

          // ZWJ/ZWNJ should disable CJCT.  They do that by simply
          // being there, since we don't skip them for the CJCT
          // feature (ie. F_MANUAL_ZWJ)

          // A ZWNJ disables HALF.
          if (nonJoiner) {
            delete glyphs[j].features.half;
          }
        } while (j > start && !isConsonant(glyphs[j]));
      }
    }
  }
}

function finalReordering(font, glyphs, plan) {
  let indicConfig = plan.indicConfig;
  let features = font._layoutEngine.engine.GSUBProcessor.features;

  for (let start = 0, end = nextSyllable(glyphs, 0); start < glyphs.length; start = end, end = nextSyllable(glyphs, start)) {
    // 4. Final reordering:
    //
    // After the localized forms and basic shaping forms GSUB features have been
    // applied (see below), the shaping engine performs some final glyph
    // reordering before applying all the remaining font features to the entire
    // cluster.

    let tryPref = !!features.pref;

    // Find base again
    let base = start;
    for (; base < end; base++) {
      if (glyphs[base].shaperInfo.position >= POSITIONS.Base_C) {
        if (tryPref && base + 1 < end) {
          for (let i = base + 1; i < end; i++) {
            if (glyphs[i].features.pref) {
              if (!(glyphs[i].substituted && glyphs[i].isLigated && !glyphs[i].isMultiplied)) {
                // Ok, this was a 'pref' candidate but didn't form any.
                // Base is around here...
                base = i;
                while (base < end && isHalantOrCoeng(glyphs[base])) {
                  base++;
                }
                glyphs[base].shaperInfo.position = POSITIONS.BASE_C;
                tryPref = false;
              }
              break;
            }
          }
        }

        // For Malayalam, skip over unformed below- (but NOT post-) forms.
        if (plan.unicodeScript === 'Malayalam') {
          for (let i = base + 1; i < end; i++) {
            while (i < end && isJoiner(glyphs[i])) {
              i++;
            }

            if (i === end || !isHalantOrCoeng(glyphs[i])) {
              break;
            }

            i++; // Skip halant.
            while (i < end && isJoiner(glyphs[i])) {
              i++;
            }

            if (i < end && isConsonant(glyphs[i]) && glyphs[i].shaperInfo.position === POSITIONS.Below_C) {
              base = i;
              glyphs[base].shaperInfo.position = POSITIONS.Base_C;
            }
          }
        }

        if (start < base && glyphs[base].shaperInfo.position > POSITIONS.Base_C) {
          base--;
        }
        break;
      }
    }

    if (base === end && start < base && glyphs[base - 1].shaperInfo.category === CATEGORIES.ZWJ) {
      base--;
    }

    if (base < end) {
      while (start < base && glyphs[base].shaperInfo.category & (CATEGORIES.N | HALANT_OR_COENG_FLAGS)) {
        base--;
      }
    }

    // o Reorder matras:
    //
    // If a pre-base matra character had been reordered before applying basic
    // features, the glyph can be moved closer to the main consonant based on
    // whether half-forms had been formed. Actual position for the matra is
    // defined as “after last standalone halant glyph, after initial matra
    // position and before the main consonant”. If ZWJ or ZWNJ follow this
    // halant, position is moved after it.
    //

    if (start + 1 < end && start < base) { // Otherwise there can't be any pre-base matra characters.
      // If we lost track of base, alas, position before last thingy.
      let newPos = base === end ? base - 2 : base - 1;

      // Malayalam / Tamil do not have "half" forms or explicit virama forms.
      // The glyphs formed by 'half' are Chillus or ligated explicit viramas.
      // We want to position matra after them.
      if (plan.unicodeScript !== 'Malayalam' && plan.unicodeScript !== 'Tamil') {
        while (newPos > start && !(glyphs[newPos].shaperInfo.category & (CATEGORIES.M | HALANT_OR_COENG_FLAGS))) {
          newPos--;
        }

        // If we found no Halant we are done.
        // Otherwise only proceed if the Halant does
        // not belong to the Matra itself!
        if (isHalantOrCoeng(glyphs[newPos]) && glyphs[newPos].shaperInfo.position !== POSITIONS.Pre_M) {
          // If ZWJ or ZWNJ follow this halant, position is moved after it.
          if (newPos + 1 < end && isJoiner(glyphs[newPos + 1])) {
            newPos++;
          }
        } else {
          newPos = start; // No move.
        }
      }

      if (start < newPos && glyphs[newPos].shaperInfo.position !== POSITIONS.Pre_M) {
        // Now go see if there's actually any matras...
        for (let i = newPos; i > start; i--) {
          if (glyphs[i - 1].shaperInfo.position === POSITIONS.Pre_M) {
            let oldPos = i - 1;
            if (oldPos < base && base <= newPos) { // Shouldn't actually happen.
              base--;
            }

            let tmp = glyphs[oldPos];
            glyphs.splice(oldPos, 0, ...glyphs.splice(oldPos + 1, newPos - oldPos));
            glyphs[newPos] = tmp;

            newPos--;
          }
        }
      }
    }

    // o Reorder reph:
    //
    // Reph’s original position is always at the beginning of the syllable,
    // (i.e. it is not reordered at the character reordering stage). However,
    // it will be reordered according to the basic-forms shaping results.
    // Possible positions for reph, depending on the script, are; after main,
    // before post-base consonant forms, and after post-base consonant forms.

    // Two cases:
    //
    // - If repha is encoded as a sequence of characters (Ra,H or Ra,H,ZWJ), then
    //   we should only move it if the sequence ligated to the repha form.
    //
    // - If repha is encoded separately and in the logical position, we should only
    //   move it if it did NOT ligate.  If it ligated, it's probably the font trying
    //   to make it work without the reordering.
    if (start + 1 < end &&
      glyphs[start].shaperInfo.position === POSITIONS.Ra_To_Become_Reph &&
      (glyphs[start].shaperInfo.category === CATEGORIES.Repha) !== (glyphs[start].isLigated && !glyphs[start].isMultiplied)
    ) {
      let newRephPos;
      let rephPos = indicConfig.rephPos;
      let found = false;

      // 1. If reph should be positioned after post-base consonant forms,
      //    proceed to step 5.
      if (rephPos !== POSITIONS.After_Post) {
        //  2. If the reph repositioning class is not after post-base: target
        //     position is after the first explicit halant glyph between the
        //     first post-reph consonant and last main consonant. If ZWJ or ZWNJ
        //     are following this halant, position is moved after it. If such
        //     position is found, this is the target position. Otherwise,
        //     proceed to the next step.
        //
        //     Note: in old-implementation fonts, where classifications were
        //     fixed in shaping engine, there was no case where reph position
        //     will be found on this step.
        newRephPos = start + 1;
        while (newRephPos < base && !isHalantOrCoeng(glyphs[newRephPos])) {
          newRephPos++;
        }

        if (newRephPos < base && isHalantOrCoeng(glyphs[newRephPos])) {
          // ->If ZWJ or ZWNJ are following this halant, position is moved after it.
          if (newRephPos + 1 < base && isJoiner(glyphs[newRephPos + 1])) {
            newRephPos++;
          }

          found = true;
        }

        // 3. If reph should be repositioned after the main consonant: find the
        //    first consonant not ligated with main, or find the first
        //    consonant that is not a potential pre-base reordering Ra.
        if (!found && rephPos === POSITIONS.After_Main) {
          newRephPos = base;
          while (newRephPos + 1 < end && glyphs[newRephPos + 1].shaperInfo.position <= POSITIONS.After_Main) {
            newRephPos++;
          }

          found = newRephPos < end;
        }

        // 4. If reph should be positioned before post-base consonant, find
        //    first post-base classified consonant not ligated with main. If no
        //    consonant is found, the target position should be before the
        //    first matra, syllable modifier sign or vedic sign.
        //
        // This is our take on what step 4 is trying to say (and failing, BADLY).
        if (!found && rephPos === POSITIONS.After_Sub) {
          newRephPos = base;
          while (newRephPos + 1 < end && !(glyphs[newRephPos + 1].shaperInfo.position & (POSITIONS.Post_C | POSITIONS.After_Post | POSITIONS.SMVD))) {
            newRephPos++;
          }

          found = newRephPos < end;
        }
      }

      //  5. If no consonant is found in steps 3 or 4, move reph to a position
      //     immediately before the first post-base matra, syllable modifier
      //     sign or vedic sign that has a reordering class after the intended
      //     reph position. For example, if the reordering position for reph
      //     is post-main, it will skip above-base matras that also have a
      //     post-main position.
      if (!found) {
        // Copied from step 2.
        newRephPos = start + 1;
        while (newRephPos < base && !isHalantOrCoeng(glyphs[newRephPos])) {
          newRephPos++;
        }

        if (newRephPos < base && isHalantOrCoeng(glyphs[newRephPos])) {
          // ->If ZWJ or ZWNJ are following this halant, position is moved after it.
          if (newRephPos + 1 < base && isJoiner(glyphs[newRephPos + 1])) {
            newRephPos++;
          }

          found = true;
        }
      }

      // 6. Otherwise, reorder reph to the end of the syllable.
      if (!found) {
        newRephPos = end - 1;
        while (newRephPos > start && glyphs[newRephPos].shaperInfo.position === POSITIONS.SMVD) {
          newRephPos--;
        }

        // If the Reph is to be ending up after a Matra,Halant sequence,
        // position it before that Halant so it can interact with the Matra.
        // However, if it's a plain Consonant,Halant we shouldn't do that.
        // Uniscribe doesn't do this.
        // TEST: U+0930,U+094D,U+0915,U+094B,U+094D
        if (isHalantOrCoeng(glyphs[newRephPos])) {
          for (let i = base + 1; i < newRephPos; i++) {
            if (glyphs[i].shaperInfo.category === CATEGORIES.M) {
              newRephPos--;
            }
          }
        }
      }

      let reph = glyphs[start];
      glyphs.splice(start, 0, ...glyphs.splice(start + 1, newRephPos - start));
      glyphs[newRephPos] = reph;

      if (start < base && base <= newRephPos) {
        base--;
      }
    }

    // o Reorder pre-base reordering consonants:
    //
    // If a pre-base reordering consonant is found, reorder it according to
    // the following rules:
    if (tryPref && base + 1 < end) {
      for (let i = base + 1; i < end; i++) {
        if (glyphs[i].features.pref) {
           // 1. Only reorder a glyph produced by substitution during application
           //    of the <pref> feature. (Note that a font may shape a Ra consonant with
           //    the feature generally but block it in certain contexts.)

          // Note: We just check that something got substituted.  We don't check that
          // the <pref> feature actually did it...
          //
          // Reorder pref only if it ligated.
          if (glyphs[i].isLigated && !glyphs[i].isMultiplied) {
            // 2. Try to find a target position the same way as for pre-base matra.
            //    If it is found, reorder pre-base consonant glyph.
            //
            // 3. If position is not found, reorder immediately before main
            //    consonant.
            let newPos = base;

            // Malayalam / Tamil do not have "half" forms or explicit virama forms.
            // The glyphs formed by 'half' are Chillus or ligated explicit viramas.
            // We want to position matra after them.
            if (plan.unicodeScript !== 'Malayalam' && plan.unicodeScript !== 'Tamil') {
              while (newPos > start && !(glyphs[newPos - 1].shaperInfo.category & (CATEGORIES.M | HALANT_OR_COENG_FLAGS))) {
                newPos--;
              }

              // In Khmer coeng model, a H,Ra can go *after* matras.  If it goes after a
              // split matra, it should be reordered to *before* the left part of such matra.
              if (newPos > start && glyphs[newPos - 1].shaperInfo.category === CATEGORIES.M) {
                let oldPos = i;
                for (let j = base + 1; j < oldPos; j++) {
                  if (glyphs[j].shaperInfo.category === CATEGORIES.M) {
                    newPos--;
                    break;
                  }
                }
              }
            }

            if (newPos > start && isHalantOrCoeng(glyphs[newPos - 1])) {
              // -> If ZWJ or ZWNJ follow this halant, position is moved after it.
              if (newPos < end && isJoiner(glyphs[newPos])) {
                newPos++;
              }
            }

            let oldPos = i;
            let tmp = glyphs[oldPos];
            glyphs.splice(newPos + 1, 0, ...glyphs.splice(newPos, oldPos - newPos));
            glyphs[newPos] = tmp;

            if (newPos <= base && base < oldPos) {
              base++;
            }
          }

          break;
        }
      }
    }

    // Apply 'init' to the Left Matra if it's a word start.
    if (glyphs[start].shaperInfo.position === POSITIONS.Pre_M && (!start || !/Cf|Mn/.test(unicode.getCategory(glyphs[start - 1].codePoints[0])))) {
      glyphs[start].features.init = true;
    }
  }
}

function nextSyllable(glyphs, start) {
  if (start >= glyphs.length) return start;
  let syllable = glyphs[start].shaperInfo.syllable;
  while (++start < glyphs.length && glyphs[start].shaperInfo.syllable === syllable);
  return start;
}
