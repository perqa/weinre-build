// Generated by CoffeeScript 1.8.0
var Program, SequenceNumber, SequenceNumberMax, fs, log, path, utils,
  __hasProp = {}.hasOwnProperty;

fs = require('fs');

path = require('path');

utils = exports;

utils.Program = Program = path.basename(process.argv[1]);

SequenceNumberMax = 100 * 1024 * 1024;

SequenceNumber = 0;

utils.getNextSequenceNumber = function(g) {
  SequenceNumber++;
  if (SequenceNumber > SequenceNumberMax) {
    SequenceNumber = 0;
  }
  return SequenceNumber;
};

utils.trim = function(string) {
  return string.replace(/(^\s+)|(\s+$)/g, '');
};

utils.log = log = function(message) {
  var date, time;
  date = new Date();
  time = date.toISOString();
  return console.log("" + time + " " + Program + ": " + message);
};

utils.logVerbose = function(message) {
  var _ref;
  if (!(utils != null ? (_ref = utils.options) != null ? _ref.verbose : void 0 : void 0)) {
    return;
  }
  return log(message);
};

utils.logDebug = function(message) {
  var _ref;
  if (!(utils != null ? (_ref = utils.options) != null ? _ref.debug : void 0 : void 0)) {
    return;
  }
  return log(message);
};

utils.exit = function(message) {
  log(message);
  return process.exit(1);
};

utils.pitch = function(message) {
  log(message);
  throw message;
};

utils.setOptions = function(options) {
  return utils.options = options;
};

utils.ensureInteger = function(value, message) {
  var newValue;
  newValue = parseInt(value);
  if (isNaN(newValue)) {
    utils.exit("" + message + ": '" + value + "'");
  }
  return newValue;
};

utils.ensureString = function(value, message) {
  if (typeof value !== 'string') {
    utils.exit("" + message + ": '" + value + "'");
  }
  return value;
};

utils.ensureBoolean = function(value, message) {
  var newValue, uValue;
  uValue = value.toString().toUpperCase();
  newValue = null;
  switch (uValue) {
    case 'TRUE':
      newValue = true;
      break;
    case 'FALSE':
      newValue = false;
  }
  if (typeof newValue !== 'boolean') {
    utils.exit("" + message + ": '" + value + "'");
  }
  return newValue;
};

utils.setNamesForClass = function(aClass) {
  var key, val, _ref, _results;
  for (key in aClass) {
    if (!__hasProp.call(aClass, key)) continue;
    val = aClass[key];
    if (typeof val === "function") {
      val.signature = "" + aClass.name + "::" + key;
      val.displayName = val.signature;
      val.name = val.signature;
    }
  }
  _ref = aClass.prototype;
  _results = [];
  for (key in _ref) {
    if (!__hasProp.call(_ref, key)) continue;
    val = _ref[key];
    if (typeof val === "function") {
      val.signature = "" + aClass.name + "." + key;
      val.displayName = val.signature;
      _results.push(val.name = val.signature);
    } else {
      _results.push(void 0);
    }
  }
  return _results;
};

utils.registerClass = function(aClass) {
  utils.setNamesForClass(aClass);
  return aClass;
};

utils.alignLeft = function(string, length) {
  while (string.length < length) {
    string = "" + string + " ";
  }
  return string;
};

utils.alignRight = function(string, length) {
  while (string.length < length) {
    string = " " + string;
  }
  return string;
};

utils.fileExistsSync = function(name) {
  if (fs.existsSync) {
    return fs.existsSync(name);
  }
  return path.existsSync(name);
};

Error.prepareStackTrace = function(error, structuredStackTrace) {
  var callSite, file, func, funcName, line, longestFile, longestLine, result, _i, _j, _len, _len1;
  result = [];
  result.push("---------------------------------------------------------");
  result.push("error: " + error);
  result.push("---------------------------------------------------------");
  result.push("stack: ");
  longestFile = 0;
  longestLine = 0;
  for (_i = 0, _len = structuredStackTrace.length; _i < _len; _i++) {
    callSite = structuredStackTrace[_i];
    file = callSite.getFileName();
    line = callSite.getLineNumber();
    file = path.basename(file);
    line = "" + line;
    if (file.length > longestFile) {
      longestFile = file.length;
    }
    if (line.length > longestLine) {
      longestLine = line.length;
    }
  }
  for (_j = 0, _len1 = structuredStackTrace.length; _j < _len1; _j++) {
    callSite = structuredStackTrace[_j];
    func = callSite.getFunction();
    file = callSite.getFileName();
    line = callSite.getLineNumber();
    file = path.basename(file);
    line = "" + line;
    file = utils.alignRight(file, longestFile);
    line = utils.alignLeft(line, longestLine);
    if (func) {
      funcName = func.displayName || func.name;
    }
    if (!funcName) {
      funcName = callSite.getFunctionName() || "?";
    }
    callSite.getMethodName();
    '???';
    if (funcName === "Module._compile") {
      result.pop();
      result.pop();
      break;
    }
    result.push("   " + file + ":" + line + " - " + funcName + "()");
  }
  return result.join("\n");
};
