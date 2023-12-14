const commonUtil = {
  changeNumberFormat (val, opt) {
    val = '' + val

    let rtn = ''

    if (val === '') {
      return rtn
    }

    if (val === '0') {
      return '0'
    }

    const defaultOption = {
      isMinus: false,
      isComma: false,
      point: false,
      isPhone: false
    }
    const options = opt === undefined ? defaultOption : { ...defaultOption, ...opt }

    const len = val.length
    const arrNum = []
    const arrPoint = []
    let hasMinus = false // 마이너스 여부
    let hasPoint = false // 소수점 여부

    for (let i = 0; i < len; i++) {
      if (val.charAt(i) === '-') {
        if (options.isMinus && i === 0) {
          hasMinus = true
        }
        continue
      } else if (val.charAt(i) === '.') {
        if (!hasPoint) {
          hasPoint = true
        }
        continue
      }

      if (val.charAt(i) >= '0' && val.charAt(i) <= '9') {
        if (!hasPoint) {
          arrNum.push(val.charAt(i))
        } else {
          arrPoint.push(val.charAt(i))
        }
      }
    }

    let num = arrNum.join('')
    let point = arrPoint.join('')
    let isPoint = options.point !== 0 && hasPoint

    if (!options.isPhone && num !== '' && num !== '0') {
      while (num !== '0' && num.indexOf('0') === 0) {
        num = num.substring(1)
      }
    }

    if (options.point > 0 && point.length > options.point) {
      point = point.substr(0, options.point)
    }

    if (isPoint && num === '') {
      num = '0'
    }

    if (options.isComma) {
      let reg = /(^[+-]?\d+)(\d{3})/
      let ret = (num + '')

      while (reg.test(ret)) {
        ret = ret.replace(reg, '$1' + ',' + '$2')
      }

      rtn = (hasMinus ? '-' : '') + ret + (isPoint ? '.' + point : '')
    } else {
      rtn = (hasMinus ? '-' : '') + num + (isPoint ? '.' + point : '')
    }

    return rtn
  }
}

export default commonUtil