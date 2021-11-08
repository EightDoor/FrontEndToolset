function dom_hover(dom) {
  dom.onmouseover(()=>{
    dom.style.cursor = 'pointer'
  })
}


window.onload = function() {
  let positionClose = document.createElement('div');
  let positionButton = document.createElement('div');
  let positionButtonGo = document.createElement('div');
  const comStyle = 'position: fixed; z-index: 999999; bottom: 50px; right: 50px;width:50px;height: 50px;text-align: center;line-height: 50px; border: 1px solid #ccc; background: black;color: white;border-radius: 10px;'

  positionClose.style = `${comStyle}right: 110px;background: red;color: white`;
  positionClose.innerText = '关闭'
  positionClose.onclick = function() {
    window.close()

  }


  positionButton.style = comStyle;
  positionButton.innerText = '后退'
  positionButton.onclick = function() {
    window.history.back()
  }

  positionButtonGo.style = `${comStyle}right: 0px`
  positionButtonGo.innerText = '前进'
  positionButtonGo.onclick = function() {
    window.history.forward()
  }

  document.body.append(positionButtonGo)
  document.body.append(positionButton);
  document.body.append(positionClose)
}
