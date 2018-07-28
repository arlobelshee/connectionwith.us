// This is Google AppScript. Create a spreadsheet with 1 row, 2 columns, where the 2
// cells contain "timestamp" and "keys" (they're headers). Then create an associated
// script, and put these contents in there. As soon as you start uploading, it'll add more
// rows and columns as needed. Publish as a web-app, and post form data.

var FIELD_KEY = 'key';
var FIELD_HONEYPOT = 'robbiecheck';

function doPost(e) {
  if(e.parameter[FIELD_HONEYPOT]) {  //if honeypot is filled, form will not be submitted
    return ContentService
          .createTextOutput(JSON.stringify({"result":"error", "error": "I think you're a robot."}))
          .setMimeType(ContentService.MimeType.JSON);
  }

  var data = get_data_from_request(e);

  var lock = LockService.getDocumentLock();
  lock.waitLock(30000); // hold off up to 30 sec to avoid concurrent writing

  try {
    Logger.log(JSON.stringify(e));

    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheetName = "responses";
    var sheet = doc.getSheetByName(sheetName);

    record_data(sheet, find_record(sheet, data), data);

    return ContentService
          .createTextOutput(
            JSON.stringify({"result":"success",
                            "data": JSON.stringify(data) }))
          .setMimeType(ContentService.MimeType.JSON);
  }
  catch(error) {
    Logger.log(error);
    return ContentService
          .createTextOutput(JSON.stringify({"result":"error", "error": error}))
          .setMimeType(ContentService.MimeType.JSON);
  }
  finally {
    lock.releaseLock();
  }
}

function find_record(sheet, data) {
  var keyValue = data[FIELD_KEY];
  if(keyValue) {
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var keyColumn = headers.indexOf(FIELD_KEY) + 1;
    if(keyColumn > -1) {
      var keys = sheet.getRange(1, keyColumn, sheet.getLastRow(), 1).getValues();
      Logger.log(JSON.stringify({"at":"Trying to match the key", "value":keyValue, "data": keys, "column": keyColumn}));
      for(var i=1; i<keys.length; i++) {  // skip the header row
        if(keyValue === keys[i][0]) {
          Logger.log(JSON.stringify({"at":"editing row", "value":i+1}));
          return i + 1; // 1-based index.
        }
      }
    }
  }
  Logger.log(JSON.stringify({"at":"creating new row", "value":sheet.getLastRow() + 1}));
  return sheet.getLastRow() + 1;
}

function record_data(sheet, correctRow, data) {
  var oldHeader = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  var newHeader = oldHeader.slice();
  var fieldsFromForm = Object.keys(data);
  var row = [];

  // Extract the data that matches known headers
  for (var i = 0; i < oldHeader.length; i++) {
    var field = oldHeader[i];
    row.push(data[field] || "");

    // mark as stored by removing from form fields
    var formIndex = fieldsFromForm.indexOf(field);
    if (formIndex > -1) {
      fieldsFromForm.splice(formIndex, 1);
    }
  }

  // set any new fields in our form
  for (var i = 0; i < fieldsFromForm.length; i++) {
    var field = fieldsFromForm[i];
    row.push(data[field]);
    newHeader.push(field);
  }

  sheet.getRange(correctRow, 1, 1, row.length).setValues([row]);

  if (newHeader.length > oldHeader.length) {
    sheet.getRange(1, 1, 1, newHeader.length).setValues([newHeader]);
  }
}

function get_data_from_request(e) {
  var raw = e.parameters;
  var fields = getDataColumns(raw);
  var result = {};
  for(var i=0; i<fields.length; ++i) {
    result[fields[i]] = getFieldFromData(fields[i], raw);
  }
  result['timestamp'] = new Date();
  return result;
}

function getDataColumns(data) {
  return Object.keys(data).filter(function(column) {
    return !(column === FIELD_HONEYPOT);
  });
}

function getFieldFromData(field, data) {
  var values = data[field] || '';
  var output = values.join ? values.join(', ') : values;
  return sanitize(output);
}

function sanitize(rawInput) {
  var placeholder = HtmlService.createHtmlOutput(" ");
  placeholder.appendUntrusted(rawInput);

  return placeholder.getContent();
}
