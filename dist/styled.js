var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import clsx from 'clsx';
import { getRegisteredStyles, insertStyles } from '@emotion/utils';
import { serializeStyles } from '@emotion/serialize';
import { emotionCache } from '.';
var ILLEGAL_ESCAPE_SEQUENCE_ERROR = process.env.NODE_ENV === 'production' ?
    '' :
    "You have illegal escape sequence in your template literal, most likely inside content's property value.\nBecause you write your CSS inside a JavaScript string you actually have to do double escaping, so for example \"content: '\\00d7';\" should become \"content: '\\\\00d7';\".\nYou can read more about this here:\nhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences";
var createStyled = function (tag, options) {
    if (options === void 0) { options = {}; }
    if (process.env.NODE_ENV !== 'production') {
        if (tag === undefined) {
            throw new Error('You are trying to create a styled element with an undefined component.\nYou may have forgotten to import it.');
        }
    }
    var identifierName = options.label;
    var targetClassName = options.target;
    var isReal = tag.__emotion_real === tag;
    var baseTag = (isReal && tag.__emotion_base) || tag;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var styles = isReal && tag.__emotion_styles !== undefined ?
            tag.__emotion_styles.slice(0) :
            [];
        if (identifierName !== undefined) {
            styles.push("label:" + identifierName + ";");
        }
        if (args[0] === null || args[0].raw === undefined) {
            styles.push.apply(styles, args);
        }
        else {
            if (process.env.NODE_ENV !== 'production' && args[0][0] === undefined) {
                console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
            }
            styles.push(args[0][0]);
            var len = args.length;
            var i = 1;
            for (; i < len; i++) {
                if (process.env.NODE_ENV !== 'production' && args[0][i] === undefined) {
                    console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
                }
                styles.push(args[i], args[0][i]);
            }
        }
        var Styled = {
            functional: true,
            inject: {
                theme: {
                    default: undefined
                }
            },
            render: function (h, _a) {
                var data = _a.data, children = _a.children, parent = _a.parent, injections = _a.injections;
                var cache = emotionCache;
                var _b = data.attrs || {}, as = _b.as, value = _b.value, restAttrs = __rest(_b, ["as", "value"]);
                var className = data.staticClass ? data.staticClass + " " : '';
                var finalTag = as || baseTag;
                var classInterpolations = [];
                var mergedProps = __assign(__assign(__assign({}, data.attrs), { theme: injections.theme }), parent.$evergarden);
                var domProps = { value: value };
                if (data.class) {
                    className += getRegisteredStyles(cache.registered, classInterpolations, clsx(data.class));
                }
                var serialized = serializeStyles(styles.concat(classInterpolations), cache.registered, mergedProps);
                insertStyles(cache, serialized, typeof finalTag === 'string');
                className += cache.key + "-" + serialized.name;
                if (targetClassName !== undefined) {
                    className += " " + targetClassName;
                }
                return h(finalTag, __assign(__assign({}, data), { attrs: options.getAttrs ? options.getAttrs(restAttrs) : restAttrs, staticClass: undefined, class: className, domProps: domProps }), children);
            }
        };
        Styled.name =
            identifierName === undefined ?
                "Styled" + (typeof baseTag === 'string' ? baseTag : baseTag.name || 'Component') :
                identifierName;
        Styled.__emotion_real = Styled;
        Styled.__emotion_base = baseTag;
        Styled.__emotion_styles = styles;
        Object.defineProperty(Styled, 'toString', {
            value: function () {
                if (targetClassName === undefined &&
                    process.env.NODE_ENV !== 'production') {
                    return 'NO_COMPONENT_SELECTOR';
                }
                return "." + targetClassName;
            }
        });
        Styled.withComponent = function (nextTag, nextOptions) {
            return createStyled(nextTag, nextOptions === undefined ?
                options : __assign(__assign({}, (options || {})), nextOptions)).apply(void 0, styles);
        };
        return Styled;
    };
};
export var styled = createStyled;
