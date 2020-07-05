const CODES = {
  A: 65,
  Z: 90
}

function createCell(col, index) {
  return `<div class="cell" data-col="${col}${index}" contenteditable></div>`
}

function toColumn(col, index) {
  return `
    <div class="column" data-type="resizable" data-col="${col}${index}">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function createRow(content, index) {
  const resizer = index
    ? '<div class="row-resize" data-resize="row"></div>'
    : ''
  const line = index
    ? '<div class="row-line" data-line="row"></div>'
    : ''
  return `
    <div class="row" data-type="resizable">
      <div class="row-info">
        ${index}
        ${resizer}
      </div>
      <div class="row-data">
        ${content}
        ${line}
      </div>
    </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(toColumn)
    .join('')

  rows.push(createRow(cols, ''))

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(createCell)
      .join('')
    rows.push(createRow(cells, i + 1))
  }

  return rows.join('')
}