/* AADecode - Decode encoded-as-aaencode JavaScript program.
 * 
 * Copyright (C) 2010,2016 @cat_in_136
 * 
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 */

const AADecode = {
    decode: function(text) {
        var evalPreamble = "(\uFF9F\u0414\uFF9F) ['_'] ( (\uFF9F\u0414\uFF9F) ['_'] (";
        var decodePreamble = "( (\uFF9F\u0414\uFF9F) ['_'] (";
        var evalPostamble = ") (\uFF9F\u0398\uFF9F)) ('_');";
        var decodePostamble = ") ());";

        // strip beginning/ending space.
        text = text.replace(/^\s*/, "").replace(/\s*$/, "");

        // returns empty text for empty input.
        if (/^\s*$/.test(text)) {
            return "";
        }
        // check if it is encoded.
        if (text.lastIndexOf(evalPreamble) < 0) {
            throw new Error("Given code is not encoded as aaencode.");
        }
        if (text.lastIndexOf(evalPostamble) != text.length - evalPostamble.length) {
            throw new Error("Given code is not encoded as aaencode.");
        }

        var decodingScript = text.replace(evalPreamble, decodePreamble)
                                 .replace(evalPostamble, decodePostamble);
        return eval(decodingScript);
    }
};

exports.decode = AADecode.decode;
