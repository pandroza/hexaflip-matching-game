//Extra code added on line 199 and lines 253-265 
// Generated by CoffeeScript 1.10.0
(function() {
  var $, HexaFlip, baseName, className, css, cssClass, defaults, faceNames, faceSequence, j, len, prefixList, prefixProp, prop, ref, urlRx;

  baseName = 'hexaFlip';

  className = baseName[0].toUpperCase() + baseName.slice(1);

  prefixList = ['webkit', 'Moz', 'O', 'ms'];

  prefixProp = function(prop) {
    var j, len, prefix, prefixed;
    if (document.body.style[prop.toLowerCase()] != null) {
      return prop.toLowerCase();
    }
    for (j = 0, len = prefixList.length; j < len; j++) {
      prefix = prefixList[j];
      prefixed = prefix + prop;
      if (document.body.style[prefixed] != null) {
        return prefixed;
      }
    }
    return false;
  };

  css = {};

  ref = ['Transform', 'Perspective'];
  for (j = 0, len = ref.length; j < len; j++) {
    prop = ref[j];
    css[prop.toLowerCase()] = prefixProp(prop);
  }

  defaults = {
    size: 200,
    margin: 10,
    fontSize: 132,
    perspective: 1000,
    touchSensitivity: 1,
    horizontalFlip: false,
    domEvents: null
  };

  cssClass = baseName.toLowerCase();

  faceNames = ['front', 'bottom', 'back', 'top', 'left', 'right'];

  faceSequence = faceNames.slice(0, 4);

  urlRx = /(^(?:(?:(?:(?:https?)|(?:file)):)?\/\/)|^(?:data:)|^(?:(?:\.\.?)?\/))(?:.+)/i;

  HexaFlip = (function() {
    function HexaFlip(el1, sets1, options1) {
      var cube, cubeFragment, fn, fn1, i, k, key, len1, midPoint, option, ref1, ref2, ref3, set, setsKeys, setsLength, type, val, value, z;
      this.el = el1;
      this.sets = sets1;
      this.options = options1 != null ? options1 : {};
      if (!(css.transform && this.el)) {
        return;
      }
      if (!(this instanceof HexaFlip)) {
        return (function(func, args, ctor) {
          ctor.prototype = func.prototype;
          var child = new ctor, result = func.apply(child, args);
          return Object(result) === result ? result : child;
        })(HexaFlip, arguments, function(){});
      }
      if (typeof this.el === 'string') {
        this.el = document.querySelector(this.el);
      }
      for (option in defaults) {
        value = defaults[option];
        this[option] = (ref1 = this.options[option]) != null ? ref1 : defaults[option];
      }
      if (typeof this.fontSize === 'number') {
        this.fontSize += 'px';
      }
      if (!this.sets) {
        this.el.classList.add(cssClass + '-timepicker');
        this.sets = {
          hour: (function() {
            var k, results;
            results = [];
            for (i = k = 1; k <= 12; i = ++k) {
              results.push(i + '');
            }
            return results;
          })(),
          minute: (function() {
            var k, results;
            results = [];
            for (i = k = 0; k <= 5; i = ++k) {
              results.push(i + '0');
            }
            return results;
          })(),
          meridian: ['am', 'pm']
        };
      }
      setsKeys = Object.keys(this.sets);
      setsLength = setsKeys.length;
      cubeFragment = document.createDocumentFragment();
      i = z = 0;
      midPoint = setsLength / 2 + 1;
      this.cubes = {};
      ref2 = this.sets;
      for (key in ref2) {
        set = ref2[key];
        cube = this.cubes[key] = this._createCube(key);
        if (++i < midPoint) {
          z++;
        } else {
          z--;
        }
        cube.el.style.zIndex = z;
        this._setContent(cube.front, set[0]);
        cubeFragment.appendChild(cube.el);
        for (k = 0, len1 = set.length; k < len1; k++) {
          val = set[k];
          if (urlRx.test(val)) {
            (new Image).src = val;
          }
        }
      }
      this.cubes[setsKeys[0]].el.style.marginLeft = '0';
      this.cubes[setsKeys[setsKeys.length - 1]].el.style.marginRight = '0';
      this.el.classList.add(cssClass);
      this.el.style.height = this.size + 'px';
      this.el.style.width = ((this.size + this.margin * 2) * setsLength) - this.margin * 2 + 'px';
      this.el.style[css.perspective] = this.perspective + 'px';
      this.el.appendChild(cubeFragment);
      this.eProp = this.horizontalFlip ? 'pageX' : 'pageY';
      if (this.domEvents) {
        ref3 = this.domEvents;
        fn1 = (function(_this) {
          return function(fn) {
            return _this.el.addEventListener(type, function(e) {
              var target;
              target = e.target;
              if (target.classList.contains(cssClass + "-side")) {
                return fn.call(_this, e, target, target.parentNode.parentNode);
              }
            }, false);
          };
        })(this);
        for (type in ref3) {
          fn = ref3[type];
          fn1(fn);
        }
        this.domEvents = null;
      }
    }

    HexaFlip.prototype._createCube = function(set) {
      var cube, eString, eventPair, eventPairs, fn1, k, l, len1, len2, len3, m, mouseLeaveSupport, rotation, side, sideProto;
      cube = {
        set: set,
        offset: 0,
        start: 0,
        delta: 0,
        last: 0,
        el: document.createElement('div'),
        holder: document.createElement('div')
      };
      cube.el.className = cssClass + "-cube " + cssClass + "-cube-" + set;
      cube.el.style.margin = "0 " + this.margin + "px";
      cube.el.style.width = cube.el.style.height = cube.holder.style.width = cube.holder.style.height = this.size + 'px';
      cube.holder.style[css.transform] = this._getTransform(0);
      sideProto = document.createElement('div');
      sideProto.classList.add(cssClass + '-side');
      for (k = 0, len1 = faceNames.length; k < len1; k++) {
        side = faceNames[k];
        //My Code
        icon = document.createElement("i");
      //My Code Above
        cube[side] = sideProto.cloneNode(false);
        cube[side].classList.add(cssClass + "-side-" + side);
        rotation = (function() {
          switch (side) {
            case 'front':
              return '';
            case 'back':
              return 'rotateX(180deg)';
            case 'top':
              return 'rotateX(90deg)';
            case 'bottom':
              return 'rotateX(-90deg)';
            case 'left':
              return 'rotateY(-90deg)';
            case 'right':
              return 'rotateY(90deg)';
          }
        })();
        cube[side].style[css.transform] = (rotation + " translate3d(0, 0, " + (this.size / 2) + "px)") + (this.horizontalFlip ? 'rotateZ(90deg)' : '');
        cube[side].style.fontSize = this.fontSize;
        cube.holder.appendChild(cube[side]);
         //My Code
        cube[side].appendChild(icon);
      //My Code Above
      
      }
      cube.el.appendChild(cube.holder);
      eventPairs = [['TouchStart', 'MouseDown'], ['TouchMove', 'MouseMove'], ['TouchEnd', 'MouseUp'], ['TouchLeave', 'MouseLeave']];
      mouseLeaveSupport = 'onmouseleave' in window;
      for (l = 0, len2 = eventPairs.length; l < len2; l++) {
        eventPair = eventPairs[l];
        fn1 = (function(_this) {
          return function(fn, cube) {
            if (!((eString === 'TouchLeave' || eString === 'MouseLeave') && !mouseLeaveSupport)) {
              return cube.el.addEventListener(eString.toLowerCase(), (function(e) {
                return _this[fn](e, cube);
              }), true);
            } else {
              return cube.el.addEventListener('mouseout', (function(e) {
                return _this._onMouseOut(e, cube);
              }), true);
            }
          };
        })(this);
        for (m = 0, len3 = eventPair.length; m < len3; m++) {
          eString = eventPair[m];
          fn1('_on' + eventPair[0], cube);
        }
      }
      this._setSides(cube);
      return cube;
    };

    HexaFlip.prototype._getTransform = function(deg) {
      return (this.horizontalFlip ? 'rotateZ(-90deg)' : '') + (" translateZ(-" + (this.size / 2) + "px) rotateX(" + deg + "deg)");
    };

    HexaFlip.prototype._setContent = function(el, content) {
      var key, style, val, value;
      if (!(el && content)) {
        return;
      }
      if (typeof content === 'object') {
        style = content.style, value = content.value;
        for (key in style) {
          val = style[key];
          el.style[key] = val;
        }
      } else {
        value = content;
      }
      if (urlRx.test(value)) {
        el.innerHTML = '';
        return el.style.backgroundImage = "url('" + value + "')";
      } else {
        el.style.backgroundImage = 'none';
        //My Code
        var patt = new RegExp(/fa[r|s]\sfa/);
        var res = patt.test(value);
      
        if(res === true){
        icon = document.createElement('i');
        icon.className = value;
        return el.replaceChild(icon, el.childNodes[0]);
        }
        if(res === false){
        return el.innerHTML = value;}
      }
      //My Code Above
    };

    HexaFlip.prototype._setSides = function(cube) {
      var bottomAdj, faceOffset, offset, set, setLength, setOffset, topAdj;
      cube.holder.style[css.transform] = this._getTransform(cube.delta);
      cube.offset = offset = Math.floor(cube.delta / 90);
      if (offset === cube.lastOffset) {
        return;
      }
      cube.lastOffset = faceOffset = setOffset = offset;
      set = this.sets[cube.set];
      setLength = set.length;
      if (offset < 0) {
        faceOffset = setOffset = ++offset;
        if (offset < 0) {
          if (-offset > setLength) {
            setOffset = setLength - -offset % setLength;
            if (setOffset === setLength) {
              setOffset = 0;
            }
          } else {
            setOffset = setLength + offset;
          }
          if (-offset > 4) {
            faceOffset = 4 - -offset % 4;
            if (faceOffset === 4) {
              faceOffset = 0;
            }
          } else {
            faceOffset = 4 + offset;
          }
        }
      }
      if (setOffset >= setLength) {
        setOffset %= setLength;
      }
      if (faceOffset >= 4) {
        faceOffset %= 4;
      }
      topAdj = faceOffset - 1;
      bottomAdj = faceOffset + 1;
      if (topAdj === -1) {
        topAdj = 3;
      }
      if (bottomAdj === 4) {
        bottomAdj = 0;
      }
      this._setContent(cube[faceSequence[topAdj]], set[setOffset - 1] || set[setLength - 1]);
      return this._setContent(cube[faceSequence[bottomAdj]], set[setOffset + 1] || set[0]);
    };

    HexaFlip.prototype._onTouchStart = function(e, cube) {
      cube.touchStarted = true;
      cube.holder.classList.add('no-tween');
      if (e.type === 'touchstart') {
        return cube.start = e.touches[0][this.eProp];
      } else {
        return cube.start = e[this.eProp];
      }
    };

    HexaFlip.prototype._onTouchMove = function(e, cube) {
      if (!cube.touchStarted) {
        return;
      }
      e.preventDefault();
      if (e.type === 'touchmove') {
        cube.diff = (e.touches[0][this.eProp] - cube.start) * this.touchSensitivity;
      } else {
        cube.diff = (e[this.eProp] - cube.start) * this.touchSensitivity;
      }
      cube.delta = cube.last - cube.diff;
      return this._setSides(cube);
    };

    HexaFlip.prototype._onTouchEnd = function(e, cube) {
      var mod;
      cube.touchStarted = false;
      mod = cube.delta % 90;
      if (mod < 45) {
        cube.last = cube.delta + mod;
      } else {
        if (cube.delta > 0) {
          cube.last = cube.delta + mod;
        } else {
          cube.last = cube.delta - (90 - mod);
        }
      }
      if (cube.last % 90 !== 0) {
        cube.last -= cube.last % 90;
      }
      cube.holder.classList.remove('no-tween');
      return cube.holder.style[css.transform] = this._getTransform(cube.last);
    };

    HexaFlip.prototype._onTouchLeave = function(e, cube) {
      if (!cube.touchStarted) {
        return;
      }
      if (e.toElement && !cube.el.contains(e.toElement)) {
        return this._onTouchEnd(e, cube);
      }
    };

    HexaFlip.prototype._onMouseOut = function(e, cube) {
      if (!cube.touchStarted) {
        return;
      }
      if (e.toElement && !cube.el.contains(e.toElement)) {
        return this._onTouchEnd(e, cube);
      }
    };

    HexaFlip.prototype.setValue = function(settings) {
      var cube, index, key, value;
      for (key in settings) {
        value = settings[key];
        if (!(this.sets[key] && !this.cubes[key].touchStarted)) {
          continue;
        }
        value = value.toString();
        cube = this.cubes[key];
        index = this.sets[key].indexOf(value);
        cube.delta = cube.last = 90 * index;
        this._setSides(cube);
        this._setContent(cube[faceSequence[index % 4]], value);
      }
      return this;
    };

    HexaFlip.prototype.getValue = function() {
      var cube, offset, ref1, results, set, setLength;
      ref1 = this.cubes;
      results = [];
      for (set in ref1) {
        cube = ref1[set];
        set = this.sets[set];
        setLength = set.length;
        offset = cube.last / 90;
        if (offset < 0) {
          if (-offset > setLength) {
            offset = setLength - -offset % setLength;
            if (offset === setLength) {
              offset = 0;
            }
          } else {
            offset = setLength + offset;
          }
        }
        if (offset >= setLength) {
          offset %= setLength;
        }
        if (typeof set[offset] === 'object') {
          results.push(set[offset].value);
        } else {
          results.push(set[offset]);
        }
      }
      return results;
    };

    HexaFlip.prototype.flipCube = function(key, back) {
      var cube;
      cube = this.cubes[key];
      if (cube.touchStarted) {
        return;
      }
      cube.delta = cube.last += back ? -90 : 90;
      this._setSides(cube);
      return this;
    };

    HexaFlip.prototype.flipCubeBack = function(key) {
      return this.flipCube(key, true);
    };

    HexaFlip.prototype.flip = function(back) {
      var key;
      for (key in this.cubes) {
        this.flipCube(key, back);
      }
      return this;
    };

    HexaFlip.prototype.flipBack = function() {
      return this.flip(true);
    };

    return HexaFlip;

  })();

  if (typeof module !== "undefined" && module !== null ? module.exports : void 0) {
    module.exports = HexaFlip;
  } else if (typeof define !== "undefined" && define !== null ? define.amd : void 0) {
    define(function() {
      return HexaFlip;
    });
  } else {
    window.HexaFlip = HexaFlip;
  }

  if (!((typeof window !== "undefined" && window !== null) && ($ = window.jQuery || window.$) && $.data)) {
    return;
  }

  $.prototype.hexaFlip = function(sets, options) {
    var args, el, instance, k, len1, methodName;
    if (!css.transform) {
      return this;
    }
    if (typeof sets === 'string') {
      methodName = sets;
      if (!(typeof HexaFlip.prototype[methodName] === 'function' && (instance = $.data(this[0], baseName)))) {
        return this;
      }
      args = Array.prototype.slice.call(arguments);
      args.shift();
      return instance[methodName](args);
    } else {
      for (k = 0, len1 = this.length; k < len1; k++) {
        el = this[k];
        if ($.data(el, baseName)) {
          continue;
        }
        $.data(el, baseName, new HexaFlip(el, sets, options));
      }
      return this;
    }
  };

}).call(this);

//# sourceMappingURL=hexaflip.js.map
